import Navbar from '../components/Navbar';
import Wallet from '../components/Wallet'
import { useCookies } from "react-cookie"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash'
import { userService } from '../services/user.service';

export default function UserWithdrawPage() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        if(_.isEmpty(cookies)) {
            return router.push('login-page')
        }
    }, [])
    const withdrawAction = () => {
        if(parseFloat(amount) == 0 || parseFloat(amount) < 300) {
            alert("กรอกจำนวนเงินไม่ถูกต้อง")
        } else {
            userService.withdrawTHB(amount).then(res => {
                router.push('/success-page')
            }).catch(() => {
                alert("ไม่สามารถถอนเงินได้")
            })
        }
    }
    return (

        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center">

            <div className="relative sm:max-w-sm w-full">
            <label
                htmlFor="text"
                className="block mt-5 pl-5 text-lg text-gray-100 text-left"
            >
                หน้าแรก {'>'} ถอนเงินหรือถอนรายได้
            </label>

            <div className="relative min-h-screen flex flex-col mx-4 items-center">
                <Wallet />
                <form method="#" action="#" className="mt-1 mx-4">

                    <label
                        htmlFor="text"
                        className="block mt-5 pl-1 text-lg text-gray-100 text-left"
                    >
                        ระบุจำนวนเงิน
                    </label>

                    <div>
                        <input
                            type="text"
                            placeholder="ขั้นต่ำ 300 บาท"
                            className="wynn-text-box pl-4 mt-1 block w-80 border-none bg-gray-100 h-11 rounded-md shadow-lg hover:bg-black-100 focus:bg-black-100 focus:ring-0"
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value)}}
                        />
                    </div>

                    <label
                        htmlFor="text"
                        className="block mt-1 pl-1 text-sm text-red-500 text-left"
                    >
                        จำนวนเงินถอนขั้นต่ำ 300 บาท
                    </label>

                    <div className="mt-7 text-center">
                        {/* <Link href="/success-page"> */}
                            <button onClick={withdrawAction} className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-3/5 h-16">ยืนยันการถอน</button>
                        {/* </Link> */}
                    </div>

                </form>

            </div>
            </div>
            </div>
        </div>
    );
}