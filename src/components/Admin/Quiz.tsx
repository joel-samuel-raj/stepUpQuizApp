import { faClose, faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Container, TextField, MenuItem } from '@mui/material'
import React, { useReducer } from 'react'
import Editor from "rich-markdown-editor"

export default function Quiz () {
    const [ , forceUpdate ] = useReducer( x => x + 1, 0 )

    const [ content, setContent ] = React.useState<[ string ]>( [ "" ] )

    const handleChange = ( event: any ) => {
        setContent( event )
        console.log( content )
    }

    return (
        <>
            <Container className="bg-purple_heart-100 p-4 ">
                <div className="flex justify-between">
                    <h4> Question 👇🏼 </h4>
                    <div>
                        <FontAwesomeIcon className="mx-1 text-xl cursor-pointer border-red-500 text-red-500" icon={ faClose } />
                        <FontAwesomeIcon className="mx-1 text-xl cursor-pointer border-red-500 text-green-500" icon={ faRedo } />
                    </div>
                </div>
                <TextField InputProps={ {
                    className : "text-xl"
                } } multiline fullWidth variant="standard" />
                { content.map( ( data: any, i ) => (
                    <div key={ i } className="mt-4 bg-white py-4 px-8">
                        <Editor defaultValue={ data } onChange={ ( value ) => { handleChange( value() ) } } placeholder="Start Writing Here..."
                        />
                    </div>
                ) ) }
            </Container>
        </>
    )
}
