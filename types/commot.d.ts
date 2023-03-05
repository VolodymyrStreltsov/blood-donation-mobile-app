type ThemeProps = {
    lightColor?: string
    darkColor?: string
}

type User = { name: string; email: string } | null

interface AuthContextData {
    signIn: (user: User) => void
    signOut: () => void
    user: User
}
