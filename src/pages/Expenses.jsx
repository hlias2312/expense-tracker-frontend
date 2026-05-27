import { useState, useEffect } from 'react'
import api from '../api/axios'

function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ title: '', amount: '', category: '', notes: '' })
  const [error, setError] = useState('')
  const [newCategory, setNewCategory] = useState('')

  useEffect(() => {
    fetchExpenses()
    fetchCategories()
  }, [])


  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCategory) return
    await api.post('/categories/', { name: newCategory })
    setNewCategory('')
    fetchCategories()
}

  const fetchExpenses = () => {
    api.get('/expenses/').then(res => setExpenses(res.data))
  }

  const fetchCategories = () => {
    api.get('/categories/').then(res => setCategories(res.data))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/expenses/', form)
      setForm({ title: '', amount: '', category: '', notes: '' })
      setError('')
      fetchExpenses()
    } catch (err) {
      setError('Something went wrong. Check all fields.')
    }
  }

  const handleDelete = async (id) => {
    await api.delete(`/expenses/${id}/`)
    fetchExpenses()
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💸 Expenses</h2>

      <div style={styles.form}>
        <h3 style={styles.subtitle}>Add New</h3>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} placeholder="Title" value={form.title}
            onChange={e => setForm({...form, title: e.target.value})} required />
          <input style={styles.input} placeholder="Amount (€)" type="number" value={form.amount}
            onChange={e => setForm({...form, amount: e.target.value})} required />
          <select style={styles.input} value={form.category}
            onChange={e => setForm({...form, category: e.target.value})}>
            <option value="">No Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <input style={styles.input} placeholder="Notes (optional)" value={form.notes}
            onChange={e => setForm({...form, notes: e.target.value})} />
          <button style={styles.button} type="submit">Add Expense</button>
        </form>
      </div>
      <div style={styles.form}>
    <h3 style={styles.subtitle}>Add Category</h3>
    <form onSubmit={handleAddCategory} style={{display: 'flex', gap: '0.75rem'}}>
        <input style={{...styles.input, marginBottom: 0}} 
            placeholder="Category name" 
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)} />
        <button style={{...styles.button, width: 'auto', padding: '0.75rem 1.5rem'}} 
            type="submit">Add</button>
    </form>
</div>

      <div style={styles.list}>
        {expenses.length === 0 ? (
          <p style={styles.muted}>No expenses yet.</p>
        ) : (
          expenses.map(exp => (
            <div key={exp.id} style={styles.card}>
              <div>
                <p style={styles.expTitle}>{exp.title}</p>
                <p style={styles.expCat}>{exp.category_name || 'No category'}</p>
              </div>
              <div style={styles.right}>
                <p style={styles.expAmount}>€{Number(exp.amount).toFixed(2)}</p>
                <button onClick={() => handleDelete(exp.id)} style={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { background: '#0f0f17', minHeight: '100vh', padding: '2rem', color: 'white' },
  title: { color: 'white', marginBottom: '1.5rem' },
  subtitle: { color: 'white', marginBottom: '1rem' },
  form: { background: '#1a1a2e', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' },
  input: { width: '100%', padding: '0.75rem', marginBottom: '0.75rem', borderRadius: '8px',
    border: '1px solid #2a2a3e', background: '#16213e', color: 'white', fontSize: '1rem',
    boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', borderRadius: '8px', border: 'none',
    background: '#6C63FF', color: 'white', fontSize: '1rem', cursor: 'pointer' },
  error: { color: '#e94560', marginBottom: '1rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  card: { background: '#1a1a2e', borderRadius: '12px', padding: '1.25rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  expTitle: { color: 'white', fontWeight: '600', margin: 0 },
  expCat: { color: '#8892a4', fontSize: '0.85rem', margin: '0.25rem 0 0 0' },
  right: { textAlign: 'right' },
  expAmount: { color: '#4ecca3', fontWeight: '700', fontSize: '1.2rem', margin: 0 },
  deleteBtn: { background: 'transparent', border: '1px solid #e94560', color: '#e94560',
    padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer', marginTop: '0.5rem' },
  muted: { color: '#8892a4' }
}

export default Expenses