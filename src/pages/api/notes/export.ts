import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "@/lib/prisma"

function formatDate() {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "")
}

export default async function handler(req: any, res: any) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Metoda není povolena" })
    }

    const session = await getServerSession(req, res, authOptions)

    if (!session || !session.user?.id) {
        return res.status(401).json({ error: "Neautorizovaný" })
    }

    const userId = Number(session.user.id)

    const rawId = req.query.id
    const id = rawId ? Number(rawId) : null

    if (rawId && isNaN(id as number)) {
      return res.status(400).json({ error: "Neplatné id" })
    }

    let notes

    if (id) {
        const note = await prisma.note.findFirst({
            where: {
                id: id,
                userId: userId,
            },
        })

        if (!note) {
            return res.status(404).json({ error: "Nenalezeno" })
        }

        notes = [
            {
                title: note.title,
                content: note.content,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt,
            },
        ]
    } else {
        const all = await prisma.note.findMany({
            where: { userId: userId },
        })

        notes = all.map((n) => ({
            title: n.title,
            content: n.content,
            createdAt: n.createdAt,
            updatedAt: n.updatedAt,
        }))
    }

    if (!Array.isArray(notes)) {
      notes = []
    }

    const date = formatDate()

    const filename = id
      ? `note-${id}-${date}.json`
      : `notes-export-${date}.json`

    res.setHeader("Content-Type", "application/json; charset=utf-8")
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`)

    return res.status(200).send(JSON.stringify(notes, null, 2))
}