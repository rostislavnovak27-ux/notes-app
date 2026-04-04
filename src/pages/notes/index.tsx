import { getSession, signOut } from "next-auth/react"

export default function Notes() {
    return (
        <div style={{ padding: 40 }}>
            <h1>Moje poznámky</h1>

            <button onClick={() => signOut({ callbackUrl: "/login" })}>
                Odhlásit se
            </button>
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