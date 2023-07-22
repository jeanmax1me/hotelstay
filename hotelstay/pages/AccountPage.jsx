import { useContext } from "react";
import { UserContext } from "../src/UserContext";
import { Link, Navigate } from 'react-router-dom';

export default function AccountPage() {
    const { ready, user } = useContext(UserContext);

    if (!ready) {
        return 'Loading... The best engineers of Amazon, Google and Microsoft are on the case';
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }



    return (
        <div>
            <nav>
                <Link className="accountPageLinks" to={'/account'}><div><span>My profile</span><span>My profile</span></div></Link>
                <Link className="accountPageLinks" to={'/account/bookings'}><div><span>My bookings</span><span>My bookings</span></div></Link>
                <Link className="accountPageLinks" to={'/account/places'}><div><span>My accommodations</span><span>My accommodations</span></div></Link>
            </nav>
        </div>
    );
}

