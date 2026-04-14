import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ error: "Neautorizovaný" })
    }

    const user = await prisma.user.findUnique({
        where: { name: session.user?.name },
    })

    if (!user) {
        return res.status(404).json({ error: "Uživatel nenalezen" })
    }

    if (req.method === "GET") {
        const notes = await prisma.note.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
        })

        return res.status(200).json(notes)
    }

    return res.status(405).json({ error: "Metoda není povolena" })
}