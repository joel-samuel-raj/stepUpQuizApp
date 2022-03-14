import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Button, Container, InputAdornment, Snackbar, TextField } from '@mui/material'
import axios from 'axios'
import router, { Router } from 'next/router'
import React, { useState, useReducer } from 'react'

export default function Create ({name}: any) {
    const [ , forceUpdate ] = useReducer( x => x + 1, 0 )
    const [ questions, setQuestions ] = useState( [ "question #1" ] )
    const [ createModel, setCreateModel ] = useState( false )
    const addQuesion = ( i: number ) => {
        setQuestions( ( prev ) => [ ...prev, `question #${ questions.length + 1 }` ] )
    }

    const removeQuestion = ( i: number ) => {
        if ( questions.length === 1 ) return
        let array = questions
        array.pop()
        setQuestions( array )
        forceUpdate()
    }

    const handleChange = ( e: any, i: number ) => {
        let value = e.target.value
        let array = questions
        array[ i ] = value
        setQuestions( array )
    }

    const submit = () => {
        axios.post( "server/posts/create", { name: name, questions: questions } ).then( (res) => {
            console.log(res)
            setCreateModel( true )
            router.reload()
        } )
    }

    return (
        <>
            <Container className="my-4">
                { questions.map( ( quest: any, i: number ) => (
                    <TextField key={ i } onChange={ ( e ) => { handleChange( e, i ) } } className="my-2" label={ `Question #${ i + 1 }` } multiline fullWidth InputProps={ {
                        endAdornment: (
                            <>
                                <InputAdornment position="end">
                                    { i === questions.length - 1 && <FontAwesomeIcon onClick={ () => { addQuesion( i ) } } className="text-blue-600 cursor-pointer" icon={ faAdd } /> }
                                </InputAdornment>
                                <InputAdornment position="end">
                                    { i === questions.length - 1 &&
                                        <FontAwesomeIcon className="text-red-600 cursor-pointer" icon={ faClose } onClick={ () => { removeQuestion( i ) } } /> }
                                </InputAdornment>
                            </>
                        ),
                    } } />
                ) ) }
                <Button className="float-right" onClick={ () => { submit() } }>
                    Post Quiz
                </Button>
            </Container>
            <Snackbar open={ createModel } autoHideDuration={ 6000 } onClose={ () => {setCreateModel(false)} }>
                <Alert onClose={ () => {setCreateModel(false)} } severity="success" sx={ { width: '100%' } }>
                    Post Created Succesfully 😍
                </Alert>
            </Snackbar>
        </>
    )
}
