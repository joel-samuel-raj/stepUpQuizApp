import * as React from 'react'
import { AppBar, Box, Button, Drawer, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, Modal, TextField, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClose, faLock, faEnvelope, faAddressBook, faPhone } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { User } from "../utils/types/user"
import router from 'next/router'

export default function Navbar ({loginModel}: {loginModel?: boolean}) {

    const currentUser: User = useContext( UserContext )
    const stratergy = currentUser.stratergy

    const [ drawer, setDrawer ] = React.useState( false )
    const [ modal, setModal ] = React.useState( false )
    const [ createModal, setCreateModal ] = React.useState( false )
    const [ forgotPassword, setForgotPassword ] = React.useState( false )

    const [ newUser, setNewUser ] = useState( {
        name: "",
        rollNumber: "",
        phoneNumber: "",
        email: "",
        password: "",
        profilePicture: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDM4OS4zNCAzODkuMzQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4OS4zNCAzODkuMzQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiMxRUE2QzY7IiBkPSJNMzQ3LjQxNSwzMzAuM2MwLDAuMDQsMCwwLjA4LDAsMC4xM2MtNDAuMzcsMzYuNjEtOTMuOTYsNTguOTEtMTUyLjc0LDU4LjkxDQoJYy01OC43OSwwLTExMi4zOC0yMi4zLTE1Mi43NS01OC45MWMwLTAuMDUsMC0wLjA5LDAtMC4xM2MwLTYwLjg5LDM1LjYzLTExMy40NSw4Ny4xNy0xMzcuOThjMTkuMzcsMTkuMzIsNDIuMDUsMjkuNzMsNjUuNTgsMjkuNzMNCgljMjMuNTQsMCw0Ni4yMS0xMC40MSw2NS41OS0yOS43M0MzMTEuODA1LDIxNi44NSwzNDcuNDE1LDI2OS40MSwzNDcuNDE1LDMzMC4zeiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZDRDA5RjsiIGQ9Ik0xOTQuNjc1LDBjNDYuNjYsMCw4NC40OSwzNy44Miw4NC40OSw4NC40OGMwLDQ2LjY3LTM3LjgzLDExMC40OS04NC40OSwxMTAuNDkNCglzLTg0LjQ5LTYzLjgyLTg0LjQ5LTExMC40OUMxMTAuMTg1LDM3LjgyLDE0OC4wMTUsMCwxOTQuNjc1LDB6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
    } )

    React.useEffect( () => {
        setModal(!modal)
    }, [loginModel])

    const [ user, setUser ] = useState( {
        email: "",
        password: ""
    } )

    const [ email, setEmail ] = useState( {
    } )
    
    const onClickHandler = ( e: any ) => {
        const { name, value } = e.target
        setNewUser( { ...newUser, [ name ]: value } )
    }

    const onClickHandler2 = ( e: any ) => {
        const { name, value } = e.target
        setUser( { ...user, [ name ]: value } )
    }

    const onClickHandlerPassword = ( e: any ) => {
        setEmail( { email: e } )
        console.log( email )
    }

    const uploadProfile = ( e: any ) => {
        let file = e.target.files[ 0 ]
        let reader = new FileReader()
        reader.onload = ( e ) => {
            let profilePicture = e!.target!.result!.toString()
            console.log( profilePicture )
            setNewUser( { ...newUser, profilePicture: profilePicture } )
        }
        reader.readAsDataURL( file )
    }

    const createUser = async () => {
        await axios.post( "server/auth/local/signin", newUser ).then( () => router.reload() )
    }

    const loginUser = async () => {
        await axios.post( "/server/auth/local/login", user ).then( () => router.reload() )
    }

    const resetPassword = async () => {
        await axios.post( "server/auth/local/reset", email ).then( res => console.log( res ) )
    }

    const login = () => {
        return (
            <div>
                <Button onClick={ () => setModal( true ) } color="inherit">Login</Button>
                <Modal className="flex justify-center items-center p-4" open={ modal } onClose={ () => setModal( false ) }>
                    <Box className="relative bg-white py-12 px-16 rounded">
                        <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setModal( false ) }>
                            <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
                        </IconButton>
                        <TextField color="primary" name="email" onBlur={ onClickHandler2 } className="w-full my-4" InputProps={ {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={ faEnvelope }></FontAwesomeIcon>
                                </InputAdornment>
                            ),
                        } } label="Email" required type="email" variant="outlined" />
                        <TextField color="primary" name="password" onBlur={ onClickHandler2 } className="w-full" InputProps={ {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={ faLock }></FontAwesomeIcon>
                                </InputAdornment>
                            ),
                        } } label="Password" required type="password" variant="outlined" />
                        <Button variant="contained" onClick={ () => { loginUser() } } className="block w-full mx-auto p-1 my-4"> Login</Button>
                        <div className="w-full flex justify-between my-4">
                            <p onClick={ () => { setModal( false ); setForgotPassword( true ) } } className="cursor-pointer text-sm text-red-800"> Forgot Password </p>
                            <p onClick={ () => { setModal( false ); setCreateModal( true ) } } className="cursor-pointer text-sm text-blue-800"> Create Account </p>
                        </div>
                        <Link href="server/auth/google">
                            <Button color="secondary" variant="contained" className="block w-full mx-auto p-1"> <span> Login with Google </span> </Button>
                        </Link>
                    </Box>
                </Modal>

                <Modal className="flex justify-center items-center p-4" open={ forgotPassword } onClose={ () => setForgotPassword( false ) }>
                    <Box className="relative bg-white py-12 px-16 rounded">
                        <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setForgotPassword( false ) }>
                            <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
                        </IconButton>
                        <p className="text-gray-500"> Enter the email registered with this account to get the password reset link</p>
                        <TextField color="primary" onBlur={ ( e ) => onClickHandlerPassword( e.target.value ) } name="name" className="w-full my-4" InputProps={ {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={ faEnvelope }></FontAwesomeIcon>
                                </InputAdornment>
                            ),
                        } } label="email" required type="email" variant="outlined" />
                        <Button onClick={ () => { resetPassword() } } className="block w-full" variant="contained"> Send Reset Link </Button>
                    </Box>
                </Modal>

                <Modal className="flex justify-center items-center p-4" open={ createModal } onClose={ () => setModal( false ) }>
                    <Box className="relative bg-white py-12 px-16 rounded">
                        <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setCreateModal( false ) }>
                            <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
                        </IconButton>
                        <div className="my-4 flex">
                            <img src={ newUser.profilePicture } className="w-16 h-16 rounded-full" alt="" />
                            <Button className="ml-4 relative cursor-pointer"> Choose Profile Picture
                                <input type="file" onChange={ ( e ) => { uploadProfile( e ) } } className="absolute w-full h-full opacity-0" />
                            </Button>
                        </div>
                        <TextField color="primary" onBlur={ onClickHandler } name="name" className="w-full my-4" InputProps={ {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={ faUser }></FontAwesomeIcon>
                                </InputAdornment>
                            ),
                        } } label="Name" required type="text" variant="outlined" />
                        <TextField color="primary" onBlur={ onClickHandler } name="rollNumber" className="w-full my-4" InputProps={ {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={ faAddressBook }></FontAwesomeIcon>
                                </InputAdornment>
                            ),
                        } } label="Roll Number" required type="text" variant="outlined" />
                        <TextField color="primary" onBlur={ onClickHandler } name="phoneNumber" className="w-full my-4" InputProps={ {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={ faPhone }></FontAwesomeIcon>
                                </InputAdornment>
                            ),
                        } } label="Phone Number" required type="text" variant="outlined" />
                        <TextField color="primary" onBlur={ onClickHandler } name="email" className="w-full" InputProps={ {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={ faEnvelope }></FontAwesomeIcon>
                                </InputAdornment>
                            ),
                        } } label="Email" required type="email" variant="outlined" />
                        <TextField color="primary" className="w-full mt-4" InputProps={ {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={ faLock }></FontAwesomeIcon>
                                </InputAdornment>
                            ),
                        } } label="Password" required type="password" variant="outlined" />
                        <TextField color="primary" onBlur={ onClickHandler } name="password" className="w-full mt-4" InputProps={ {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={ faLock }></FontAwesomeIcon>
                                </InputAdornment>
                            ),
                        } } label="Confirm Password" required type="password" variant="outlined" />
                        <Button onClick={ () => createUser() } variant="contained" className="block w-full mx-auto p-1 my-4"> Create Account</Button>
                    </Box>
                </Modal>
            </div>
        )
    }

    const logout = () => {
        const logoutUser = async () => {
            console.log( currentUser )
            await axios.get( `server/auth/${ stratergy }/logout` ).then( ( res ) => {
                router.reload()
                // console.log(res.data)
            } )
        }
        return (
            <>
                <Button onClick={ () => { logoutUser() } } color="inherit">Logout</Button>
            </>
        )
    }

    return (
        <>
            <Box className="mb-20" sx={ { flexGrow: 1 } }>
                <AppBar>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={ { mr: 2 } }
                            onClick={ () => { setDrawer( true ) } }
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography onClick={() => {router.push("/")}} variant="h6" component="div" sx={ { flexGrow: 1 } }>
                            StepUp Quiz
                        </Typography>
                        { currentUser.name as string === "" ? login() : logout() }
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Drawer anchor="left" open={ drawer } onClose={ () => setDrawer( false ) }>
                    <List sx={ { width: "100%", padding: "1rem" } }>
                        <Link href="/Profile">
                            <ListItem className="flex items-center justify-center" button>
                                <ListItemIcon>
                                    <img className="h-8 rounded-full object-contain" src={ currentUser.profilePicture } alt="" />
                                </ListItemIcon>
                                <ListItemText> My Profile </ListItemText>
                            </ListItem>
                        </Link>
                        <Link href="/Answers">
                            <ListItem className="flex items-center justify-center" button>
                                <ListItemText> Answers </ListItemText>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </Box>
            {/* { () => { return currentUser === "unauthenticated" ? login() : logout() } } */ }
        </>
    )
}