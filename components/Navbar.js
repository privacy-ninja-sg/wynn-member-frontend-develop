import Link from 'next/link'

import ButtonPlayGame from './ButtonPlayGame'

export default function Navbar() {


    return (
        <nav className="bg-gradient-to-t from-black to-zinc-900 drop-shadow-md">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1" style={{paddingLeft:"10px"}}>
                        <Link href="/login-page">
                            <img src="/img/new_logo_winclub.png" className='rounded-full' alt="home" style={{ maxHeight: 50 }} />
                        </Link>
                    </div>
                    <ButtonPlayGame />
                </div>
            </div>
        </nav>

    )
}
