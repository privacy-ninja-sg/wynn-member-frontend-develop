import Link from 'next/link'
import { userService } from '../services/user.service'

const ButtonPlayGame = ({ }) => {
    
    const onclickToGame = () => {
        const gamelist = getGame()
    }

    return (
        <button className="origin-top-right right-0 mt-1 shadow-lg " onClick={onclickToGame}>
            <Link href="/play-game">
                <img className=" h-16 w-auto" src="/img/playgame.png" alt="playgame" />
            </Link>
        </button>
    )
}

function getGame() {
    return userService.getGameAccountList()
}

export default ButtonPlayGame