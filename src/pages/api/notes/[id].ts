import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
    const session = await getServerSession(req, res, authOptions)

    if (!session || !session.user?.name) {
        return res.status(401).json({ error: "Neautorizovaný" })
    }

    const user = await prisma.user.findUnique({
        where: { name: session.user.name },
    })

    if (!user) {
        return res.status(404).json({ error: "Uživatel nenalezen" })
    }

    const id = Number(req.query.id)

    if (req.method === "PUT") {
        const { title, content } = req.body

        const note = await prisma.note.findUnique({
            where: { id },
        })

        if (!note || note.userId !== user.id) {
            return res.status(404).json({ error: "Nenalezeno" })
        }

        const updated = await prisma.note.update({
            where: { id },
            data: { title, content },
        })

        return res.status(200).json(updated)
    }

    if (req.method === "DELETE") {
        const note = await prisma.note.findUnique({
            where: { id },
        })

        if (!note || note.userId !== user.id) {
            return res.status(404).json({ error: "Nenalezeno" })
        }

        await prisma.note.delete({
            where: { id },
        })

        return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: "Metoda není povolena" })
}