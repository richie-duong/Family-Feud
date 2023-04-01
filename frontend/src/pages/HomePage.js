import ThemeSong from "../sounds/themesong.mp3"

export const HomePage = () => {

    const audio = new Audio(ThemeSong)

    const startGame = () => {
        window.location.replace('/names')
    }

    const playAudio = () => {
        audio.play()
    }

    return(
        <div className="homepage">
            <img id="logo" src="logo.png" alt="Family Feud Logo" onClick={()=> playAudio()}/>
            <br />
            <button id="play" onClick={()=> startGame()}>PLAY</button>
        </div>
    )
}