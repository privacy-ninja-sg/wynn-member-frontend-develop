import { useEffect, useState } from 'react'
import { userService } from '../services/user.service';
import { alertService } from '../services/alert.service';
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router';

export default function RegisterPageStep3() {
    const router = useRouter()
    const [registerOTP, setRegisterOTP] = useState()
    const [cookies, setCookie] = useCookies(['userRegister', 'requestOTP'])
    const [dataChannel, setChannel] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        userService.getChannels()
            .then((data) => {
                setChannel(data.data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            });
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const chk_pass = event.target.password.value
        const chk_confirm_pass = event.target.confirm_password.value
        const acceptedPass = '';

        if (chk_pass == chk_confirm_pass) {
            acceptedPass = chk_pass
        } else {
            return alert('Password does not match')
        }

        const data = {
            tel: cookies.userRegister,
            req_channel: event.target.channel.value,
            username: cookies.userRegister,
            password: acceptedPass,
            bonus: "accepted",
            pin: event.target.pin.value,
            token: cookies.requestOTP.token
        }

        userService.registerCreate(data.tel, data.req_channel, data.username, data.password, data.bonus, data.pin, data.token)
            .then((response) => {
                setCookie("password", JSON.stringify(data.password), { path: '/' })
                router.push('/register-page-step-success');
            })
            .catch((e) => {
                alert('ไม่สามารถทำรายการได้')
            })
    }

    const onClickRefreshOTP = async () => {
        userService.registerOTP(cookies.userRegister)
            .then((data) => {
                setRegisterOTP(data.data)
                setCookie("requestOTP", JSON.stringify(data.data), { path: '/' })
            })
            .catch((e) => {
                alert('ไม่สามารถทำรายการได้')
            })
            .finally(() => { setLoading(false) });
    }

    function Ref() {
        if (!cookies.requestOTP) {
            return (
                <label
                    htmlFor="text"
                    className="block mt-4 text-lg text-gray-200 text-center"
                >
                    Loading...
                </label>
            )
        } else {
            return (
                <label
                    htmlFor="text"
                    className="block mt-4 text-lg text-gray-200 text-center"
                >
                    Ref : {cookies.requestOTP.ref}
                </label>
            )
        }
    }

    if (loading) {
        return <p>Data is loading...</p>;
    }

    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center mx-4">

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
                        2/2
                    </label>

                    <form onSubmit={handleSubmit} className="mt-1 mx-4">

                        <label
                            htmlFor="text"
                            className="block mt-5 text-lg text-gray-100 text-left"
                        >
                            รู้จักเราจากช่องทางใด
                        </label>

                        <div>
                            <select className="form-select pl-4 mt-1 block w-full border-none h-11 rounded-md shadow-lg text-white bg-black focus:border-amber-400 focus:text-white focus:bg-black-100" name="channel" required>
                                <option value="">รู้จักเราจากช่องทางใด</option>
                                {
                                    dataChannel.map((resp) => (
                                        <option key={resp.id} value={resp.id}>{resp.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-left"
                        >
                            LINE ID
                        </label>

                        <div className='mt-4'>
                            <input
                                type="text"
                                placeholder=""
                                className="pl-4 mt-1 block w-full border-none h-11 rounded-md shadow-lg text-white bg-black focus:border-amber-400 focus:text-white focus:bg-black-100"
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
                                name="password"
                                required
                                minLength={6}
                                placeholder="รหัสผ่าน 6 หลักขึ้นไป"
                                className="pl-4 mt-1 block w-full border-none h-11 rounded-md shadow-lg text-white bg-black focus:border-amber-400 focus:text-white focus:bg-black-100"
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
                                className="pl-4 mt-1 block w-full border-none h-11 rounded-md shadow-lg text-white bg-black focus:border-amber-400 focus:text-white focus:bg-black-100"
                            />
                        </div>

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-left"
                        >
                            รหัส OTP
                        </label>

                        <div className='mt-4'>
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

                        <label
                            htmlFor="text"
                            className="block mt-4 text-sm text-gray-400 text-center"
                        >
                            ระบุรหัสผ่านครั้งเดียว (OTP) ที่ Wynnclub888 ส่งข้อความ (SMS) ไปที่เบอร์มือถือ
                        </label>

                        <Ref />

                        <div className='flex flex-row' >
                            <div className="mt-3 text-center">
                                <div className='block mt-5 pl-16 text-lg text-gray-100 text-left'>
                                    <div >
                                        <img className="mt-2 h-4 pl-4 " src="/icon/refresh.svg" onClick={onClickRefreshOTP} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 text-center">
                                <label
                                    htmlFor="text"
                                    className="block mt-5 h-4 pl-4 text-lg text-gray-200 text-center"
                                >
                                    ขอรหัส OTP ใหม่
                                </label>
                            </div>
                        </div>

                        <div className="mt-7 mb-10 text-center">
                            <button type="submit" className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-80 h-16 wynn-text-box">ยืนยัน</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}