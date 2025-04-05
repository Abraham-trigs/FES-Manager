import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Firebase setup
import { doc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import app from './firebaseconfig';

console.log("firebase connected, app.name")

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');

  const userId = 'userId123'; // Get this dynamically from Firebase Auth

  // Fetch wallet balance and transaction history
  useEffect(() => {
    const fetchWalletData = async () => {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setBalance(userData.balance);
        setTransactionHistory(userData.transactionHistory || []);
      } else {
        console.log("User data doesn't exist");
      }
    };
    
    fetchWalletData();
  }, []);

  // Handle payment (withdrawal)
  const handlePayment = async () => {
    if (amount <= 0 || isNaN(amount)) {
      setError('Invalid amount');
      return;
    }

    if (amount > balance) {
      setError('Insufficient funds');
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      
      // Update balance
      await updateDoc(userRef, {
        balance: increment(-amount),
        transactionHistory: arrayUnion({
          type: 'withdrawal',
          amount,
          timestamp: new Date(),
          description: 'Payment for Project X',
        }),
      });

      // Update frontend state
      setBalance(prevBalance => prevBalance - amount);
      setTransactionHistory(prevHistory => [
        ...prevHistory,
        { type: 'withdrawal', amount, timestamp: new Date(), description: 'Payment for Project X' },
      ]);
      setAmount(0); // Reset amount input

    } catch (error) {
      setError('Payment failed. Please try again.');
    }
  };

  // Handle deposit
  const handleDeposit = async () => {
    if (amount <= 0 || isNaN(amount)) {
      setError('Invalid amount');
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      
      // Update balance
      await updateDoc(userRef, {
        balance: increment(amount),
        transactionHistory: arrayUnion({
          type: 'deposit',
          amount,
          timestamp: new Date(),
          description: 'Deposit from user',
        }),
      });

      // Update frontend state
      setBalance(prevBalance => prevBalance + amount);
      setTransactionHistory(prevHistory => [
        ...prevHistory,
        { type: 'deposit', amount, timestamp: new Date(), description: 'Deposit from user' },
      ]);
      setAmount(0); // Reset amount input

    } catch (error) {
      setError('Deposit failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>FES Wallet</h2>
      <p>Balance: {balance} FES</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder="Enter amount"
      />
      <button onClick={handlePayment}>Make Payment</button>
      <button onClick={handleDeposit}>Deposit Funds</button>

      {error && <p>{error}</p>}

      <h3>Transaction History</h3>
      <ul>
        {transactionHistory.map((transaction, index) => (
          <li key={index}>
            {transaction.type}: {transaction.amount} FES - {transaction.description} ({new Date(transaction.timestamp).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wallet;
