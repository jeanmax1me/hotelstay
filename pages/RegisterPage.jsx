import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const registerUser = async (ev) => {
        ev.preventDefault();

        try {
            const response = await axios.post('/register', {
                name,
                email,
                password,
            });
            console.log('User registration successful:', response.data);
            alert('Registration successful. Now you can log in')

        } catch (error) {
            if (error.response && error.response.data) {
                console.error('An error occurred:', error.response.data.error);
            } else {
                console.error('An error occurred:', error.message);
            }
        }
    }

    return (
        <div style={containerStyle}>
            <div className="font-jakarta">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder="name" autoComplete="name"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input type="email" placeholder="your@email.com" autoComplete="email" className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="password" autoComplete="new-password" className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">Register</button>
                    <div style={registerDiv}>
                        Already a member?
                        <Link style={registerBtn} to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '69vh',
};

const registerDiv = {
    textAlign: 'center',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    color: 'white',
};

const registerBtn = {
    textDecoration: 'underline',
    fontWeight: '600',
    marginLeft: '12px',
};

