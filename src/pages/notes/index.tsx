import { getSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import NoteForm from "@/components/noteform"
import { useRouter } from "next/router"
import { layout } from "@/components/ui"
import { ui, hover } from "@/components/notecard"

export default function Notes() {
    const [notes, setNotes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const loadNotes = async () => {
        try {
            const res = await fetch("/api/notes", { credentials: "include" })
            if (!res.ok) {
                throw new Error()
            }
            const data = await res.json()
            setNotes(Array.isArray(data) ? data : [])
        } catch {
            setNotes([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadNotes()
    }, [])

    const handleCreate = async ({ title, content }: any) => {
        const res = await fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ title, content }),
        })

        if (res.ok) {
            await loadNotes()
        }
    }

    const handleDelete = async (id: number) => {
        const res = await fetch(`/api/notes/${id}`, {
            method: "DELETE",
            credentials: "include",
        })

        if (res.ok) {
            await loadNotes()
        }
    }

    const handleUpdate = async (id: number, data: any) => {
        const res = await fetch(`/api/notes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        })

        if (res.ok) {
            await loadNotes()
        }
    }

    return (
        <div style={ui.layout.page}>
            <div style={ui.layout.container}>

                <div style={layout.header}>
                    <h1 style={ui.text.title}>Moje poznámky</h1>

                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        style={{ ...ui.button.base, background: "#1f1f1f", color: "#fff" }}
                    >
                        Odhlásit se
                    </button>
                </div>

                <div style={layout.actions}>
                    <button
                        onClick={() => window.open("/api/notes/export", "_blank")}
                        style={ui.button.base}
                    >
                        Export
                    </button>

                    <button
                        onClick={() => document.getElementById("importInput")?.click()}
                        style={ui.button.base}
                    >
                        Import
                    </button>

                    <input
                        id="importInput"
                        type="file"
                        style={{ display: "none" }}
                        onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file) return

                            const text = await file.text()

                            let json
                            try {
                                json = JSON.parse(text)
                            } catch {
                                alert("Neplatný JSON soubor")
                                return
                            }

                            const res = await fetch("/api/notes/import", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                credentials: "include",
                                body: JSON.stringify(json),
                            })

                            if (!res.ok) {
                                alert("Chyba při importu")
                                return
                            }

                            alert("Import hotový")
                            await loadNotes()

                            // reset input so same file can be uploaded again
                            ;(e.target as HTMLInputElement).value = ""
                        }}
                    />
                </div>

                <NoteForm onCreate={handleCreate} />

                <div style={layout.list}>
                    {loading ? (
                        <p>Načítání...</p>
                    ) : (
                        notes.map((note, index) => (
                            <div key={note.id}>
                                <div style={{ ...ui.text.small, marginBottom: 4 }}>
                                    {index + 1}.
                                </div>

                                <div
                                    style={ui.listItem.base}
                                    {...hover.item}
                                    onClick={() => router.push(`/notes/${note.id}`)}
                                >
                                    {note.title}
                                </div>
                            </div>
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