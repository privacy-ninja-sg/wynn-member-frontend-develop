import Link from 'next/link'
import { userService } from '../services/user.service';

export default function ButtonGoToLogin() {

    function clearData() {
        return userService.logout()
    }

    return (

        <div className="mt-10 text-center">
            <Link href="/">
                <button className="rounded-md border-1 border-black bg-[url('/img/frame_text.png')] text-gray-100 bg-auto bg-no-repeat bg-center w-72 h-16" onClick={ clearData }>กลับหน้าล็อกอิน</button>
            </Link>
        </div>

    )
}