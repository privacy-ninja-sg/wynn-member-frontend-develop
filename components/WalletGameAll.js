import { useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import { useCookies } from "react-cookie"
import _ from 'lodash'
import { useRouter } from 'next/router';

export default function WalletGameAll() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    const [walletGameData, setWalletGame] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (_.isEmpty(cookies)) {
            return router.push('login-page')
        }

        userService.gameRevenueAll()
            .then((data) => {
                setWalletGame(data)
            })
            .catch((err) => { alert('ไม่สามารถทำรายการได้') })
            .finally(() => { setLoading(false) });

    }, [])

    if (loading) {
        return (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        );
    }

    function WalletGame() {
        if (!walletGameData) {
            return (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            );
        } else {
            if (walletGameData.data) {
                return (
                    <>
                        {
                            walletGameData.data.map((res) => (
                                <div key={res.game_id} className="">
                                    <div className="rounded-md border-1 bg-zinc-800 border-black w-full h-auto text-center bg-gradient-to-t from-black to-zinc-900 pt-2 pb-2">
                                        <div className='text-left pl-1'>
                                            <span className='text-gray-400'>กระเป๋าเงิน {res.game_name}</span>
                                        </div>
                                        <div className='text-left pl-3'>
                                            <span className='text-gray-100 '>฿ {res.balance} บาท</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                )
            } else {
                return (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                );
            }
        }
    }

    return (
        <div className="grid grid-cols-2 gap-2 mt-3">
            <WalletGame />
        </div>
    )

}