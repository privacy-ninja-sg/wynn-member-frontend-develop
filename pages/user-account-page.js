import Link from 'next/link'
import Navbar from '../components/Navbar';
import { userService } from '../services/user.service';
import { useRouter } from 'next/router';
import Wallet from '../components/Wallet';
import { useCookies } from "react-cookie"
import { useEffect } from 'react';
import _ from 'lodash'
import WalletGameAll from '../components/WalletGameAll';

export default function UserAccountPage() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    useEffect(() => {
        if (_.isEmpty(cookies)) {
            return router.push('login-page')
        }
    }, [])

    // function onClickRefreshBalance(event) {
    //     event.preventDefault()
    //     return userService.getWalletInfo().then((res) => {
    //         return res
    //     }).catch(alertService.error);
    // }

    function onClickTransferMoney() {
        return userService.getGameList().then((res) => {
            if (res.code == 200) {
                router.push('/transfer-money-page');
            }
        })
    }

    return (
        <div className="bg-[url('/img/bg.png')] bg-cover bg-center pb-10">
            <Navbar />
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center font-similanya">
                <div className="relative sm:max-w-sm w-full">
                    <div className="relative min-h-screen flex flex-col mx-4">
                        <Wallet />
                        <WalletGameAll />

                        <div className="flex mt-7 items-center text-center">
                            <div className='flex-none pl-3 pr-3'>
                                <label className="block font-medium text-sm text-gray-100">
                                    <i className="fa-solid fa-hand-holding-dollar fa-xl"></i> ช่องทางการฝาก
                                </label>
                            </div>
                            <div className='flex-1'>
                                <hr className="border-gray-300 border-1 rounded-md" />
                            </div>
                        </div>

                        <div className="flex flex-row mt-4">
                            <div className="mt-2 pl-4">
                                <Link href="/deposit-auto-page">
                                    <button>
                                        <div className='rounded-full drop-shadow-md text-center bg-gradient-to-t from-zinc-900 to-zinc-800 w-20 h-20 p-5'>
                                            <i className="fa-solid fa-sack-dollar text-white text-3xl"></i>
                                        </div>
                                        <span className="text-gray-100">ฝากเงินออโต้</span>
                                    </button>
                                </Link>
                            </div>

                            <div className="mt-2 pl-4">
                                <Link href="#">
                                    <button onClick={onClickTransferMoney}>
                                        <div className='rounded-full drop-shadow-md text-center bg-gradient-to-t from-zinc-900 to-zinc-800 w-20 h-20 p-5'>
                                            <i className="fa-solid fa-money-bill-transfer text-white text-3xl"></i>
                                        </div>
                                        <span className="text-gray-100 pl-2">โอนเงิน</span>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6 bg-gradient-to-t from-black to-zinc-900 p-5 rounded ">
                            <Link href={"/play-game"}>
                                <img className="" src="/img/prettygaming-logo.png" />
                            </Link>
                        </div>

                        <div className="flex items-center text-center mt-8">
                            <div className='flex-none pl-3 pr-3'>
                                <label className="block font-medium text-sm text-gray-100">
                                    <i className="fa-solid fa-rectangle-list fa-xl"></i> เมนู
                                </label>
                            </div>
                            <div className='flex-1'>
                                <hr className="border-gray-300 border-1 rounded-md" />
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex-none p-3">
                                <Link href="/user-withdraw-page">
                                    <button>
                                        <div className='rounded-full drop-shadow-md text-center bg-gradient-to-t from-zinc-900 to-zinc-700 w-20 h-20 p-5'>
                                            <i className="fa-solid fa-dollar-sign text-white text-3xl"></i>
                                        </div>
                                        <span className="text-gray-100">ถอนเงิน</span>
                                    </button>                                   
                                </Link>
                            </div>
                            <div className="flex-none p-3">
                                <Link href="#">
                                    <button>
                                        <div className='rounded-full drop-shadow-md text-center bg-gradient-to-t from-zinc-900 to-zinc-700 w-20 h-20 p-5'>
                                            <i className="fa-solid fa-gem text-white text-3xl"></i>
                                        </div>
                                        <span className="text-gray-100">โปรโมชั่น</span>
                                    </button>
                                </Link>
                            </div>
                            <div className="flex-none p-3">
                                <Link href="/user-menu-page">
                                    <button>
                                        <div className='rounded-full drop-shadow-md text-center bg-gradient-to-t from-zinc-900 to-zinc-700 w-20 h-20 p-5'>
                                            <i className="fa-solid fa-user-gear text-white text-3xl"></i>
                                        </div>
                                        <span className="text-gray-100">เมนูผู้ใช้</span>
                                    </button>
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );

}