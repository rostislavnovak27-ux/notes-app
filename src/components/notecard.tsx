import { useState } from "react"

export default function NoteCard({ note, onDelete, onUpdate }: any) {
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    const handleSave = () => {
        onUpdate(note.id, { title, content })
        setEditing(false)
    }

    return (
        <div
            style={{
                background: "#1a1a1a",
                padding: 16,
                borderRadius: 12,
                border: "1px solid #2a2a2a",
                marginBottom: 12
            }}
        >
            {editing ? (
                <>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            width: "100%",
                            marginBottom: 8,
                            background: "#111",
                            color: "#fff",
                            border: "1px solid #333",
                            padding: 8,
                            borderRadius: 6
                        }}
                    />

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{
                            width: "100%",
                            marginBottom: 8,
                            background: "#111",
                            color: "#fff",
                            border: "1px solid #333",
                            padding: 8,
                            borderRadius: 6
                        }}
                    />

                    <button onClick={handleSave}>
                        Uložit
                    </button>
                </>
            ) : (
                <>
                    <h3 style={{ marginBottom: 6 }}>{note.title}</h3>
                    <p style={{ color: "#aaa", marginBottom: 12 }}>{note.content}</p>

                    <div style={{ display: "flex", gap: 12 }}>
                        <button
                            onClick={() => setEditing(true)}
                            style={{
                                padding: "6px 12px",
                                background: "#2d2d2d",
                                color: "#fff",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer"
                            }}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(note.id)}
                            style={{
                                padding: "6px 12px",
                                background: "#3a1f1f",
                                color: "#ff6b6b",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer"
                            }}
                        >
                            Smazat
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}