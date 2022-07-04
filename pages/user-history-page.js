import Link from 'next/link'
import Navbar from '../components/Navbar';
import { useCookies } from "react-cookie"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash'
import { userService } from '../services/user.service';
import moment from 'moment'

export default function UserHistoryPage() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies()
    const [isDeposit, setDeposit] = useState(true)
    const [isWithdraw, setWithdraw] = useState(false)
    const [isTransfer, setTransfer] = useState(false)
    const [depositHistory, setDepositHistory] = useState([])
    const [withdrawHistory, setWithdrawHistory] = useState([])
    const [transferHistory, setTransferHistory] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (_.isEmpty(cookies)) {
            return router.push('login-page')
        }
        userService.getDepositHistory().then(res => {
            setDepositHistory(res.data)
        }).catch((err) => {
            console.log(err)
        })
            .finally(() => {
                setLoading(false)
            });

        userService.getWithdrawHistory().then(res => {
            setWithdrawHistory(res.data)
        }).catch((err) => {
            console.log(err)
        })
            .finally(() => {
                setLoading(false)
            });

        userService.getTransferHistory().then(res => {
            setTransferHistory(res.data)
        }).catch((err) => {
            console.log(err)
        })
            .finally(() => {
                setLoading(false)
            });
    }, [])

    const StatusLabel = (status) => {
        const state = status.data
        if (state == "successfully") {
            return <span className="inline-flex p-1 m-1 items-center justify-center font-bold leading-none text-emerald-100 bg-emerald-600 rounded">{state}</span>
        } else if (state == "pending") {
            return <span className="inline-flex p-1 m-1 items-center justify-center font-bold leading-none text-amber-100 bg-amber-600 rounded">{state}</span>
        } else {
            return <span className="inline-flex p-1 m-1 items-center justify-center font-bold leading-none text-red-100 bg-red-600 rounded">{state}</span>
        }
    }

    const DepositHistory = () => {
        if (depositHistory) {
            return depositHistory.map((value) => {
                const { created_at, status, debit } = value
                return (
                    <tr key={value.id}>
                        <td className="border-b-2 border-gray-500 text-white item-center text-left"><div className="m-1">{moment(created_at).format('YYYY-MM-DD')}</div><div className="m-1">{moment(created_at).format('HH:mm:ss')}</div></td>
                        <td className="border-b-2 border-gray-500 text-white item-center text-center"><div className="m-1">{new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(debit)}</div></td>
                        <td className="border-b-2 border-gray-500 text-white item-center text-center"><StatusLabel data={status} /></td>
                    </tr>
                )
            })
        } else {
            <div>Loading</div>
        }
    }

    const WithdrawHistory = () => {
        if (withdrawHistory) {
            return withdrawHistory.map((value) => {
                const { created_at, status, credit } = value
                return (
                    <tr key={value.id}>
                        <td className="border-b-2 border-gray-500 text-white item-center text-left"><div className="m-1">{moment(created_at).format('YYYY-MM-DD')}</div><div className="m-1">{moment(created_at).format('HH:mm:ss')}</div></td>
                        <td className="border-b-2 border-gray-500 text-white item-center text-center"><span className="m-1">{new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(credit)}</span></td>
                        <td className="border-b-2 border-gray-500 text-white item-center text-center"><StatusLabel data={status} /></td>
                    </tr>
                )
            })
        } else {
            <div>Loading</div>
        }
    }

    const TransferHistory = () => {
        if (transferHistory) {
            return transferHistory.map((value) => {
                const { created_at, status } = value
                const amount = ""
                if (value.hasOwnProperty('debit')) {
                    amount = value.debit
                } else {
                    amount = value.credit
                }
                return (
                    <tr key={value.id}>
                        <td className="border-b-2 border-gray-500 text-white item-center text-left"><div className="m-1">{moment(created_at).format('YYYY-MM-DD')}</div><div className="m-1">{moment(created_at).format('HH:mm:ss')}</div></td>
                        <td className="border-b-2 border-gray-500 text-white item-center text-center"><div className="m-1">{new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount)}</div></td>
                        <td className="border-b-2 border-gray-500 text-white item-center text-center"><StatusLabel data={status} /></td>
                    </tr>
                )
            })
        } else {
            <div>Loading</div>
        }
    }

    const FetchData = () => {
        if (isDeposit) {
            return <DepositHistory />
        } else if (isWithdraw) {
            return <WithdrawHistory />
        } else {
            return <TransferHistory />
        }
    }
    return (
        <div className="bg-[url('/img/bg.png')] bg-cover bg-center bg-fixed h-full">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
                <div className="relative sm:max-w-sm w-full">
                    <label
                        htmlFor="text"
                        className="block mt-5 pl-5 text-lg text-gray-100 text-left"
                    >
                        <Link href="/user-menu-page">บัญผู้ใช้</Link> {'>'} ประวัติรายการ
                    </label>
                    <div className="grid grid-cols-3 mt-5 text-white">
                        <div className="text-center text-lg"><span className="" onClick={() => { setDeposit(true); setWithdraw(false); setTransfer(false) }}>{isDeposit ? (<span className="underline decoration-4 decoration-yellow-400">ฝากเงิน</span>) : (<span>ฝากเงิน</span>)}</span></div>
                        <div className="text-center text-lg"><span onClick={() => { setDeposit(false); setWithdraw(false); setTransfer(true) }}>{isTransfer ? (<span className="underline decoration-4 decoration-yellow-400">โอนเงิน</span>) : (<span>โอนเงิน</span>)}</span></div>
                        <div className="text-center text-lg"><span onClick={() => { setDeposit(false); setWithdraw(true); setTransfer(false) }}>{isWithdraw ? (<span className="underline decoration-4 decoration-yellow-400">ถอนเงิน</span>) : (<span>ถอนเงิน</span>)}</span></div>
                    </div>
                    <div className="rounded-md border-1 bg-zinc-800 border-black w-full mt-5 pb-5">
                        <div className="flex flex-col m-2 text-white">
                            <table className="border-b-2 border-gray-500 text-white mt-3">
                                <thead>
                                    <tr className="pl-2">
                                        <th className="border-b-2 border-gray-500 text-white">วัน-เวลา</th>
                                        <th className="border-b-2 border-gray-500 text-white">จำนวนเงิน</th>
                                        <th className="border-b-2 border-gray-500 text-white">สถานะ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <FetchData />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}