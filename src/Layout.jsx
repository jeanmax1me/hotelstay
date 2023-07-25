import Header from "./Header"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <div className="p-4 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    )
import Header from "./Header"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <div className="p-4 flex flex-col min-h-screen max-w-full mx-auto">
            <Header />
            <Outlet />
        </div>
    )
}