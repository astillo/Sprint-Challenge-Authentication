import React, { useState, useEffect } from 'react'
import { Card, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axiosWithAuth from '../axiosWithAuth'

const Jokes = props => {
    const [jokes, setJokes] = useState([])
    const token = localStorage.getItem('token')
    useEffect(() => {
        const requestOptions = {
            headers: { accept: 'application/json' },
            authorization: token
        }
        axiosWithAuth.get('http://localhost:3300/api/jokes')
            .then(res => {
                setJokes(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    const logOut = () => {
        localStorage.removeItem('token')
        props.history.push('/login')
    }
    return (<div>{jokes.map(e => {
        return <Card><Card.Header>{e.joke}</Card.Header></Card>
    })}
        <div><Button onClick={logOut}>Logout</Button></div></div>)

}

export default Jokes