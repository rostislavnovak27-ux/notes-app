import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "@/lib/prisma"

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Metoda není povolena" })
    }

    if (!req.headers["content-type"]?.includes("application/json")) {
        return res.status(400).json({ error: "Neplatný formát (očekáván application/json)" })
    }

    const session = await getServerSession(req, res, authOptions)

    if (!session || !session.user?.id) {
        return res.status(401).json({ error: "Neautorizovaný" })
    }

    const userId = Number(session.user.id)

    let data = req.body

    // normalize to array
    if (!Array.isArray(data)) {
        data = [data]
    }

    // basic limits
    if (data.length === 0) {
        return res.status(400).json({ error: "Prázdný import" })
    }

    if (data.length > 100) {
        return res.status(400).json({ error: "Příliš mnoho poznámek (max 100)" })
    }

    const created: any[] = []

    try {
        for (const item of data) {
            // validate title
            if (!item || typeof item.title !== "string" || item.title.trim() === "") {
                continue
            }

            const safeTitle = item.title.trim()
            const safeContent = typeof item.content === "string" ? item.content : ""

            const createdAt = item.createdAt ? new Date(item.createdAt) : new Date()
            const updatedAt = item.updatedAt ? new Date(item.updatedAt) : new Date()

            const note = await prisma.note.create({
                data: {
                    title: safeTitle,
                    content: safeContent,
                    userId: userId,
                    createdAt,
                    updatedAt,
                },
            })

            created.push(note)
        }
    } catch (e) {
        return res.status(500).json({ error: "Chyba při importu" })
    }

    return res.status(200).json({
        success: true,
        count: created.length,
    })
}