import {Link} from "react-router-dom"

export default function LoginPage() {
    return (
      <div style={containerStyle}>
    <div className="">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form className="max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" autoComplete="email" className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md" />
            <input type="password" placeholder="password" autoComplete="current-password" className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md" />
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
  
  