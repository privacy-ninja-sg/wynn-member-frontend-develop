import Link from 'next/link'
import Navbar from '../components/Navbar';
import ButtonGoToLogin from '../components/ButtonGoToLogin';
import { useCookies } from "react-cookie"

export default function RegisterBankSuccess() {

    
    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-4 text-3xl text-gray-100 text-center font-bold font-similanya"
                    >
                        ลงทะเบียนบัญชีธนาคาร สำเร็จ
                    </label>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-lg text-gray-300 text-center"
                    >
                        คุณสามารถใช้บัญชีธนาคารที่ลงทะเบียนในการฝากเงิน และ ถอนเงิน เท่านั้น
                    </label>

                    <div className="mt-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-full bg-center text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    {/* <div className="rounded-md border-1 bg-zinc-800 border-black w-full h-40 mt-2 ">
                        <div className="flex flex-row">
                            <div>
                               
                            </div>
                            <div className="mt-5 pl-3 text-gray-100">
                                <p>ธนาคาร</p>
                                <p>รวยมาก</p>
                                <p>xxxx1234</p>
                            </div>
                        </div>
                    </div> */}

                    <ButtonGoToLogin />

                </div>
            </div>
        </div>
    );
}