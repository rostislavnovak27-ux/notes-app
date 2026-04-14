import { GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { useEffect, useState } from "react"

export default function NotesPage() {
    const [notes, setNotes] = useState<any[]>([])

    useEffect(() => {
        fetch("/api/notes")
            .then(res => res.json())
            .then(data => setNotes(data))
    }, [])

    return (
        <div style={{ padding: 20 }}>
            <h1>Poznámky</h1>

            {notes.length === 0 && <p>Žádné poznámky</p>}

            {notes.map((note) => (
                <div key={note.id} style={{ marginBottom: 16, padding: 12, border: "1px solid #333", borderRadius: 8 }}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}