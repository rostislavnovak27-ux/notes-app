import { getSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Notes() {
    const [notes, setNotes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/notes")
            .then((res) => res.json())
            .then((data) => {
                setNotes(data)
                setLoading(false)
            })
    }, [])

    return (
        <div style={{ padding: 40 }}>
            <h1>Moje poznámky</h1>

            <button onClick={() => signOut({ callbackUrl: "/login" })}>
                Odhlásit se
            </button>

            <hr />

            {loading ? (
                <p>Načítání...</p>
            ) : (
                <ul>
                    {notes.map((note) => (
                        <li key={note.id}>
                            <strong>{note.title}</strong>
                            <br />
                            {note.content}
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context)

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