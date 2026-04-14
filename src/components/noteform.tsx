import { useState } from "react"
import { ui } from "@/components/notecard"

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
        <div style={{ ...ui.card.base, marginTop: 30 }}>
            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Název poznámky"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ ...ui.input.base, marginBottom: 10 }}
                />

                <textarea
                    placeholder="Obsah"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                        ...ui.input.base,
                        minHeight: 80
                    }}
                />

                <button
                    type="submit"
                    style={{ ...ui.button.primary, marginTop: 10 }}
                >
                    Vytvořit poznámku
                </button>

            </form>
        </div>
    )
}