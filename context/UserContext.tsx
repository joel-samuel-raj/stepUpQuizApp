import { createContext, ReactNode, SetStateAction, useContext, useState } from "react"
import axios from 'axios'

type UserContext = {
    name?: string,
    email?: string,
    profilePicture?: string,
    isAdmin?: boolean,
    googleId?: string,
    login?: (user: User) => void,
    logout?: () => void,
}

class User {
    name?: ""
    email?: ""
    profilePicture?: ""
    isAdmin?: false
    googleId?: ""
}

const UserDefaults: UserContext = {
    ...new User,
    login: () => {},
    logout: () => {},
} 

const UserContext = createContext<UserContext>(UserDefaults);

type Props = {
    children: ReactNode
}

export function useUser() {
    return useContext(UserContext);
}

export function UserProviders ({children}: Props) {
    const [ user, SetUser ] = useState<object>(new User)
    const login = (user: SetStateAction<typeof User>) => {
        SetUser(user)
    }
    const logout = () => { SetUser( {} ) }
    return (
        <>
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        </>
    );
}