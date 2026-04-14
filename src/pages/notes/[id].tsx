import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import { getSession } from "next-auth/react"
import { ui } from "@/components/notecard"
import Editor from "@/components/editor"

export default function NoteDetail() {
    const router = useRouter()
    const { id } = router.query

    const [note, setNote] = useState<any>(null)
    const timeoutRef = useRef<any>(null)

    useEffect(() => {
        if (!id) return

        fetch(`/api/notes/${id}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                data.content = typeof data.content === "string" ? data.content : ""
                setNote(data)
            })
    }, [id])

    useEffect(() => {
        if (!note || !id) return

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            fetch(`/api/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    title: note.title,
                    content: note.content,
                }),
            })
        }, 800)
    }, [note])

    if (!note) return null

    return (
        <div style={ui.layout.page}>
            <div style={ui.layout.container}>

                <button
                    onClick={() => router.push("/notes")}
                    style={{ ...ui.button.ghost, marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                >
                    ← Zpět
                </button>

                <input
                    value={note.title}
                    onChange={(e) =>
                        setNote({ ...note, title: e.target.value })
                    }
                    style={{
                        ...ui.input.base,
                        fontSize: 28,
                        fontWeight: 600,
                        background: "transparent",
                        border: "none",
                        marginBottom: 20
                    }}
                />

                <Editor
                    value={note.content}
                    onChange={(content: any) =>
                        setNote({ ...note, content })
                    }
                />
                <button
                    onClick={() => {
                        window.open(`/api/notes/export?id=${id}`, "_blank")
                    }}
                    style={{ ...ui.button.base, marginTop: 20, alignSelf: "flex-start" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                >
                    Export
                </button>

                <button
                    onClick={async () => {
                        const confirmed = confirm("Opravdu chceš smazat tuto poznámku?")
                        if (!confirmed) return

                        await fetch(`/api/notes/${id}`, {
                            method: "DELETE",
                            credentials: "include",
                        })

                        router.push("/notes")
                    }}
                    style={{ ...ui.button.danger, marginTop: 40, alignSelf: "flex-start" }}
                >
                    Smazat
                </button>

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

    return { props: {} }
}