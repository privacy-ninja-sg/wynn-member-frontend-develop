import Navbar from '../components/Navbar';
import BankInfo from '../components/BankInfo'
import { useEffect, useState } from 'react';
import { userService } from '../services/user.service';
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router';
import _ from 'lodash'
import Link from 'next/link'

export default function DepositAutoPage() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    const [bankList, setBankList] = useState([])
    const [loading, setLoading] = useState(false)
    const [account, setAccount] = useState([])

    useEffect(() => {
        if (_.isEmpty(cookies)) {
            return router.push('login-page')
        }
        userService.getAccountInfo()
            .then((data) => {
                setAccount(data.data)
            })
            .catch((err) => { console.log(err) })
            .finally(() => { setLoading(false) });
        userService.getBankList().then((data) => {
            setBankList(data.data)
        }).catch(err => console.log(err)).finally(() => { setLoading(false) })
    }, [])
    if (account.edges && account) {
        if (!account.edges.hasOwnProperty('banks')) {
            router.push('register-bank-account-user')
        }
    }
    if (loading) {
        return (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        );
    }
    return (
        <div className="  bg-[url('/img/bg.png')] bg-cover bg-center ">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center">

                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-5 pl-5 text-lg text-gray-100 text-left"
                    >
                        <Link href="/user-account-page">หน้าแรก</Link> {'>'} ฝากเงินออโต้
                    </label>

                    <div className="relative min-h-screen flex flex-col mx-4">

                        <label
                            htmlFor="text"
                            className="block mt-5 pl-5 text-lg text-gray-400 text-center"
                        >
                            ใช้บัญชีเดียวกับที่ท่านลงทะเบียนไว้ในครั้งแรกเท่านั้น
                        </label>

                        <label htmlFor="text" className="block mt-5 text-lg text-gray-100 text-left">
                            บัญชีรับโอน
                        </label>
                        {
                            bankList.map((item) => {
                                return (<BankInfo key={item.id} data={item} />)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}