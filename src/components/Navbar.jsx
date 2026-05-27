import { Link } from 'react-router-dom'

function Navbar({ setIsAuthenticated }) {
  const handleLogout = () => {
    setIsAuthenticated(false)
    window.location.href = '/login'
  }

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>💰 Expense Tracker</span>
      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/expenses" style={styles.link}>Expenses</Link>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: '#1a1a2e',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #2a2a3e',
  },
  brand: {
    color: 'white',
    fontWeight: '700',
    fontSize: '1.2rem',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  link: {
    color: '#8892a4',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  button: {
    background: 'transparent',
    border: '1px solid #2a2a3e',
    color: '#8892a4',
    padding: '0.4rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  }
}

export default Navbar