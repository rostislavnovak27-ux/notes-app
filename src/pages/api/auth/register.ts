import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/hash"

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Metoda není povolena" })
    }

    const { name, password } = req.body || {}

    const safeName = typeof name === "string" ? name.trim() : ""
    const safePassword = typeof password === "string" ? password : ""

    if (!safeName || !safePassword) {
        return res.status(400).json({ error: "Chybí data" })
    }

    if (safeName.length < 3) {
        return res.status(400).json({ error: "Jméno musí mít alespoň 3 znaky" })
    }

    if (safePassword.length < 6) {
        return res.status(400).json({ error: "Heslo musí mít alespoň 6 znaků" })
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { name: safeName },
        })

        if (existingUser) {
            return res.status(400).json({ error: "Uživatel už existuje" })
        }

        const hashedPassword = await hashPassword(safePassword)

        await prisma.user.create({
            data: {
                name: safeName,
                password: hashedPassword,
            },
        })
    } catch (e) {
        return res.status(500).json({ error: "Chyba při registraci" })
    }

    return res.status(201).json({ message: "Uživatel vytvořen" })
}