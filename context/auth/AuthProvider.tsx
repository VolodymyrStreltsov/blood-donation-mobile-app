import { useRouter, useSegments } from 'expo-router'
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react'

const AuthContext = createContext({} as AuthContextData)

export const useAuth = () => useContext(AuthContext)

function useProtectedRoute(user: User) {
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)'

        if (!user && !inAuthGroup) {
            router.replace('/sign-in')
        } else if (user && inAuthGroup) {
            router.replace('/')
        }
    }, [user, segments])
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState(null as User | null)

    useProtectedRoute(auth)

    return (
        <AuthContext.Provider
            value={{
                signIn: (user) => setAuth(user),
                signOut: () => setAuth(null),
                user: auth,
            }}>
            {children}
        </AuthContext.Provider>
    )
}
