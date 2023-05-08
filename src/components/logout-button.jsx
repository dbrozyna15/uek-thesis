import Link from 'next/link'
import {logout} from '@/services/firebase';

const LogoutButton = () => {
    return (
        <Link className="flex w-full justify-center" href='/log-in'>
            <button onClick={logout} className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border text-xl
                            font-bold py-2 px-4 rounded-2xl focus:outline-none
                            focus:shadow-outline w-3/5 mx-auto">LOGOUT
            </button>
        </Link>
    )
}

export default LogoutButton;