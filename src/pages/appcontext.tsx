import React, { useState, useEffect, useContext, createContext } from "react"

export const Appcontext = createContext({})

export const AppProvider = (props:any) => {

    const [ fectdata, setFetchdata ] = useState( "" )

    useEffect( () => {
        const getuser = async () => {
            const user = await fetch( "http://localhost:3000" ).then( ( response ) => response.json() )

            setFetchdata( user.data )
            // console.log(user.data)
        }
        getuser()
    }, [] )

    return (
        <Appcontext.Provider value={fectdata}>
            {props.children} 
        </Appcontext.Provider>
    )
}