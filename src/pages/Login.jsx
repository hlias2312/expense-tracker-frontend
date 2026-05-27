import { useState } from 'react'
import axios from 'axios'

const BASE_URL = 'https://expense-tracker-api-production-7af4.up.railway.app/api'

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const endpoint = isRegister ? '/auth/register/' : '/auth/login/'
      const res = await axios.post(`${BASE_URL}${endpoint}`, { username, password })
      localStorage.setItem('token', res.data.token)
      setIsAuthenticated(true)
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>💰 Expense Tracker</h2>
        <div style={styles.tabs}>
          <button style={{...styles.tab, ...(isRegister ? {} : styles.activeTab)}}
            onClick={() => { setIsRegister(false); setError('') }}>Login</button>
          <button style={{...styles.tab, ...(isRegister ? styles.activeTab : {})}}
            onClick={() => { setIsRegister(true); setError('') }}>Register</button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="text" placeholder="Username"
            value={username} onChange={e => setUsername(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={styles.button} type="submit">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#0f0f17', display: 'flex',
    alignItems: 'center', justifyContent: 'center' },
  card: { background: '#1a1a2e', padding: '2.5rem', borderRadius: '16px',
    width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' },
  title: { color: 'white', textAlign: 'center', marginBottom: '1.5rem' },
  tabs: { display: 'flex', marginBottom: '1.5rem', borderRadius: '8px',
    overflow: 'hidden', border: '1px solid #2a2a3e' },
  tab: { flex: 1, padding: '0.6rem', background: 'transparent', border: 'none',
    color: '#8892a4', cursor: 'pointer', fontSize: '0.9rem' },
  activeTab: { background: '#6C63FF', color: 'white' },
  input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px',
    border: '1px solid #2a2a3e', background: '#16213e', color: 'white',
    fontSize: '1rem', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', borderRadius: '8px', border: 'none',
    background: '#6C63FF', color: 'white', fontSize: '1rem', cursor: 'pointer' },
  error: { color: '#e94560', textAlign: 'center', marginBottom: '1rem' }
}

export default Login