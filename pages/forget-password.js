import Link from 'next/link'
import Navbar from '../components/Navbar';

export default function Forgatpassword() {
    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-1 text-2xl text-gray-100 text-center font-bold font-similanya"
                    >
                        การตรวจสอบความปลอดภัย
                    </label>

                    <form method="#" action="#" className="mt-1">
                        <label
                            htmlFor="text"
                            className="block mt-10 text-lg text-gray-100 text-left font-bold font-similanya"
                        >
                            ป้อนหมายเลขโทรศัพท์ของคุณ
                        </label>
                        <div className='mt-4'>
                            <input
                                type="text"
                                placeholder=""
                                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg hover:bg-black-100 focus:bg-black-100 focus:ring-0 wynn-text-box"
                            />
                        </div>

                        <div className="mt-7 text-center">
                            <Link href="/forget-password-otp">
                                <button className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-3/5 h-16">รับรหัส OTP</button>
                            </Link>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}