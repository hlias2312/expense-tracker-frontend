import { useState, useEffect } from 'react'
import api from '../api/axios'

function Dashboard() {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    api.get('/expenses/summary/')
      .then(res => setSummary(res.data))
      .catch(err => {
        console.error(err)
        setSummary({ total: 0, by_category: [] })
      })
}, [])

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Dashboard</h2>

      {summary ? (
        <>
          <div style={styles.totalCard}>
            <p style={styles.totalLabel}>TOTAL SPENT</p>
            <h1 style={styles.totalAmount}>€{Number(summary.total).toFixed(2)}</h1>
          </div>

          <h3 style={styles.subtitle}>By Category</h3>
          <div style={styles.grid}>
            {summary.by_category.map((cat, i) => (
              <div key={i} style={styles.card}>
                <p style={styles.catName}>{cat.category__name || 'Uncategorized'}</p>
                <p style={styles.catAmount}>€{Number(cat.total).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p style={styles.muted}>Loading...</p>
      )}
    </div>
  )
}

const styles = {
  container: {
    background: '#0f0f17',
    minHeight: '100vh',
    padding: '2rem',
    color: 'white',
  },
  title: {
    color: 'white',
    marginBottom: '1.5rem',
  },
  subtitle: {
    color: 'white',
    marginBottom: '1rem',
    marginTop: '2rem',
  },
  totalCard: {
    background: '#1a1a2e',
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  totalLabel: {
    color: '#8892a4',
    fontSize: '0.8rem',
    letterSpacing: '2px',
    marginBottom: '0.5rem',
  },
  totalAmount: {
    color: '#6C63FF',
    fontSize: '3rem',
    fontWeight: '800',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: '#1a1a2e',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  catName: {
    color: '#8892a4',
    fontSize: '0.85rem',
    marginBottom: '0.5rem',
  },
  catAmount: {
    color: '#4ecca3',
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: 0,
  },
  muted: {
    color: '#8892a4',
  }
}

export default Dashboard