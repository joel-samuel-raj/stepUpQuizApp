import { Button } from "@mui/material"
import type { NextPage } from "next"
import Head from "next/head"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import { useEffect, useContext } from "react"
import { Appcontext } from "./appcontext"
import axios from 'axios'

// const Home: NextPage = () => (
//   <div>
//     <Navbar />
//   </div>
// );

const Home = () => {

  const value: any= useContext( Appcontext );

  useEffect( () => {
    const getuser = async () => {
      // await axios.get( 'http://localhost:3000/users/', {

      // })
      // .then( (response) => console.log(response))
      const user = await fetch( "http://localhost:3000").then( ( response ) => response.json())

      // console.log( user.data )
      // .then( data => console.log( data ) )

      console.log()
    }

    getuser()
  }, [] )


  return (
    <div>
      {/* <Navbar /> */}
      {/* <h1 className="mt-[100px]">{value}</h1> */ }
      <h1>{value}</h1>
    </div>
  )
}

export default Home
