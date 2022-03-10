import { Button } from "@mui/material"
import type { NextPage } from "next"
import Head from "next/head"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import { useEffect, useContext } from "react"
import axios from 'axios'
import { UserContext } from "../context/UserContext"
import { User } from "../utils/types/user"

const Home: NextPage = () => {
  const user: User= useContext( UserContext );
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default Home
