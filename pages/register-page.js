import React from "react";
import Link from 'next/link'
import { useRouter } from 'next/router';
import { userService } from '../services/user.service';
import { useEffect, useState } from 'react'
import { useCookies } from "react-cookie"

export default function RegisterPage() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['userRegister', 'token'])
    const [registerOTP, setRegisterOTP] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSubmitOTP = async (event) => {
        event.preventDefault()

        const reqData = {
            tel: event.target.tel.value
        }

        userService.registerOTP(reqData.tel)
            .then((data) => {
                setRegisterOTP(data.data)
                setCookie("requestOTP", JSON.stringify(data.data), { path: '/' })
                setCookie("userRegister", JSON.stringify(reqData.tel), { path: '/' })
                router.push('/register-page-step3');
            })
            .catch((e) => {
                alert('ไม่สามารถทำรายการได้')
            })
            .finally(() => { setLoading(false) });
    }

    function onLogin() {
        return userService.logout()
    }

    if (loading) {
        return <p>Data is loading...</p>;
    }

    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center  mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <div style={{ margin: "10%", textAlign: "center" }}>
                        <img src="/img/new_logo_winclub.png" style={{ margin: "auto", width: "70%" }} />
                    </div>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-3xl text-gray-100 text-center font-bold font-similanya"
                    >
                        สมัครสมาชิก
                    </label>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-lg text-gray-400 text-center font-bold font-similanya"
                    >
                        1/2
                    </label>

                    <form onSubmit={handleSubmitOTP} className="mt-1">
                        <label
                            htmlFor="text"
                            className="block mt-5 mx-8 text-lg text-gray-100 text-left"
                        >
                            หมายเลขโทรศัพท์
                        </label>
                        <div className='mx-8'>
                            <input
                                type="number"
                                placeholder="หมายเลขโทรศัพท์ 10 หลัก"
                                required
                                name="tel"
                            pattern="[0,9]"
                                minLength={10}
                                maxLength={10}
                                className="pl-4 mt-1 block w-full border-none h-11 rounded-md shadow-lg text-white bg-black focus:border-amber-400 focus:text-white focus:bg-black-100"
                            />
                        </div>

                        <div className="mt-7 text-center">
                            <button type='submit' className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-3/5 h-16">ขอรับรหัส OTP</button>
                        </div>

                        <div className="flex mt-7 items-center text-center">
                            <label className="block font-medium text-sm text-gray-400 w-full">
                                หรือ
                            </label>
                        </div>
                        <div className="flex mt-7 items-center text-center">
                            <label className="block font-medium text-sm text-gray-400 w-full">
                                มีบัญชีอยู่แล้ว &#160;
                                <Link href="/">
                                    <label className=" text-gray-100 font-medium text-sm" onClick={onLogin}>
                                        เข้าสู่ระบบ
                                    </label>
                                </Link>
                            </label>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}