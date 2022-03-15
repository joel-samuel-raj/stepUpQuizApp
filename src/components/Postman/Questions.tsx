import { faArrowRight, faClose, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Container, IconButton, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import Create from './Create'
import Update from './Update'

export default function Questions () {
  const [ model, setModel ] = useState( false )
  const [ name, setName ] = useState( "" )
  const [ questionsModal, setQuestionsModal ] = useState( false )
  const [ confirmModal, setConfirmModal ] = useState( false )
  const [ editModal, setEditModal ] = useState( false )
  const [ id, setId ] = useState<string[]>( [] )
  const [ data, setData ] = useState<any>( [ { name: "" } ] )
  const [ update, setUpdate ] = useState( "" )

  useEffect( () => {
    axios.get( "/server/posts/getPosts" ).then( ( response ) => {
      setData( response.data )
      console.log( data )
    } )
  }, [] )

  const handleDelete = () => {
    axios.get( `/server/posts/delete/${ id.pop() }` ).then( () => {
      router.reload()
    } )
  }
  return (
    <>
      <Container className="py-4 rounded shadow-lg bg-purple_heart-200">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          { data.map( ( dat: any, i: number ) => (
            <Box key={ i } className="bg-gradient-to-tr cursor-pointer text-white from-purple-400 to-purple-500 p-4 rounded relative">
              <h3> { dat.name } </h3>
              <p className="text-gray-300"> Participants </p>
              <IconButton className="p-2 w-6 h-6 cursor-pointer bg-purple-800 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => {
                setConfirmModal( true )
                setId( ( arr ) => [ ...arr, dat._id ] )
              } }>
                <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
              </IconButton>
              <IconButton className="p-2 w-6 h-6 cursor-pointer bg-green-500 hover:bg-green-600 rounded absolute top-2 right-10" onClick={ () => {
                setEditModal( true ); setUpdate(dat._id as string)
              } }>
                <FontAwesomeIcon className="text-white text-lg" icon={ faPencil }></FontAwesomeIcon>
              </IconButton>
            </Box>
          ) ) }
        </div>
          <Button className="mt-4" onClick={ () => { setModel( true ) } } variant="contained"> Create New Quiz </Button>
      </Container>
      <Modal
        className="flex justify-center items-center"
        open={ model }
        onClose={ () => { setModel( false ) } }>
        <Box className="bg-white px-16 py-8 rounded relative">
          <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setModel( false ) }>
            <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
          </IconButton>
          <h3 className="m-4 mt-0"> Create new Quiz </h3>
          <TextField fullWidth value={ name } onChange={ ( e ) => { setName( e.target.value ) } } label="Name of the new Quiz" placeholder="Type..." />
          <Button onClick={ () => { setModel( false ); setQuestionsModal( true ) } } className="float-right mt-4"> next <FontAwesomeIcon className="ml-2" icon={ faArrowRight }></FontAwesomeIcon>  </Button>
        </Box>
      </Modal>

      <Modal
        className="flex justify-center items-center"
        open={ questionsModal }
        onClose={ () => { setQuestionsModal( false ) } }>
        <Box className="bg-white px-16 py-8 rounded relative">
          <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setQuestionsModal( false ) }>
            <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
          </IconButton>
          <Create name={ name } />
        </Box>
      </Modal>
      
      <Modal className="flex justify-center items-center"
        open={ editModal }
        onClose={ () => { setEditModal( false ) } }>
        <Box className="bg-white px-16 py-8 rounded relative flex justify-center items-center flex-col">
              <Create id={update}/>
        </Box>
      </Modal>

      <Modal
        className="flex justify-center items-center"
        open={ confirmModal }
        onClose={ () => { setConfirmModal( false ) } }>
        <Box className="bg-white px-16 py-8 rounded relative flex justify-center items-center flex-col">
          <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setConfirmModal( false ) }>
            <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
          </IconButton>
          <h4> Are you sure to delele the post ? </h4>
          <div>
            <Button onClick={ () => { handleDelete() } } className="text-yellow-500" > Yes </Button>
            <Button onClick={ () => { setConfirmModal( false ) } } className="text-red-500" > No </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}
