import { Link, useLocation } from 'react-router-dom';

export default function AccountNav() {
const {pathname} = useLocation();
let subpage = pathname.split('/')?.[2];
if (subpage === undefined) {
    subpage = 'profile';
}
    function linkClasses(type = null) {    
        let classes = '';
        if (type === subpage) {
            classes += 'rounded-full';
        }
        return classes;
    }

    return (
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
    );
}