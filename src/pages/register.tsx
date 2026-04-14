import { useState } from "react"
import { ui } from "@/components/notecard"

export default function Register() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, password }),
        })

        if (res.ok) {
            alert("Registrace úspěšná")
            window.location.href = "/login"
        } else {
            const data = await res.json()
            alert(data.error || "Chyba při registraci")
        }
    }

    return (
        <div style={{ ...ui.card.base, maxWidth: 420, margin: "80px auto" }}>
            <h1>Registrace</h1>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Uživatelské jméno"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ ...ui.input.base, marginTop: 10 }}
                />
                <br /><br />

                <input
                    type="password"
                    placeholder="Heslo"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ ...ui.input.base, marginTop: 10 }}
                />
                <br /><br />

                <button type="submit" style={{ ...ui.button.primary, marginTop: 12 }}>
                    Registrovat
                </button>
            </form>

            <p style={{ marginTop: 14 }}>
                Máš účet? <a href="/login" style={{ color: "#9aa7ff" }}>Přihlásit se</a>
            </p>
        </div>
    )
}