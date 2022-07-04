import Link from 'next/link'

export default function RegisterSuccess() {
    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <div className="bg-center">
                        <img className="h-64" src="/img/new_logo_winclub.png" />
                    </div>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-3xl text-gray-100 text-center font-bold font-similanya"
                    >
                        สมัครสมาชิก สำเร็จ
                    </label>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-lg text-gray-400 text-center font-bold font-similanya"
                    >
                        การสมัครของคุณสำเร็จแล้ว
                    </label>

                    <label
                        htmlFor="text"
                        className="block mt-7 text-lg text-gray-400 text-center"
                    >
                        ขอบคุณสำหรับการสมัคร คุณสามารถใช้
                    </label>

                    <label
                        htmlFor="text"
                        className="block mt-1 text-lg text-gray-400 text-center"
                    >
                        ชื่อเข้าระบบ และรหัสผ่าน ด้านล่างที่ตั้งไว้เพื่อเข้าสู่ระบบ
                    </label>

                    <div className="shadow-lg bg-zinc-700 rounded-md mt-8 h-32">
                        <div className='mt-4 pt-5 pl-3'>
                            <label
                                htmlFor="text"
                                className="block mt-1 text-lg text-gray-400 text-left"
                            >
                                ชื่อเข้าระบบ :
                            </label>
                        </div>
                        <div className='mt-4 pt-1 pl-3'>
                            <label
                                htmlFor="text"
                                className="block mt-1 text-lg text-gray-400 text-left"
                            >
                                รหัสผ่าน :
                            </label>
                        </div>
                    </div>


                    <div className="mt-7">
                        <Link href="/">
                            <button className="bg-[url('/img/home.png')] bg-auto bg-no-repeat bg-center w-full h-32"></button>
                        </Link>
                    </div>


                </div>
            </div>
        </div>
    );
}