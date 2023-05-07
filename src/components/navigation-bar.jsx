import Link from "next/link";
import Image from "next/image";

const NavigationBar = () => {
    return (
        <div
            className="fixed bottom-10 m-auto flex h-24 w-11/12 max-w-sm flex-row justify-center rounded-2xl border-2 border-black bg-white py-2 text-center text-white">
            <Link className="w-1/4" href="/catalogue">
                <div className="text-black">
                    <div className="mt-1 flex flex-wrap content-center justify-center">
                        <Image src="/nav-bar-icons/catalogue_mini.png" width={50} height={50} alt="pickup"></Image>
                    </div>    
                    Catalogue
                </div>
            </Link>
            <Link className="w-1/4" href="/reservations">
                <div className="text-black">
                    <div className="mt-1 flex flex-wrap content-center justify-center">
                        <Image src="/nav-bar-icons/reservations_mini.png" width={50} height={50} alt="pickup"></Image>
                    </div>
                    Reservations
                </div>
            </Link>
            <Link className="w-1/4" href="/profile">
                <div className="text-black">
                    <div className="mt-1 flex flex-wrap content-center justify-center">
                        <Image src="/nav-bar-icons/profile_mini.png" width={50} height={50} alt="pickup"></Image>
                    </div>
                    Profile
                </div>
            </Link>
            <Link className="w-1/4" href="/">
                <div className="text-black">
                    <div className="mt-1 flex flex-wrap content-center justify-center">
                        <Image src="/nav-bar-icons/home_icon.png" width={50} height={50} alt="pickup"></Image>
                    </div>
                    Home
                </div>
            </Link>
        </div>
    )
}

export default NavigationBar;