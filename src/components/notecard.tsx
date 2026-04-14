export default function NoteCard({ note }: any) {
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
            <h3 style={{ marginBottom: 6 }}>{note.title}</h3>
            <p style={{ color: "#aaa" }}>{note.content}</p>
        </div>
    )
}