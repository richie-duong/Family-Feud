import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navbar2 } from '../components/Navbar2'
import ConfettiExplosion from 'react-confetti-explosion'
import WinningTheme from '../sounds/themesong.mp3'

export const WinnerPage = () => {

    const music = new Audio(WinningTheme)
    const [data, setData] = useState({ scores: [], teamNames: [], completeCount: null })

    useEffect(() => {
        const getWinner = async () => {
            const response = await axios.get('http://localhost:8000/winner')
            setData(response.data)
        }
        getWinner();
    }, [])

    const playMusic =()=>{
        music.play()
    }

    return (
        <>
            <Navbar2 />
            <div className='team_names'>
                {data.completeCount >= 15 ?
                    <>
                    {playMusic()}
                    <ConfettiExplosion particleCount={1000} particleSize={15} duration={5000}/>
                        {data.scores[0] > data.scores[1] ? <h1>Team {data.teamNames[0]} WINS!</h1>
                            : data.scores[1] > data.scores[0] ? <h1>Team {data.teamNames[1]} WINS!</h1>
                                : <h1>THERE IS A TIE!</h1>}
                    </>
                    : null}
            </div>
        </>
    )

}