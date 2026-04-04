import { signIn } from "next-auth/react"
import { useState } from "react"

export default function Login() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const res = await signIn("credentials", {
            redirect: false,
            name,
            password,
        })

        if (res?.ok) {
            window.location.href = "/"
        } else {
            alert("Nesprávné přihlašovací údaje")
        }
    }

    return (
        <div style={{ padding: 40 }}>
            <h1>Přihlášení</h1>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Uživatelské jméno"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br /><br />

                <input
                    type="password"
                    placeholder="Heslo"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />

                <button type="submit">Přihlásit se</button>
            </form>
        </div>
    )
}