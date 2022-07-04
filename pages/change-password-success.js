import Link from 'next/link'
import Navbar from '../components/Navbar';
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import ButtonGoToLogin from '../components/ButtonGoToLogin';
import _ from 'lodash'

export default function changePasswordSuccess() {

    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token', 'username', 'change_password']);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (_.isEmpty(cookies)) {
            return router.push('login-page')
        }
    }, [])

    if (loading) {
        return (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        );
    }

    function GetUserPass() {
        if (!cookies.change_password) {
            return (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )
        } else {
            return (
                <div className="shadow-lg bg-zinc-900 rounded-md mt-8 h-32">
                    <div className='mt-4 pt-5 pl-3'>
                        <label
                            htmlFor="text"
                            className="block mt-1 text-lg text-gray-400 text-left font-bold font-similanya"
                        >
                            ชื่อเข้าระบบ : {cookies.username}
                        </label>
                    </div>
                    <div className='mt-4 pt-1 pl-3'>
                        <label
                            htmlFor="text"
                            className="block mt-1 text-lg text-gray-400 text-left font-bold font-similanya"
                        >
                            รหัสผ่าน : {cookies.change_password}
                        </label>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-4 text-3xl text-gray-100 text-center font-bold font-similanya"
                    >
                        ตั้งค่ารหัสผ่านใหม่ สำเร็จ
                    </label>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-lg text-gray-300 text-center"
                    >
                        คุณสามารถใช้ ชื่อ และ รหัสผ่านใหม่ ด้านล่างที่ตั้งไว้เพื่อเข้าสู่ระบบ
                    </label>

                    <div className="mt-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-full bg-center text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <GetUserPass />

                    <ButtonGoToLogin />

                </div>
            </div>
        </div>
    );
}