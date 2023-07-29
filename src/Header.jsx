
import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext";

export default function Header() {
    const {user} = useContext(UserContext);
    return (
        <>
        <header className="flex flex-row justify-between max-h-20 mainHeader font-arima">
            <Link to={'/'}>
            <img className="" src="/public/logo3.png" alt="Hotel Stay Logo" /> 
            </Link>
            <div className="flex max-h-12 gap-2 border border-weirdblue rounded-full py-2 px-4 shadow-sm shadow-weirdblue">
                <div className="text-white">Anywhere</div>
                <div className="border-l border-weirdblue"></div>
                <div className="text-white">Any week</div>
                <div className="border-l border-weirdblue"></div>
                <div className="text-white">Add guests</div>
                <button className="bg-weirdblue text-white p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                </button>
            </div>
            <Link to={user?'/account':'/login'} className="flex max-h-12 items-center gap-2 border border-weirdblue rounded-full py-2 px-4 shadow-sm shadow-weirdblue">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#66FCF1" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <div className="">
                <svg height="30" width="30" fill="#134743">
  <path d="M 16 0.7 C 7.56 0.7 0.7 7.56 0.7 16 S 7.56 31.3 16 31.3 S 31.3 24.44 31.3 16 S 24.44 0.7 16 0.7 Z m 0 28 c -4.02 0 -7.6 -1.88 -9.93 -4.81 a 12.43 12.43 0 0 1 6.45 -4.4 A 6.5 6.5 0 0 1 9.5 14 a 6.5 6.5 0 0 1 13 0 a 6.51 6.51 0 0 1 -3.02 5.5 a 12.42 12.42 0 0 1 6.45 4.4 A 12.67 12.67 0 0 1 16 28.7 Z" />
</svg>

                </div>
                {!!user && (
                    <div className="ml-1 text-white">
                        {user.name}
                    </div>
                )}
            </Link>
           
        </header>
        <div className="transition-container flex justify-center">
  <div className="transition-line bg-weirdblue"></div>
</div>
        </>
    )
}