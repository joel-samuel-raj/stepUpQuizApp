import { Box, Button, InputAdornment, TextField, Snackbar, Alert, FormControl, useFormControl } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import React from 'react'

export default function password () {
    const router = useRouter()
    const query = router.query
    const [ newPassword, setNewPassword ] = useState( "" )
    const [ open, setOpen ] = useState( false )
    const [ error, setError ] = useState( "" )
    console.log(useFormControl())
    const changePassword = () => {
        axios.post( "server/auth/local/reset/" + query.password, {
            password: newPassword
        } ).catch( e => {
            // console.log(JSON.parse(JSON.stringify(e)))
            setError(e.message)
            setOpen( true )
        } )
    }
    return (
        <FormControl className="w-[100vw] h-[100vh] justify-center items-center bg-white py-12 px-16 rounded">
            <TextField color="primary" name="password" className="w-full" InputProps={ {
                startAdornment: (
                    <InputAdornment position="start">
                        <FontAwesomeIcon icon={ faLock }></FontAwesomeIcon>
                    </InputAdornment>
                ),
            } } label="Password" required type="password" variant="outlined" />
            <TextField color="primary" name="password" className="w-full my-4" InputProps={ {
                startAdornment: (
                    <InputAdornment position="start">
                        <FontAwesomeIcon icon={ faLock }></FontAwesomeIcon>
                    </InputAdornment>
                ),
            } } label="Confirm Password" onChange={ ( e ) => setNewPassword( e.target.value ) } required type="password" variant="outlined" />
            <Button variant="contained" onClick={ () => changePassword() } className="block w-full mx-auto p-1 my-4"> Reset Password </Button>
            <Snackbar open={ open } autoHideDuration={ 10000 } onClose={ () => { setOpen( false ) } }>
                <Alert onClose={ () => { setOpen( false ) } } severity="error">
                    { error }
                </Alert>
            </Snackbar>
        </FormControl>
    )
}
