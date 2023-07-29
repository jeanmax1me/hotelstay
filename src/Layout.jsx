
import AccountNav from "./AccountNav"
import Header from "./Header"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <div className="p-4 flex flex-col min-h-screen max-w-full mx-auto">
            <Header />
            <AccountNav />
            <Outlet />
        </div>
    )
}