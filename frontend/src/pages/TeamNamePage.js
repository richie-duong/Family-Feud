import { useState } from 'react'
import axios from 'axios'
import { Navbar2 } from '../components/Navbar2'

export const TeamNamePage = () => {

    const [teamOne, setTeamOne] = useState('')
    const [teamTwo, setTeamTwo] = useState('')


    const submitNames = async () => {
        await axios.post('http://localhost:8000/names/submit', {
            firstTeam: teamOne,
            secondTeam: teamTwo
        }).then((redirect)=> window.location.replace('/question/0'))
    }

    const resetNames =()=>{
        setTeamOne('')
        setTeamTwo('')
    }

    return (
        <>
            <Navbar2 />
            <div className='team_names'>
                <h1>Set Your Team Names</h1>
                <br/>
                <input name="team1" type="text" placeholder='Team A' onChange={e => setTeamOne(e.target.value)} value={teamOne}/>
                <br/>
                <br/>
                <input name="team2" type="text" placeholder='Team B' onChange={e => setTeamTwo(e.target.value)} value={teamTwo}/>
                <br/>
                <button onClick={()=> submitNames()}>Start Game</button><button onClick={()=>resetNames()}>Reset</button>
            </div>
            
        </>
    )
}