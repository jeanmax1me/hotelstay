import { Link } from "react-router-dom"

export default function Header() {
    return (
        <>
        <header className="flex flex-row justify-between max-h-20">
            <img className="" src="/public/smallimg.svg" alt="Hotel Stay Logo" />
            <div className="flex max-h-12 gap-2 border border-green-400 rounded-full py-2 px-4 shadow-sm shadow-green-400">
                <div className="text-white">Anywhere</div>
                <div className="border-l border-green-400"></div>
                <div className="text-white">Any week</div>
                <div className="border-l border-green-400"></div>
                <div className="text-white">Add guests</div>
                <button className="bg-primary text-white p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                </button>
            </div>
            <Link to={'/login'} className="flex max-h-12 items-center gap-2 border border-green-400 rounded-full py-2 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <div className="bg-primary text-white rounded-full border border-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>

                </div>
            </Link>
           
        </header>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </>
    )
}