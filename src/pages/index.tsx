import { Box, Button, Container, Divider, IconButton } from "@mui/material"
import type { NextPage } from "next"
import Head from "next/head"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import { useEffect, useContext, useState } from "react"
import axios from 'axios'
import { UserContext } from "../context/UserContext"
import { User } from "../utils/types/user"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Editor from "rich-markdown-editor"

type questionType = {
  _id?: String,
  name?: String,
  questions?: Array<String>
}

const Home: NextPage = () => {
  const user: User = useContext( UserContext )
  const [ data, setData ] = useState( [] )
  const [answer, setAnswer] = useState<Array<Array<string>>>([[]])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [ question, setQuestion ] = useState<questionType>( {} )
  useEffect( () => {
    axios.get( "/server/posts/getPosts" ).then( res => setData( res.data ) )
  }, [] )

  const handleChange = (e: any, j: number) => {
    const array: Array<string> = answer[ currentQuestion ]
    array[j] = e
    setAnswer(array)
    console.log(array)
  }

  return (
    <>
      <Navbar />
      <Container className="my-4 mt-32">
        <h3 className="m-4"> Available Quiz </h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          { data.map( ( dat: any, i: number ) => (
            <Button key={ i } onClick={ () => { setQuestion( data[ i ] ); setCurrentQuestion(i) } } className="bg-gradient-to-tr cursor-pointer text-white from-purple-400 to-purple-500 rounded relative">
              { dat.name }
            </Button>
          ) ) }
        </div>
      </Container>
      { question._id && <Container className="my-4 mt-20">
        <h3 className="text-center"> { question.name } </h3>
        { question.questions!.map( ( quest: String, j: number ) => ( <div key={ j } className="p-4">
          <p className="text-lg"> { quest } </p>
          <div className="my-4">
            <Editor defaultValue={answer[currentQuestion][j]} onChange={ ( value ) => { handleChange( value(), j ) } } className="bg-black" placeholder="Start Writing Here..."
            />
          </div>
        </div> 
        ) ) }
      </Container> }
    </>
  )
}

export default Home
