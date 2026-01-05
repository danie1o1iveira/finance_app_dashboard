import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { openDb } from './db.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

let dbPromise = openDb();

app.get('/api/health', async (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/transactions', async (req, res) => {
  const db = await dbPromise;
  const rows = await db.all('SELECT * FROM transactions ORDER BY date DESC, id DESC;');
  res.json(rows);
});

app.post('/api/transactions', async (req, res) => {
  const {
    date, amount, currency = 'AUD', type = 'expense',
    category = null, subcategory = null, account = null,
    merchant = null, description = null, tags = null
  } = req.body;

  if (!date || typeof amount === 'undefined') {
    res.status(400).json({ error: 'date and amount are required' });
    return;
  }

  const db = await dbPromise;
  const result = await db.run(
    `INSERT INTO transactions (date,amount,currency,type,category,subcategory,account,merchant,description,tags)
     VALUES (?,?,?,?,?,?,?,?,?,?);`,
    [date, amount, currency, type, category, subcategory, account, merchant, description, tags]
  );
  const inserted = await db.get('SELECT * FROM transactions WHERE id = ?;', result.lastID);
  res.status(201).json(inserted);
});

app.listen(PORT, () => {
  console.log(`Finance backend listening at http://localhost:${PORT}`);
});