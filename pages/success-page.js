import Link from 'next/link'
import Navbar from '../components/Navbar';

export default function SuccessPage() {
    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-4 text-3xl text-gray-100 text-center font-bold font-similanya"
                    >
                        ทำรายการ สำเร็จ
                    </label>
                    <label
                        htmlFor="text"
                        className="block mt-4 text-lg text-gray-300 text-center"
                    >
                        การทำรายการยืนยันการถอนเงินสำเร็จเรียบร้อย
                    </label>

                    <div className="mt-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-full bg-center text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <div className="mt-10 text-center">
                        <Link href="/">
                            <button className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-72 h-16">กลับหน้าแรก</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}