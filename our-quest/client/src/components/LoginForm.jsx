import React, { useState, useEffect } from 'react'
import useUserStore from '../hooks/UserStore'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, [user, navigate])


  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch('/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        navigate('/')
      } else {
        console.log('Login failed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (user) {
    return null
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          value={username}
          onChange={event => setUsername(event.target.value)} 
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;