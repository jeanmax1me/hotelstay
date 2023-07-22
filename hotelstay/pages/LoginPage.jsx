import { Link, Navigate } from "react-router-dom"
import { useState, useContext } from "react"
import axios from "axios"
import { UserContext } from "../src/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/login', { email, password });
      setUser(data);
      alert('Login Successful');
      setRedirect(true);
    } catch (e) {
      alert('Login failed: ' + e.message);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div style={containerStyle}>
      <div className="">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)} autoComplete="email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md" />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)} autoComplete="current-password"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md" />
          <button className="primary">Login</button>
          <div style={registerDiv}>
            Don&apos;t have an account yet?
            <Link style={registerBtn} to={'/register'}>Register</Link>
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

