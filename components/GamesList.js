import Link from 'next/link'
import { useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import Navbar from './Navbar'
import _ from 'lodash'
import { useRouter } from 'next/router';


const GamesList = ({ gameData }) => {
    const [gameList, setGameList] = useState([])
    const [loading, setLoading] = useState(false)
    const [gameAccList, setGameAccList] = useState([])
    const router = useRouter()
    useEffect(() => {
        userService.getGameList()
            .then((data) => {
                setGameList(data.data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            });

        userService.getGameAccountList().then(data => setGameAccList(data.data)).catch(err => console.log(err)).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <p>Data is loading...</p>;
    }
    function RenderImage(input) {
        const id = input.data
        if (id == 1) {
            return (
                <div className="rounded bg-origin-content bg-center bg-no-repeat bg-cover min-h-full h-24 drop-shadow-md bg-zinc-900" style={{ backgroundImage: "url('/img/logo/sagaming_logo.jpeg')" }}></div>
            )
        } else if (id == 2) {
            return (
                <div className="rounded bg-origin-content bg-center bg-no-repeat bg-cover min-h-full h-24 drop-shadow-md bg-zinc-900" style={{ backgroundImage: "url('/img/logo/pgslot_logo.jpeg')" }}></div>
            )
        } else {
            return (
                <div className="rounded bg-origin-content bg-center bg-no-repeat bg-cover min-h-full h-24 drop-shadow-md bg-zinc-900" style={{ backgroundImage: "url('/img/logo/prettygaming-logo.png')" }}></div>
            )
        }
    }

    const PlayGameButton = (id) => {
        if (_.isEmpty(gameAccList)) {
            gameRegister(id)
        } else if (gameAccList) {
            gameRegister(id)
        } else {
            alert("error")
        }
    }

    const gameRegister = (id) => {
        userService.createGameAccount(id).then(res => {
            router.reload()
        }).catch((err) => {
            console.log(err)
            alert("ไม่สามารถสมัครได้")
        })
    }

    const Game = (id) => {
        if (_.isEmpty(gameAccList)) {
            return (
                <div className='bg-zinc-900 p-1 rounded hover:bg-black'>
                    <span className='text-center text-gray-300 drop-shadow-xl'>
                        <button onClick={() => { PlayGameButton(id.data) }}>สมัครเกม</button>
                    </span>
                </div>
            )
        } else {
            const isCreated = gameAccList.find(value => value.edges.game.id == id.data)
            if (isCreated) {
                return (
                    <div className='bg-zinc-900 p-1 rounded hover:bg-black hover:scale-125 ease-out duration-300'>
                        <span className='text-center text-gray-300 drop-shadow-xl'>
                            <a href={isCreated.edges.detail[0].mobile_uri} target="_blank">เล่นเกม</a>
                        </span>
                    </div>
                )
            } else {
                return (
                    <div className='bg-zinc-900 p-1 rounded drop-shadow-xl hover:bg-black'>
                        <span className='text-center text-gray-300'>
                            <button onClick={() => { PlayGameButton(id.data) }}>สมัครเกม</button>
                        </span>
                    </div>
                )
            }
        }
    }
    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <Navbar />

            <div className="relative min-h-screen flex flex-col items-center mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <label
                        className="block mt-10 text-xl text-gray-100 text-center font-bold font-similanya"
                    >
                        เกมสล็อต
                    </label>
                </div>

                <div className="grid grid-cols-3">
                    {
                        gameList.map((item) => (
                            <div key={item.id} className="p-3 mt-5 relative w-full">
                                <div className="mt-1 text-center">
                                    <span className='pt-8 text-center text-gray-300'>{item.name}</span>
                                    <div className='pt-4'>
                                        <RenderImage data={item.id} />
                                    </div>
                                    <div className="pt-4">
                                        <Game data={item.id} />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >

    )
}

export default GamesList