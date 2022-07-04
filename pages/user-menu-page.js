import Link from 'next/link'
import Navbar from '../components/Navbar';
import { userService } from '../services/user.service';
import { useCookies } from "react-cookie"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash'

export default function UserMenuPage() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    useEffect(() => {
        if(_.isEmpty(cookies)) {
            return router.push('login-page')
        }
    }, [])

    function logOut() {
        return userService.logout()
    }

    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center h-screen">
            <Navbar />

            <div className="relative flex flex-col sm:justify-center items-center pt-10">

                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-5 mb-5 text-xl text-gray-100 text-center font-bold font-similanya"
                    >
                        เมนูผู้ใช้
                    </label>

                    <button className="flex justify-center w-full hover:scale-90 ease-out duration-300">
                        <Link href="/user-profile-page">
                            <img className="h-16 w-auto" src="/img/my_account.png" alt="playgame" />
                        </Link>
                    </button>

                    <button className="flex justify-center w-full hover:scale-90 ease-out duration-300">
                        <Link href="/user-history-page">
                            <img className="h-16 w-auto" src="/img/history.png" alt="playgame" />
                        </Link>
                    </button>

                    <button className="flex justify-center w-full hover:scale-90 ease-out duration-300" disabled>
                        <Link href="#">
                            <img className="h-16 w-auto" src="/img/setting_bonus.png" alt="playgame" />
                        </Link>
                    </button>

                    <button className="flex justify-center w-full hover:scale-90 ease-out duration-300">
                        <Link href="/change-password-page">
                            <img className="h-16 w-auto" src="/img/change_password.png" alt="playgame" />
                        </Link>
                    </button>

                    {/* <button className="flex justify-center w-full" disabled>
                        <Link href="#" >
                            <img className="h-16 w-auto" src="/img/translation.png" alt="playgame" />
                        </Link>
                    </button> */}

                    <div className="flex justify-center w-full">
                        <Link href="/">
                            <button type="button" className="bg-[url('/img/logout.png')] bg-auto bg-no-repeat bg-center w-full h-32" onClick={ logOut }></button>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}