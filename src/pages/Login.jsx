import { useState } from 'react'
import axios from 'axios'

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', 
            { username, password }
        )
        localStorage.setItem('token', res.data.token)
        setIsAuthenticated(true)
        window.location.href = '/dashboard'
    } catch (err) {
        setError('Invalid username or password')
    }
}

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>💰 Expense Tracker</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button style={styles.button} type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0f0f17',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#1a1a2e',
    padding: '2.5rem',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #2a2a3e',
    background: '#16213e',
    color: 'white',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    background: '#6C63FF',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: '#e94560',
    textAlign: 'center',
    marginBottom: '1rem',
  }
}

export default Login