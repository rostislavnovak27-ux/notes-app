import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { ui } from "@/components/notecard"

export default function Home() {
    const [notes, setNotes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        fetch("/api/notes", { credentials: "include" })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("Chyba při načítání poznámek")
                }
                return res.json()
            })
            .then((data) => {
                setNotes(Array.isArray(data) ? data : [])
            })
            .catch(() => {
                setNotes([])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <div style={ui.card.base}>
                <h1 style={{ marginBottom: 20, fontSize: 24 }}>
                    Poznámky
                </h1>
                <button
                    onClick={() => {
                        window.open(`/api/notes/export`, "_blank")
                    }}
                    style={{ ...ui.button.base, marginBottom: 16 }}
                >
                    Export vše
                </button>

                {loading ? (
                    <p>Načítání...</p>
                ) : (
                    <div>
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                onClick={() => router.push(`/notes/${note.id}`)}
                            >
                                {note.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
