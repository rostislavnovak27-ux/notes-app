import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    // 1) hash demo password
    const hashedPassword = await bcrypt.hash('demo1234', 10)

    // 2) upsert demo user (no duplicates)
    const user = await prisma.user.upsert({
        where: { name: 'demo' },
        update: {},
        create: {
            name: 'demo',
            password: hashedPassword,
        },
    })

    // 3) ensure deterministic demo data (clear then recreate)
    await prisma.note.deleteMany({
        where: { userId: user.id },
    })

    // 4) create demo notes for the user
    await prisma.note.createMany({
        data: [
            {
                title: 'První poznámka',
                content: 'Tohle je moje první poznámka',
                userId: user.id,
            },
            {
                title: 'Druhá poznámka',
                content: 'Další testovací obsah',
                userId: user.id,
            },
        ],
    })

    console.log('Seed hotovy: demo (heslo: demo1234)')
}

main()
    .catch((e) => {
        console.error('Chyba pri seedu:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })