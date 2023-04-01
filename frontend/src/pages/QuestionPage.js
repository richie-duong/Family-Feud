import { GameBoard } from '../components/GameBoard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Navbar2 } from '../components/Navbar2'

export const QuestionPage = () => {

    const [data, setData] = useState({ completed: [], completeCount: null })

    const { id } = useParams()
    const qId = parseInt(id)

    useEffect(() => {
        const checkCompleted = async () => {
            const response = await axios.get('http://localhost:8000/question/:id')
            setData(response.data)
        }
        checkCompleted()
    }, [])

    const toNextPage =()=> {
        window.location.replace(`/question/${qId + 1}`)
    }

    return (
        <> 
        <Navbar2 /> 
        {qId === 15 ? window.location.replace('/winner') :
            data.completed[id] && id < data.completed.length ?
                <div className='team_names'>
                    <h1>Question {id} is already completed.</h1>
                    <button onClick={()=> toNextPage()}>Go to Next Question</button>
                </div>
                : <GameBoard />
        }
        </>
    )


}