import Link from 'next/link'
import GamesList from '../components/GamesList'
import { BehaviorSubject } from 'rxjs';
const gameAccListData = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('gameAccList')));
const gameAccList = gameAccListData.value
import { useCookies } from "react-cookie"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash'

export default function PlayGame() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    useEffect(() => {
        if(_.isEmpty(cookies)) {
            return router.push('login-page')
        }
    }, [])
    return (
        <GamesList gameData={gameAccList} />
    )
}