import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('demo1234', 10)

    const user = await prisma.user.upsert({
        where: { name: 'demo' },
        update: {},
        create: {
            name: 'demo',
            password: hashedPassword,
            notes: {
                create: [
                    {
                        title: 'První poznámka',
                        content: 'Tohle je moje první poznámka',
                    },
                    {
                        title: 'Druhá poznámka',
                        content: 'Další testovací obsah',
                    },
                ],
            },
        },
    })

    console.log('Seed hotový:', user.name)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })