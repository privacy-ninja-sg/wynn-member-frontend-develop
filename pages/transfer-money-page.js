import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { userService } from '../services/user.service';
import { useEffect, useState } from 'react'
import { useCookies } from "react-cookie"
import _ from 'lodash'
import Link from 'next/link'

function transferMoneyPage({ }) {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    const [gameList, setGameList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (_.isEmpty(cookies)) {
            return router.push('login-page')
        }
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
    }, [])

    if (loading) {
        return (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const selectTranferFrom = event.target.game_id_from.value
        const selectTranferTo = event.target.game_id_destination.value

        const data = {
            game_id: (selectTranferFrom != 0 ? selectTranferFrom : selectTranferTo),
            amount: event.target.amount.value
        }

        if (selectTranferFrom == selectTranferTo) {
            alert('ไม่สามารถทำรายการได้เนื่องจาก "บัญชีต้นทาง" กับ "บัญชีปลายทาง" เหมือนกัน !')
        } else if (selectTranferFrom == 0 && selectTranferTo != 0) {

            if (parseFloat(data.amount) == 0 || parseFloat(data.amount) < 100) {
                alert("ท่านกรอกจำนวนเงินขั้นต่ำไม่ถูกต้อง")
            } else {
                return userService.walletGameDeposit(data.game_id, data.amount)
                    .then((response) => {
                        if (response.code == 200) {
                            router.push('/tranfer-success-page');
                        }
                    }).catch((err) => {
                        alert('ไม่สามารถโอนเงินได้ขณะนี้')
                    })
            }

        } else if (selectTranferFrom != 0 && selectTranferTo == 0) {
            if (parseFloat(data.amount) == 0 || parseFloat(data.amount) < 100) {
                alert("ท่านกรอกจำนวนเงินขั้นต่ำไม่ถูกต้อง")
            } else {
                return userService.walletGameWithdraw(data.game_id, data.amount)
                    .then((response) => {
                        if (response.code == 200) {
                            router.push('/tranfer-success-page');
                        }
                    }).catch((err) => {
                        alert('ไม่สามารถโอนเงินได้ขณะนี้')
                    })
            }
        } else {
            alert('ไม่สามารถทำรายการโอนระหว่าง "บัญชีเกมด้วยกันได้ในขณะนี้" !')
        }

    }

    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center h-screen">
            <Navbar />
            <div className="relative flex flex-col sm:justify-center items-center mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-5 pl-5 text-lg text-gray-100 text-left"
                    >
                        <Link href="/user-account-page">หน้าแรก</Link> {'>'} โอนเงิน
                    </label>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-3xl text-gray-100 text-center font-bold font-similanya"
                    >
                        โอนเงิน
                    </label>

                    <form onSubmit={handleSubmit} className="mt-10 mx-4">

                        <label
                            htmlFor="text"
                            className="block mt-5 text-lg text-gray-100 text-left"
                        >
                            จาก
                        </label>

                        <div>
                            <select className="form-select pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg wynn-text-box" name="game_id_from" required>
                                <option value="0">บัญชีหลัก</option>
                                {
                                    gameList.map((resp) => (
                                        <option key={resp.id} value={resp.id}>{resp.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <label
                            htmlFor="text"
                            className="block mt-5 text-lg text-gray-100 text-left"
                        >
                            ถึง
                        </label>

                        <div>
                            <select className="form-select pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg wynn-text-box" name="game_id_destination" required>
                                <option value="">กรุณาเลือก</option>
                                <option value="0">บัญชีหลัก</option>
                                {
                                    gameList.map((resp) => (
                                        <option key={resp.id} value={resp.id}>{resp.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-left"
                        >
                            จำนวนเงิน
                        </label>

                        <div className='mt-4'>
                            <input
                                type="number"
                                placeholder="ขั้นต่ำ 100 บาท"
                                name="amount"
                                required
                                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg hover:bg-black-100 focus:bg-black-100 focus:ring-0 wynn-text-box"
                            />
                        </div>

                        <label
                            htmlFor="text"
                            className="block mt-1 pl-1 text-sm text-red-500 text-left"
                        >
                            จำนวนเงินโอนขั้นต่ำ 100 บาท
                        </label>

                        <div className="mt-7 text-center">
                            <button type='submit' className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-80 h-16">ยืนยันการโอนเงิน</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default transferMoneyPage