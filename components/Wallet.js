import { useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import { useCookies } from "react-cookie"
import _ from 'lodash'

const Wallet = () => {

    const [cookies, setCookie] = useCookies();
    const [accountData, setAccount] = useState([])
    const [walletData, setWallet] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        userService.getAccountInfo()
            .then((data) => {
                setAccount(data.data)
            })
            .catch((err) => { console.log(err) })
            .finally(() => { setLoading(false) });
        userService.getWalletInfo().then((data) => { setWallet(data.data.main_wallet) }).catch((err) => { console.log(err) }).finally(() => { setLoading(false) });
    }, [])
    if (loading) {
        return (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        );
    }

    function GetName() {
        if (!accountData) {
            return (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )
        } else {
            if (accountData.edges) {
                if (!accountData.edges.hasOwnProperty('banks')) {
                    return <p>-</p>
                } else {
                    return <p>{accountData.edges.banks[0].bank_account_name}</p>
                }
            }
        }

        return (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        )
    }

    function GetBankInfo() {
        if (!accountData) {
            return (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )
        } else {
            if (accountData.edges) {
                if (!accountData.edges.hasOwnProperty('banks')) {
                    return <p>-</p>
                } else {
                    return (
                        <div>
                            <p>{accountData.edges.banks[0].bank_account_id}</p>
                        </div>
                    )
                }
            }
        }
        return (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        )
    }

    function FormatAmount(val) {
        if (val || val == 0) {
            return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val)
        } else {
            return (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )
        }
    }

    function Render() {
        if (!accountData) {
            return (
                <div>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )
        } else {
            return (
                <div>
                    <p>{accountData.username}</p>
                    <GetName />
                </div>
            )
        }
    }

    return (
        <div className="rounded-md border-1 bg-zinc-800 border-black w-full h-56 mt-4 bg-gradient-to-t from-black to-zinc-900">
            <div className="flex flex-row">
                <div>
                    <img className="mt-4 h-14 pl-4 " src="/img/เมนูผู้ใช้.png" />
                </div>
                <div className="mt-5 pl-3 text-gray-100">

                    <Render />

                </div>
            </div>
            <div className='flex flex-row' >
                <div className="mt-2 text-center">
                    <label
                        htmlFor="text"
                        className="block mt-5 pl-5 text-lg text-gray-100 text-left"
                    >
                        กระเป๋าเงิน - บัญชี <GetBankInfo />
                    </label>
                </div>
            </div>

            <div className='flex flex-row' >
                <div className="mt-2 text-center">
                    <label
                        htmlFor="text"
                        className="block mt-2 pl-5 text-lg text-gray-100 text-left"
                    >
                        {FormatAmount(walletData.available_balance)}
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Wallet