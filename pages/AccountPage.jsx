import { useContext, useState } from "react";
import { UserContext } from "../src/UserContext";
import { Navigate, useParams } from 'react-router-dom';
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



    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            

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

