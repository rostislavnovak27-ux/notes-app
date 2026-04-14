import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prismaClient = globalForPrisma.prisma || prisma
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient

export default async function handler(req: any, res: any) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return res.status(401).json({ error: "Neautorizovaný" })
    }

    if (!session.user?.name) {
        return res.status(401).json({ error: "Neplatná session" })
    }

    const user = await prismaClient.user.findUnique({
        where: { name: session.user.name },
    })

    if (!user) {
        return res.status(404).json({ error: "Uživatel nenalezen" })
    }

    if (req.method === "GET") {
        const notes = await prismaClient.note.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
        })

        return res.status(200).json(notes)
    }

    if (req.method === "POST") {
        const { title, content } = req.body

        if (!title || title.trim() === "") {
            return res.status(400).json({ error: "Title je povinný" })
        }

        const note = await prismaClient.note.create({
            data: {
                title,
                content,
                userId: user.id,
            },
        })

        return res.status(201).json(note)
    }

    return res.status(405).json({ error: "Metoda není povolena" })
}