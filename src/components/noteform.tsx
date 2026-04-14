import { useState } from "react"

export default function NoteForm({ onCreate }: any) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault()
        onCreate({ title, content })
        setTitle("")
        setContent("")
    }

    return (
        <div style={{
            marginTop: 30,
            background: "#1a1a1a",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #2a2a2a"
        }}>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Název poznámky"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 10,
                        marginBottom: 10,
                        background: "#111",
                        border: "1px solid #333",
                        borderRadius: 8,
                        color: "#fff"
                    }}
                />

                <textarea
                    placeholder="Obsah"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 10,
                        minHeight: 80,
                        background: "#111",
                        border: "1px solid #333",
                        borderRadius: 8,
                        color: "#fff"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        marginTop: 10,
                        background: "#2563eb",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: 8,
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    Vytvořit poznámku
                </button>
            </form>
        </div>
    )
}