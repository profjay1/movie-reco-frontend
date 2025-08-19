import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function Login() {
  const [creds, setCreds] = useState({ email:'', password:'' });
  const { login } = useContext(AuthContext);
  return (
    <form onSubmit={e => { e.preventDefault(); login(creds); }}>
      <input type="email"  onChange={e=>setCreds({...creds,email:e.target.value})}/>
      <input type="password" onChange={e=>setCreds({...creds,password:e.target.value})}/>
      <button>Login</button>
    </form>
  );
}
