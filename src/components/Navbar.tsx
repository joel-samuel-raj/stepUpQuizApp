import * as React from 'react'
import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Modal, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClose } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Navbar () {
    const [ drawer, setDrawer ] = React.useState( false )
    const [modal, setModal] = React.useState( false )
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
                        <Button onClick={() => setModal(true)} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Drawer anchor="left" open={ drawer } onClose={() => setDrawer(false)}>
                    <List sx={{width : "67vw", padding : "1rem"}}>
                        <Link href="/Profile">
                            <ListItem alignItems="flex-start" button>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                                </ListItemIcon>
                                <ListItemText> My Profile </ListItemText>
                            </ListItem>
                        </Link> 
                    </List>
                </Drawer>
            </Box>
            <Modal className="flex justify-center items-center p-4" open={modal} onClose={() => setModal(false)}>
                <Box className="relative bg-white py-12 px-16 rounded">
                    <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={() => setModal(false)}>
                        <FontAwesomeIcon className="text-white text-lg" icon={faClose}></FontAwesomeIcon>
                    </IconButton>
                    <h3 className="mb-4"> Sign up with google </h3>
                    <Button variant="contained" className="block w-[75%] mx-auto p-4"> Login with Google </Button>
                </Box>
            </Modal>
        </>
    )
}