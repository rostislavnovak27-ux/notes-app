import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "@/lib/prisma"

export default async function handler(req: any, res: any) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return res.status(401).json({ error: "Neautorizovaný" })
    }

    if (!session.user?.id) {
        return res.status(401).json({ error: "Neplatná session" })
    }

    const userId = Number(session.user.id)

    if (req.method === "GET") {
        const notes = await prisma.note.findMany({
            where: { userId: userId },
            orderBy: { createdAt: "desc" },
        })

        return res.status(200).json(notes)
    }

    if (req.method === "POST") {
        const { title, content } = req.body

        if (!title || title.trim() === "") {
            return res.status(400).json({ error: "Title je povinný" })
        }

        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId: userId,
            },
        })

        return res.status(201).json(note)
    }

    return res.status(405).json({ error: "Metoda není povolena" })
}