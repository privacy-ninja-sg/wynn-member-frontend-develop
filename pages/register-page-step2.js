import Link from 'next/link'
import { useRouter } from 'next/router';
import { userService } from '../services/user.service';
import { alertService } from '../services/alert.service';
import { useCookies } from "react-cookie"
import { useEffect, useState } from 'react'

export default function RegisterPageStep2() {
    const router = useRouter()
    const [registerOTP, setRegisterOTP] = useState()
    const [cookies, setCookie] = useCookies(['userRegister', 'requestOTP'])
    const [loading, setLoading] = useState(false)

    const handleVerifyOTP = async (event) => {
        event.preventDefault()

        const data = {
            token: cookies.requestOTP.token,
            pin: event.target.pin.value
        }

        userService.verifyOTP(data.token, data.pin).then((res) => {
            if (res.data) {
                setCookie("pin", JSON.stringify(data.pin), { path: '/' })
                router.push('/register-page-step3');
            }
        }).catch((e) => {
            alert('ไม่สามารถทำรายการได้')
        })
    }

    const onClickRefreshOTP = async () => {
        userService.registerOTP(cookies.userRegister)
            .then((data) => {
                setRegisterOTP(data.data)
                setCookie("requestOTP", JSON.stringify(data.data), { path: '/' })
                router.push('/register-page-step2');
            })
            .catch((e) => {
                alert('ไม่สามารถทำรายการได้')
            })
            .finally(() => { setLoading(false) });
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
                        ยืนยันการสมัครสมาชิก
                    </label>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-lg text-gray-400 text-center font-bold font-similanya"
                    >
                        2/3
                    </label>

                    <label
                        htmlFor="text"
                        className="block mt-4 text-sm text-gray-400 text-center"
                    >
                        ระบุรหัสผ่านครั้งเดียว (OTP) ที่ Wynnclub888 ส่งข้อความ (SMS) ไปที่เบอร์มือถือ
                    </label>

                    <form onSubmit={handleVerifyOTP} className="mt-1">
                        <div className='mt-4 mx-4'>
                            <input
                                type="number"
                                name='pin'
                                pattern="[0,9]"
                                minLength={6}
                                maxLength={6}
                                required
                                placeholder="รหัส OTP 6 หลัก"
                                className="pl-4 mt-1 block w-full border-none h-11 rounded-md shadow-lg text-white bg-black focus:border-amber-400 focus:text-white focus:bg-black-100"
                            />
                        </div>

                        <div className='flex flex-row' >
                            <div className="mt-3 text-center">
                                <div className='block mt-5 pl-16 text-lg text-gray-100 text-left'>
                                    <div >
                                        <img className="mt-2 h-4 pl-2 " src="/icon/refresh.svg" onClick={onClickRefreshOTP} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 text-center">
                                <label
                                    htmlFor="text"
                                    className="block mt-5 h-4 pl-4 text-lg text-gray-200 text-center"
                                >
                                    ขอรหัสผ่านครั้งเดียวใหม่
                                </label>
                            </div>
                        </div>

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-center"
                        >
                            {/* Ref : {cookies.requestOTP.ref} */}
                        </label>

                        <div className="mt-7 text-center">
                            <button type='submit' className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-80 h-16">ยืนยัน</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}