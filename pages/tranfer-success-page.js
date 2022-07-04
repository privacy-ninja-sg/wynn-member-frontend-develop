import SuccessTransfer from '../components/Success-transfer'
import { useCookies } from "react-cookie"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash'

export default function transferSuccessPage() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    useEffect(() => {
        if(_.isEmpty(cookies)) {
            return router.push('login-page')
        }
    })
    return (
        <SuccessTransfer />
    )
}