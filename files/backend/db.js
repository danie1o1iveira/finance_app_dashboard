import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

const dataDir = path.resolve('backend', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const DB_PATH = path.join(dataDir, 'finance.db');

export async function openDb() {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });
  await ensureSchema(db);
  return db;
}

async function ensureSchema(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT NOT NULL,
      type TEXT NOT NULL,
      category TEXT,
      subcategory TEXT,
      account TEXT,
      merchant TEXT,
      description TEXT,
      tags TEXT
    );
  `);

  const row = await db.get('SELECT COUNT(1) as c FROM transactions;');
  if (row.c === 0) {
    // Seed some sample transactions (mix of AUD and USD)
    const seed = [
      ['2026-01-03', 3000.00, 'AUD', 'income', null, 'Checking', 'Employer', 'January salary', 'salary'],
      ['2026-01-04', -45.20, 'AUD', 'Groceries', 'Supermarket', 'Checking', 'Woolworths', 'Weekly shop', 'groceries'],
      ['2026-01-02', -1200.00, 'AUD', 'Rent', null, 'Checking', 'Landlord', 'January rent', 'housing'],
      ['2026-01-05', -60.00, 'USD', 'Streaming', 'Netflix', 'CreditCard-Visa', 'Netflix', 'Monthly subscription', 'subscriptions'],
      ['2026-01-06', -80.50, 'AUD', 'Fuel', null, 'CreditCard-Visa', 'BP', 'Petrol', 'transport'],
      ['2026-01-08', 150.00, 'USD', 'Freelance', null, 'Checking', 'Upwork', 'Side gig', 'freelance'],
      ['2026-01-10', -200.00, 'AUD', 'UtilitiesElectricity', null, 'Checking', 'EnergyCo', 'Electricity bill', 'utilities'],
      ['2026-01-14', -35.00, 'AUD', 'Phone', null, 'CreditCard-Visa', 'Telco', 'Phone bill', 'utilities'],
      ['2026-01-16', -120.00, 'AUD', 'CarInsurance', null, 'Checking', 'InsureCo', 'Car insurance monthly', 'insurance'],
      ['2026-01-20', -250.00, 'USD', 'Travel', 'Flights', 'Checking', 'Airline', 'Flight to Sydney', 'travel']
    ];

    const insert = 'INSERT INTO transactions (date,amount,currency,type,category,subcategory,account,merchant,description,tags) VALUES (?,?,?,?,?,?,?,?,?,?);';
    for (const r of seed) {
      // type column: determine 'income' or 'expense' if missing
      const type = (r[2] && r[1] > 0) ? 'income' : (r[1] < 0 ? 'expense' : 'adjustment');
      await db.run(insert, [r[0], r[1], r[2], type, r[3] || null, r[4] || null, r[5] || null, r[6] || null, r[7] || null, r[8] || null]);
    }
    console.log('Seeded sample transactions into', DB_PATH);
  }
}