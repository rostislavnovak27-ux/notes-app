import { getSession } from "next-auth/react"

export default function Home() {
    return null
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
        redirect: {
            destination: "/notes",
            permanent: false,
        },
    }
}