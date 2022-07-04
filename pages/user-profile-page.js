import Link from 'next/link'
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import { useCookies } from "react-cookie"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash'

export default function UserProfilePage() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    useEffect(() => {
        if (_.isEmpty(cookies)) {
            return router.push('login-page')
        }
    }, [])
    return (

        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center sm:justify-center items-center">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-5 pl-5 text-lg text-gray-100 text-left"
                    >
                        <Link href="/user-menu-page">บัญผู้ใช้</Link> {'>'} บัญชีของฉัน
                    </label>
                    <div className="relative min-h-screen flex flex-col mx-4">
                        <Profile />
                    </div>
                </div>
            </div>
        </div>
    );
}