import Link from 'next/link'
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { userService } from '../services/user.service';
import { useCookies } from "react-cookie"

export default function AddBankAccountUser() {
    const router = useRouter()
    const [bankCodeList, setBankCodeList] = useState([])
    const [accBankData, setAccountBankData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        userService.getBankCodeList()
            .then((data) => {
                setBankCodeList(data.data)
            })
            .catch((err) => { console.log(err) })
            .finally(() => { setLoading(false) });
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            acc_name: event.target.acc_name.value,
            acc_id: event.target.acc_id.value,
            bank_code: event.target.bank_code.value
        }

        userService.createBankAcc(data.acc_name, data.acc_id, data.bank_code)
            .then((data) => {
                setAccountBankData(data.data)
                router.push('deposit-auto-page')
            })
            .catch((err) => {
                console.log(err)
                alert('ไม่สามารถทำรายการได้ในขณะนี้')
            })
            .finally(() => { setLoading(false) });
    }

    if (loading) {
        return (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        );
    }

    function ListBankCode() {
        if (!bankCodeList) {
            return (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            );
        } else {

            if (bankCodeList.th) {
                return (
                    <div>
                        <select className="form-select pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg" name="bank_code" required>
                            <option value="">เลือกธนาคาร</option>
                            {
                                bankCodeList.th.map((item) => (
                                    <option key={item.code} value={item.code}>{item.nice_name}</option>
                                ))
                            }
                        </select>
                    </div>
                )
            } else {
                return (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                );
            }

        }
    }

    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center mx-4">

                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-4 text-3xl text-gray-100 text-center font-bold font-similanya"
                    >
                        ลงทะเบียนบัญชีธนาคาร
                    </label>

                    <form onSubmit={handleSubmit} className="mt-10 mx-4">

                        <label
                            htmlFor="text"
                            className="block mt-5 text-lg text-gray-100 text-left"
                        >
                            ธนาคารสำหรับฝากเงิน - ถอนเงิน
                        </label>

                        <ListBankCode />

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-left"
                        >
                            หมายเลขบัญชี
                        </label>

                        <div className='mt-4'>
                            <input
                                type="number"
                                placeholder="หมายเลขบัญชี"
                                name="acc_id"
                                required
                                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg hover:bg-black-100 focus:bg-black-100 focus:ring-0"
                            />
                        </div>

                        <label
                            htmlFor="text"
                            className="block mt-4 text-lg text-gray-200 text-left"
                        >
                            ชื่อบัญชีธนาคาร
                        </label>

                        <div className='mt-4'>
                            <input
                                type="text"
                                placeholder="ชื่อบัญชีธนาคาร"
                                name="acc_name"
                                required
                                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-md shadow-lg hover:bg-black-100 focus:bg-black-100 focus:ring-0"
                            />
                        </div>

                        <div className="mt-7 text-center">
                            <button type='submit' className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-80 h-16">ตรวจสอบข้อมูล</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}