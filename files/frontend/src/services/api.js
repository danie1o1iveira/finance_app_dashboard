const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function getTransactions() {
  const res = await fetch(`${API_BASE}/transactions`);
  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return res.json();
}