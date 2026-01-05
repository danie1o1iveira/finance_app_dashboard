import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TransactionsList from './components/TransactionsList';

export default function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Personal Finance — Early Scaffold
      </Typography>
      <TransactionsList />
    </Container>
  );
}