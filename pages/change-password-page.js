import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { useCookies } from "react-cookie"
import { useEffect, useState } from 'react'
import { userService } from '../services/user.service';
import _ from 'lodash'
import Link from 'next/link'

export default function changePasswordPage() {

    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token', 'change_password']);
    const [changePasswordData, setChangePasswordData] = useState([])

    useEffect(() => {
        if (_.isEmpty(cookies)) {
            return router.push('login-page')
        }
    }, [])

    const onClickChangePassword = async (event) => {
        event.preventDefault()

        const chk_pass = event.target.new_password.value
        const chk_confirm_pass = event.target.confirm_password.value
        const acceptedPass = '';

        if (chk_pass == chk_confirm_pass) {
            acceptedPass = chk_pass
        } else {
            return alert('New password does not match')
        }

        const data = {
            old_password: event.target.old_password.value,
            new_password: event.target.new_password.value
        }

        return userService.changePassword(data.old_password, data.new_password)
            .then((res) => {
                setChangePasswordData(res.data)
                setCookie("change_password", JSON.stringify(data.new_password), { path: '/' })
                router.push('/change-password-success');
            }).catch(() => {
                alert("ไม่สามารถทำรายการได้ กรุณาทำรายการอีกครั้ง")
            })

    }

    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-5 pl-5 text-lg text-gray-100 text-left"
                    >
                        <Link href="/user-menu-page">บัญผู้ใช้</Link> {'>'} เปลี่ยนรหัสผ่านใหม่
                    </label>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-3xl text-gray-100 text-center font-bold font-similanya"
                    >
                        เปลี่ยนรหัสผ่านใหม่
                    </label>

                    <form onSubmit={onClickChangePassword} className="mt-10 mx-4">

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-left"
                        >
                            รหัสผ่านเดิม
                        </label>

                        <div className='mt-4'>
                            <input
                                type="password"
                                placeholder="รหัสผ่านที่เคยลงทะเบียนไว้"
                                name="old_password"
                                required
                                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg hover:bg-black-100 focus:bg-black-100 focus:ring-0 wynn-text-box"
                            />
                        </div>

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-left"
                        >
                            รหัสผ่านใหม่
                        </label>

                        <div className='mt-4'>
                            <input
                                type="password"
                                name="new_password"
                                required
                                minLength={6}
                                placeholder="รหัสผ่าน 6 หลักขึ้นไป"
                                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg hover:bg-black-100 focus:bg-black-100 focus:ring-0 wynn-text-box"
                            />
                        </div>

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-left"
                        >
                            ยืนยันรหัสผ่านใหม่
                        </label>

                        <div className='mt-4'>
                            <input
                                type="password"
                                name="confirm_password"
                                required
                                minLength={6}
                                placeholder="ยืนยันรหัสผ่านใหม่"
                                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg hover:bg-black-100 focus:bg-black-100 focus:ring-0 wynn-text-box"
                            />
                        </div>

                        <div className="mt-7 text-center">
                            <button type='submit' className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-80 h-16">ยืนยัน</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}