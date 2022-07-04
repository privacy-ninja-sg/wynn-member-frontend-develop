import { useCookies, Cookies } from "react-cookie"
import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import BankInfo from './BankInfo'

export default function Profile() {
    const [cookies, setCookie] = useCookies();
    const [accountData, setAccount] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        userService.getAccountInfo()
            .then((data) => {
                setAccount(data.data) 
            })
            .catch((err) => { console.log(err) })
            .finally(() => { setLoading(false) });
    }, [])
    function GetName () {
        if(!accountData){
            console.log("no data")
            wallet =  <div>loading</div>
        } else {
            if(accountData.edges) {
                if(!accountData.edges.hasOwnProperty('banks')){
                    return <p>-</p>
                } else {
                    return <p className="leading-relaxed"><span className="text-neutral-400">ชื่อ-นามสกุล :</span> {accountData.edges.banks[0].bank_account_name}</p>
                }
            }
        }
        return <div>loading</div>
    }

    function GetBankInfo () {
        if(!accountData){
            console.log("no data")
            wallet =  <div>loading</div>
        } else {
            if(accountData.edges) {
                if(!accountData.edges.hasOwnProperty('banks')){
                    return <p>-</p>
                } else {
                    return (
                        <div>
                            <p className="leading-relaxed"><span className="text-neutral-400">เลขที่บัญชี :</span> <span>{accountData.edges.banks[0].bank_account_id}</span></p>
                            {/* <p className="text-sm">{accountData.edges.banks[0].bank_account_id}</p> */}
                            <p className="leading-relaxed"><span className="text-neutral-400">ชื่อบัญชีธนาคาร :</span> <span>{accountData.edges.banks[0].bank_account_name}</span></p>
                        </div>
                        )
                }
            }
        }
        return <div>Loading</div>
    }

    function Render () {
        if (!accountData) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else {
            return (
                <div>
                    <p className="leading-relaxed"><span className="text-neutral-400">รหัสผู้ใช้ :</span> <span> {accountData.username}</span></p>
                    <GetName />
                    <p className="leading-relaxed"><span className="text-neutral-400">เบอร์โทรศัพท์ :</span> <span>{accountData.tel}</span></p>
                </div>
            )
        }
    }
    return (
        <div>
            <div className="rounded-md border-1 bg-zinc-800 border-black w-full mt-5 bg-gradient-to-t from-black to-zinc-900 drop-shadow-xl">
                <div className="flex flex-row">
                    <div className="p-5 text-gray-100">
                        <Render />
                    </div>
                </div>
            </div>
            <div className="mt-5 text-xl text-gray-100">
                <p>บัญชีธนาคาร</p>
            </div>
            
            <div className="rounded-md border-1 bg-zinc-800 border-black w-full mt-3 bg-gradient-to-t from-black to-zinc-900 drop-shadow-xl">
                <div className="flex flex-row">
                    
                    <div className="p-5 text-gray-100">
                        <GetBankInfo />
                    </div>
                </div>
            </div>
        </div>

    )
}