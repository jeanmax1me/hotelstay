import { useContext, useState } from "react";
import { UserContext } from "../src/UserContext";
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from "./PlacesPage"

export default function AccountPage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    function linkClasses (type = null) {
        let classes = '';
        if (type === subpage) {
            classes += 'rounded-full';
        }
        return classes;
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <nav className="accountNavBar">
                <Link className={`accountPageLinks ${linkClasses('profile')}`} to="/account">
                    <div>
                        <span>My profile</span>
                        <span>My profile</span>
                    </div>
                </Link>
                <Link className={`accountPageLinks ${linkClasses('bookings')}`} to="/account/bookings">
                    <div>
                        <span>My bookings</span>
                        <span>My bookings</span>
                    </div>
                </Link>
                <Link className={`accountPageLinks ${linkClasses('places')}`} to="/account/places">
                    <div>
                        <span>My accommodations</span>
                        <span>My accommodations</span>
                    </div>
                </Link>
            </nav>
            {subpage === 'profile' && (
                <div className="loggedInDiv">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="logoutBtn">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
                )}
        </div>
    )
}

