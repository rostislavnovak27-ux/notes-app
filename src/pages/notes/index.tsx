import { getSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import NoteForm from "@/components/noteform"
import NoteCard from "@/components/notecard"

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

    const handleCreate = async ({ title, content }: any) => {
        const res = await fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
        })

        if (res.ok) {
            const newNote = await res.json()
            setNotes([newNote, ...notes])
        }
    }

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0f0f0f",
            color: "#fff",
            padding: "40px",
            fontFamily: "sans-serif"
        }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <h1 style={{ fontSize: 28 }}>Moje poznámky</h1>

                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        style={{
                            background: "#1f1f1f",
                            color: "#fff",
                            border: "1px solid #333",
                            padding: "8px 14px",
                            borderRadius: 8,
                            cursor: "pointer"
                        }}
                    >
                        Odhlásit se
                    </button>
                </div>

                <NoteForm onCreate={handleCreate} />

                <div style={{ marginTop: 30 }}>
                    {loading ? (
                        <p>Načítání...</p>
                    ) : (
                        notes.map((note) => (
                            <NoteCard key={note.id} note={note} />
                        ))
                    )}
                </div>

            </div>
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