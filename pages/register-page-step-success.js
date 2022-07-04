import { useEffect, useState } from 'react'
import ButtonGoToLogin from '../components/ButtonGoToLogin';
import { useCookies } from "react-cookie"

export default function RegisterPageStep3() {
    const [cookies] = useCookies(['userRegister', 'password'])
    const [userData, setUserData] = useState([])
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

    function GetUser() {

        if (!userData) {
            return (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )
        } else {
            if (userData) {
                return <>
                    <div className="shadow-lg bg-zinc-900 rounded-md mt-8 h-32">
                        <div className='mt-4 pt-5 pl-3'>
                            <label
                                htmlFor="text"
                                className="block mt-1 text-lg text-gray-400 text-left font-bold font-similanya"
                            >
                                ชื่อเข้าระบบ : {cookies.userRegister}
                            </label>
                        </div>
                        <div className='mt-4 pt-1 pl-3'>
                            <label
                                htmlFor="text"
                                className="block mt-1 text-lg text-gray-400 text-left font-bold font-similanya"
                            >
                                รหัสผ่าน : {cookies.password}
                            </label>
                        </div>
                    </div>
                </>
            }
        }
        return (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>)
    }

    function Render() {
        if (!userData) {
            return (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )
        } else {
            return (
                <div>
                    <GetUser />
                </div>
            )
        }
    }

    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <div className="bg-center">
                        <img className="h-64" src="/img/new_logo_winclub.png" />
                    </div>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-3xl text-gray-100 text-center font-bold font-similanya"
                    >
                        สมัครสมาชิก สำเร็จ
                    </label>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-lg text-gray-300 text-center"
                    >
                        คุณสามารถใช้ ชื่อ และ รหัสผ่านใหม่ ด้านล่างที่ตั้งไว้เพื่อเข้าสู่ระบบ
                    </label>

                    <Render />

                    <ButtonGoToLogin />

                </div>
            </div>
        </div>
    );
}