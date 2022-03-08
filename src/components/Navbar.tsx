import * as React from 'react'
import { AppBar, Box, Button, Drawer, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, Modal, TextField, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClose, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Navbar () {
    const [ drawer, setDrawer ] = React.useState( false )
    const [ modal, setModal ] = React.useState( false )
    const [ createModal, setCreateModal ] = React.useState( false )
    return (
        <>
            <Box sx={ { flexGrow: 1 } }>
                <AppBar position="fixed">
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
                        <Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
                            StepUp Quiz
                        </Typography>
                        <Button onClick={ () => setModal( true ) } color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Drawer anchor="left" open={ drawer } onClose={ () => setDrawer( false ) }>
                    <List sx={ { width: "67vw", padding: "1rem" } }>
                        <Link href="/Profile">
                            <ListItem alignItems="flex-start" button>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={ faUser }></FontAwesomeIcon>
                                </ListItemIcon>
                                <ListItemText> My Profile </ListItemText>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </Box>
            <Modal className="flex justify-center items-center p-4" open={ modal } onClose={ () => setModal( false ) }>
                <Box className="relative bg-white py-12 px-16 rounded">
                    <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setModal( false ) }>
                        <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
                    </IconButton>
                    <TextField color="primary" className="w-full my-4" InputProps={ {
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={ faEnvelope }></FontAwesomeIcon>
                            </InputAdornment>
                        ),
                    } } label="Email" required type="email" variant="outlined" />
                    <TextField color="primary" className="w-full" InputProps={ {
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={ faLock }></FontAwesomeIcon>
                            </InputAdornment>
                        ),
                    } } label="Password" required type="password" variant="outlined" />
                    <Button variant="contained" className="block w-full mx-auto p-1 my-4"> Login</Button>
                    <div className="w-full flex justify-between my-4">
                        <p className="cursor-pointer text-sm text-red-800"> Forgot Password </p>
                        <p onClick={() => {setModal(false); setCreateModal(true)}} className="cursor-pointer text-sm text-blue-800"> Create Account </p>
                    </div>
                    <Link href="http://localhost:3000/auth/google">
                        <Button color="secondary" variant="contained" className="block w-full mx-auto p-1"> <span> Login with Google </span> </Button>
                    </Link> 
                </Box>
            </Modal>
            <Modal className="flex justify-center items-center p-4" open={ createModal } onClose={ () => setModal( false ) }>
                <Box className="relative bg-white py-12 px-16 rounded">
                    <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setCreateModal( false ) }>
                        <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
                    </IconButton>
                    <TextField color="primary" className="w-full my-4" InputProps={ {
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={ faUser }></FontAwesomeIcon>
                            </InputAdornment>
                        ),
                    } } label="Name" required type="text" variant="outlined" />
                    <TextField color="primary" className="w-full" InputProps={ {
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
                    <Button variant="contained" className="block w-full mx-auto p-1 my-4"> Create Account</Button>
                </Box>
            </Modal>
        </>
    )
}