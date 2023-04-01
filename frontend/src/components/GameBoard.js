import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import correctSound from '../sounds/correct.mp3'
import wrongSound from '../sounds/wrong.mp3'

export const GameBoard = () => {

    const correct = new Audio(correctSound)
    const wrong = new Audio(wrongSound)

    const [data, setData] = useState({
        questions: [],
        answers: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        value: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        teamNames: [],
        scores: [],
        completed: []
    })
    const [score, setScore] = useState(0)
    const [turn, setTurn] = useState(2)
    const [seeQuestion, setSeeQuestion] = useState(false)
    const [visibility, setVisibility] = useState([false, false, false, false, false, false, false, false])
    const [strikeCounter, setStrikeCounter] = useState([0, 0])

    var { id } = useParams()
    var idNum = parseInt(id)

    useEffect(() => {
        const retrieveData = async () => {
            const response = await axios.get('http://localhost:8000/question/:id')
            const result = response.data
            setData(result)
        }
        retrieveData()
    }, [])

    const showQuestion = () => {
        setSeeQuestion(true)
    }

    const switchTurn = (team) => {
        setTurn(team)
    }

    const reveal = (index) => {
        correct.play()
        const updatedVisibility = [...visibility]
        updatedVisibility[index] = true
        setVisibility(updatedVisibility)
        setScore(score + data.value[id][index])
    }

    const strike = (index) => {
        wrong.play()
        const team = [...strikeCounter]
        team[index] = parseInt(strikeCounter[index]) + 1
        setStrikeCounter(team)
    }

    const completeQuestion = () => {
        const completed = data.completed
        completed[id] = true
        setData(completed)
    }

    const awardTeamOne = async () => {
        completeQuestion()
        await axios.post('http://localhost:8000/question/:id/update', {
            points: score,
            winningTeam: 0,
            lockQuestions: data.completed,
        }).then((redirect) => { window.location.replace(`/question/${idNum + 1}`) })
    }

    const awardTeamTwo = async () => {
        completeQuestion()
        await axios.post('http://localhost:8000/question/:id/update', {
            points: score,
            winningTeam: 1,
            lockQuestions: data.completed,
        }).then((redirect) => { window.location.replace(`/question/${idNum + 1}`) })
    }

    const skipQuestion = async () => {
        window.location.replace(`/question/${idNum + 1}`)
    }

    return (
        <>
            <h1 id='question-header'>QUESTION {idNum + 1}</h1>
            {!seeQuestion ? <button className="reveal-question" onClick={() => showQuestion()}>Reveal Question</button> : <h1 className='question'>{data.questions[id]}</h1>}
            <div className='question-page'>
                <div className='answers-board'>
                    <h1>{score}</h1>
                    <label><h4>Points Available To Reward</h4></label>
                    {data.completed[id] ? null
                        :
                        <>
                            <ul className='answers-list'>
                                {!data.answers[id][0] ? <li></li> : !visibility[0] ? <li><button className='answerbtn' onClick={() => reveal(0)}>1</button></li>
                                    : <li className='answer'><h3>{data.answers[id][0].toUpperCase()} ({data.value[id][0]})</h3></li>}
                                {!data.answers[id][1] ? <li></li> : !visibility[1] ? <li><button className='answerbtn' onClick={() => reveal(1)}>2</button></li>
                                    : <li className='answer'><h3>{data.answers[id][1].toUpperCase()} ({data.value[id][1]})</h3></li>}
                                {!data.answers[id][2] ? <li></li> : !visibility[2] ? <li><button className='answerbtn' onClick={() => reveal(2)}>3</button></li>
                                    : <li className='answer'><h3>{data.answers[id][2].toUpperCase()} ({data.value[id][2]})</h3></li>}
                                {!data.answers[id][3] ? <li></li> : !visibility[3] ? <li><button className='answerbtn' onClick={() => reveal(3)}>4</button></li>
                                    : <li className='answer'><h3>{data.answers[id][3].toUpperCase()} ({data.value[id][3]})</h3></li>}
                                {!data.answers[id][4] ? <li></li> : !visibility[4] ? <li><button className='answerbtn' onClick={() => reveal(4)}>5</button></li>
                                    : <li className='answer'><h3>{data.answers[id][4].toUpperCase()} ({data.value[id][4]})</h3></li>}
                                {!data.answers[id][5] ? <li></li> : !visibility[5] ? <li><button className='answerbtn' onClick={() => reveal(5)}>6</button></li>
                                    : <li className='answer'><h3>{data.answers[id][5].toUpperCase()} ({data.value[id][5]})</h3></li>}
                                {!data.answers[id][6] ? <li></li> : !visibility[6] ? <li><button className='answerbtn' onClick={() => reveal(6)}>7</button></li>
                                    : <li className='answer'><h3>{data.answers[id][6].toUpperCase()} ({data.value[id][6]})</h3></li>}
                                {!data.answers[id][7] ? <li></li> : !visibility[7] ? <li><button className='answerbtn' onClick={() => reveal(7)}>8</button></li>
                                    : <li className='answer'><h3>{data.answers[id][7].toUpperCase()} ({data.value[id][7]})</h3></li>}
                            </ul>
                        </>
                    }
                </div>
                <div className='turn-indicator'>
                    {turn === 0 ?
                        <>
                            <h2>Team {data.teamNames[0]}'s Turn</h2>
                            {strikeCounter[1] === 3 ?
                                <>
                                    <h3>CHANCE TO STEAL!</h3>
                                    <button onClick={() => awardTeamOne()}>Award Current Team</button>
                                    <button onClick={() => awardTeamTwo()}>Award Previous Team</button>
                                </>
                                : strikeCounter[0] < 3 ?
                                    <>
                                        <h3>Strikes: {strikeCounter[0]}/3</h3>
                                        <button id='strikebtn' onClick={() => strike(0)}>Strike</button>
                                        <button id='awardbtn' onClick={() => awardTeamOne()}>Award Current Team</button>
                                        <button onClick={() => skipQuestion()}>Skip Round</button>
                                    </>
                                    : switchTurn(1)
                            }
                        </>
                        : turn === 1 ?
                            <>
                                <h2>Team {data.teamNames[1]}'s Turn</h2>
                                {strikeCounter[0] === 3 ?
                                    <>
                                        <h3>CHANCE TO STEAL!</h3>
                                        <button onClick={() => awardTeamTwo()}>Award Current Team</button>
                                        <button onClick={() => awardTeamOne()}>Award Previous Team</button>
                                    </>
                                    : strikeCounter[1] < 3 ?
                                        <>
                                            <h3>Strikes: {strikeCounter[1]}/3</h3>
                                            <button id='strikebtn' onClick={() => strike(1)}>Strike</button>
                                            <button id='awardbtn' onClick={() => awardTeamTwo()}>Award Current Team</button>
                                            <button onClick={() => skipQuestion()}>Skip Round</button>
                                        </>
                                        : switchTurn(0)
                                }
                            </>
                            : turn === 2 ?
                                <>
                                    <h2>FACE OFF</h2><h4>Select the team with highest ranking response.</h4>
                                    <button onClick={() => switchTurn(0)}>{data.teamNames[0]}</button>
                                    <button onClick={() => switchTurn(1)}>{data.teamNames[1]}</button>
                                </>
                                : null}
                    <div className='scoreboard'>
                        <h1 className='scores'>{data.scores[0]}</h1>
                        <h3 className='teamScore'>Team {data.teamNames[0]}</h3>
                        <h1 className='scores'>{data.scores[1]}</h1>
                        <h3 className='teamScore'>Team {data.teamNames[1]}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}