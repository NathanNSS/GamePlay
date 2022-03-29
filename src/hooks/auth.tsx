import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react';


const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;
const { RESPONSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;


import * as AuthSession from "expo-auth-session";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../service/api';
import { COLLECTION_USERS } from '../configs/database';


interface User {
    id: string;
    userName: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

interface AuthContextData {
    user: User;
    loading: boolean;
    signIn: () => Promise<void>;
    logOut: () => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string;
        error?: string;
    }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User)
    const [loading, setLoading] = useState(false);

    async function signIn() {
        try {
            setLoading(true)

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

            if (type === "success" && !params.error) {
                api.defaults.headers.common['Authorization'] = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me');

                const firstName = userInfo.data.username.split(' ')[0];

                userInfo.data.avatar = userInfo.data.avatar !== null ? `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png` : 'https://github.com/nathannss.png';

                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                }

                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
                setUser(userData);
            }

        } catch {
            throw new Error('Não foi possivel autenticar')
        } finally {
            setLoading(false)
        }
    }

    async function loadUserStorageData() {
        const storage = await  AsyncStorage.getItem(COLLECTION_USERS);

        if(storage){
            const userLogged = JSON.parse(storage) as User;
            api.defaults.headers.common['Authorization'] = `Bearer ${userLogged.token}`;

            setUser(userLogged);
        }
    }

    async function logOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USERS);
    }

    useEffect(()=>{
        loadUserStorageData();
    },[])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export {
    AuthProvider,
    useAuth
}