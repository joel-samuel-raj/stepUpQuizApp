import { faClose, faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Container, TextField, MenuItem } from '@mui/material'
import React, { useReducer } from 'react'
import Mcq from './answers/mcq'

export default function Quiz () {
    const [ , forceUpdate ] = useReducer( x => x + 1, 0 )

    const [ type, setType ] = React.useState( "" )
    const [mcq, setMcq] = React.useState<any>([{}])
    const handleChange = ( event: any ) => {
        setType( event.target.value )
    }

    const mcqData = async ( data: any ) => {
        console.log("hello")
        setMcq( data )
        console.log( mcq )
    }

    console.log(mcq)
    return (
        <>
            <Container className="bg-purple_heart-100 p-4 ">
                <div className="flex justify-between">
                    <h4 className="mb-4"> Question 👇🏼 </h4>
                    <div>
                        <FontAwesomeIcon className="mx-1 text-xl cursor-pointer border-red-500 text-red-500" icon={faClose} />
                        <FontAwesomeIcon className="mx-1 text-xl cursor-pointer border-red-500 text-green-500" icon={faRedo} />
                    </div>
                </div>
                <TextField multiline fullWidth variant="standard" />
                <div className="w-full flex justify-end p-4">
                    <div className="bg-purple-200 rounded">
                        <TextField value={ type } select sx={ { minWidth: 200 } } label="Type of Question" onChange={ handleChange }>
                            <MenuItem value={ "Short Answer" }> Short Answer </MenuItem>
                            <MenuItem value={ "MCQ" }> MCQ </MenuItem>
                            <MenuItem value={ "Upload" }> Upload </MenuItem>
                        </TextField>
                    </div>
                </div>
                <Box className="bg-purple_heart-200">
                    <Mcq mcqData={mcqData}/>
                </Box>
            </Container>
        </>
    )
}
