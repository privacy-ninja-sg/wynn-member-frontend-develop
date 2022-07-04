import Link from 'next/link'
import Navbar from '../components/Navbar';

export default function ResetPassword() {
    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-4 text-3xl text-gray-100 text-center font-bold font-similanya"
                    >
                        ตั้งรหัสผ่านใหม่
                    </label>

                    <form method="#" action="#" className="mt-10 mx-4">

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-left"
                        >
                            รหัสผ่านใหม่
                        </label>

                        <div className='mt-4'>
                            <input
                                type="text"
                                placeholder="รหัสผ่าน 6 หลักขึ้นไป"
                                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg hover:bg-black-100 focus:bg-black-100 focus:ring-0"
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
                                type="text"
                                placeholder="ยืนยันรหัสผ่านใหม่"
                                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg hover:bg-black-100 focus:bg-black-100 focus:ring-0"
                            />
                        </div>

                        <div className="mt-7 text-center">
                            <Link href="/reset-password-success">
                                <button className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-80 h-16">ยืนยัน</button>
                            </Link>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}