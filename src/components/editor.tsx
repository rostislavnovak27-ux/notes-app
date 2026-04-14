import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useState } from "react"
import { ui } from "@/components/notecard"

const globalStyles = `
.tiptap-editor h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 16px 0;
}
.tiptap-editor ul {
  padding-left: 24px;
  color: #fff;
  list-style-type: disc !important;
  list-style-position: outside;
}
.tiptap-editor li {
  margin: 4px 0;
  color: #fff;
  display: list-item;
}
.tiptap-editor ul li::marker {
  color: #ffffff !important;
  font-size: 1em;
}
`

export default function Editor({ value, onChange }: any) {
    const [mounted, setMounted] = useState(false)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                bulletList: {
                    keepMarks: true,
                },
                orderedList: {
                    keepMarks: true,
                },
            }),
        ],
        content: value || "",
        immediatelyRender: false,
        editorProps: {
            attributes: {
                style: "outline: none; color: #e6e6e6;",
                class: "tiptap-editor"
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        }
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!editor || !editor.view) return
        if (value !== editor.getHTML()) {
            editor.commands.setContent(value || "")
        }
    }, [value, editor])

    if (!mounted || !editor || !editor.view) return null

    const btn = ui.button.base
    const active = { ...ui.button.base, background: "#333", color: "#fff" }

    return (
        <div style={{ width: "100%" }}>
            <style>{globalStyles}</style>
            {/* Toolbar */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>

                <button
                    style={editor.isActive("bold") ? active : btn}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    Bold
                </button>

                <button
                    style={editor.isActive("italic") ? active : btn}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    Italic
                </button>

                <button
                    style={editor.isActive("heading", { level: 2 }) ? active : btn}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    H2
                </button>

                <button
                    style={editor.isActive("bulletList") ? active : btn}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    List
                </button>

            </div>

            <EditorContent
                editor={editor}
                style={{
                    minHeight: 220,
                    lineHeight: 1.7,
                    fontSize: 15,
                    padding: "6px 2px"
                }}
            />
        </div>
    )
}
