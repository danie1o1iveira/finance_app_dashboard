import React, { useEffect, useState } from 'react';
import { getTransactions } from '../services/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function TransactionsList() {
  const [transactions, setTransactions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTransactions()
      .then((data) => setTransactions(data))
      .catch((err) => setError(err.message || 'Error fetching'));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!transactions) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Merchant</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.date}</TableCell>
              <TableCell>{t.amount.toFixed(2)}</TableCell>
              <TableCell>{t.currency}</TableCell>
              <TableCell>{t.type}</TableCell>
              <TableCell>{t.category}</TableCell>
              <TableCell>{t.merchant}</TableCell>
              <TableCell>{t.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}