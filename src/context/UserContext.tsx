import axios from "axios"
import React, { useState, useEffect, useContext, createContext } from "react"
import { User } from "../utils/types/user"

export const UserContext = createContext( {} )
export const UserProvider = ( props: any ) => {
    const [ user, setuser ] = useState<User>( {} )
    useEffect( () => {
        const getuser = async () => {
            await axios.get( "http://localhost:3000/users", {
                withCredentials: true
            } ).then( ( res ) => setuser( res.data ) )
        }
        getuser()
    }, [] )
    return (
        <UserContext.Provider value={ user }>
            { props.children }
        </UserContext.Provider>
    )
}