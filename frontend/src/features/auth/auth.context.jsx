import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { getMe, login, logout, register } from './services/auth.api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const bootstrapSession = async () => {
            try {
                const data = await getMe();
                if (!cancelled) {
                    setUser(data.user);
                }
            } catch {
                if (!cancelled) {
                    setUser(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        bootstrapSession();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleLogin = useCallback(async (credentials) => {
        const data = await login(credentials);
        setUser(data.user);
        return data;
    }, []);

    const handleRegister = useCallback(async (credentials) => {
        const data = await register(credentials);
        setUser(data.user);
        return data;
    }, []);

    const handleLogout = useCallback(async () => {
        await logout();
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            user,
            loading,
            handleLogin,
            handleRegister,
            handleLogout,
        }),
        [user, loading, handleLogin, handleRegister, handleLogout],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
