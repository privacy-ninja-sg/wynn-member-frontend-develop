import Link from 'next/link'
import Navbar from '../components/Navbar';

export default function ForgatPasswordOTP() {
    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center  mx-4">
                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-4 text-3xl text-gray-100 text-center font-bold font-similanya"
                    >
                        ยืนยันความปลอดภัย
                    </label>

                    <label
                        htmlFor="text"
                        className="block mt-7 text-sm text-gray-400 text-center"
                    >
                        ระบุรหัสผ่านครั้งเดียว (OTP) ที่ Wynnclub888 ส่งข้อความ (SMS) ไปที่เบอร์มือถือ 081-xxx-1234
                    </label>

                    <form method="#" action="#" className="mt-1">
                        <div className='mt-4 mx-4'>
                            <input
                                type="text"
                                placeholder="รหัส OTP 6 หลัก"
                                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg hover:bg-black-100 focus:bg-black-100 focus:ring-0"
                            />
                        </div>

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-center"
                        >
                            ขอรหัสผ่านครั้งเดียวใหม่
                        </label>

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-center"
                        >
                            Ref ABCD
                        </label>

                        <div className="mt-7 text-center">
                            <Link href="/forget-password-reset">
                                <button className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-80 h-16">ยืนยัน</button>
                            </Link>
                        </div>


                    </form>

                </div>
            </div>
        </div>
    );
}