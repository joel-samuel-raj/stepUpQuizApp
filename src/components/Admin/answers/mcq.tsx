import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Checkbox, TextField } from '@mui/material'
import React, { useEffect, useReducer, useState } from 'react'
import { ulid } from 'ulid'

function mcqType () {
    return {
        template: [ {
            id: "",
            value: "",
            answer: false
        } ]
    }
}

class mcqClass {
    id: ""
    value: ""
    answer: false
}
//ReturnType<typeof mcqType>
export default function Mcq ( { mcqData }: any ) {
    const [ , forceUpdate ] = useReducer( x => x + 1, 0 )
    const [ template, setTemplate ] = useState( [ {
        id: ulid() as string,
        value: "",
        answer: false
    } ] )
    const handleCheckChange = ( e: any, i: number ) => {
        if ( typeof window !== "undefined" ) {
            // console.log( e.target.checked )
            let array = template
            array[ i ].answer = !array[ i ].answer
            setTemplate( array )
            // console.log( template[ i ] )
            forceUpdate()
        }
    }

    const handleInputChange = ( e: any, i: number ) => {
        if ( typeof window !== "undefined" ) {
            if ( e.key === "Enter" ) {
                addField()
                forceUpdate()
            }
            let array = template
            array[ i ].value = e.target.value
            setTemplate( array )
            // console.log( template )
            forceUpdate()
        }
    }

    const addField = () => {
        let id = ulid()
        let array = template
        array.push( {
            id,
            value: "",
            answer: false
        } )
        setTemplate( array )
        forceUpdate()
    }

    const removeField = ( i: number ) => {
        if ( template.length === 1 ) return
        let array = template
        array.splice( i, 1 )
        setTemplate( array )
        console.log( template )
        forceUpdate()
    }

    useEffect( () => {
        mcqData( template )
    }, [ template ] )

    return (
        <>
            <ul>
                { template.map( ( item, i ) => (
                    <li key={ i }>
                        { <div className="flex justify-start items-center" id={ ulid() }>
                            <Checkbox className="check" checked={ item.answer } onClick={ ( e ) => { handleCheckChange( e, i ) } } />
                            <TextField variant="standard" type="text" id={ ulid() } className="bg-transparent" placeholder="Type..." onKeyPress={ ( e ) => { handleInputChange( e, i ) } } />
                            <span className="mx-4 grid gap-1 grid-cols-2">
                                { i === template.length - 1 && <FontAwesomeIcon className="text-red-500" onClick={ () => { removeField( i ) } } icon={ faClose } /> }
                                { i === template.length - 1 && <FontAwesomeIcon className="text-blue-500" icon={ faAdd } onClick={ () => { addField() } } /> }
                            </span>
                        </div> }
                    </li>
                ) ) }
            </ul>
        </>
    )
}
