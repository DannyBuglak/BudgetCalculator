import { useEffect, useState } from 'react';
import './App.css';

function App() {
    // Initialize values that will be used.
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);

    // Fetch existing expenses from the server when the component mounts
    useEffect(() => {
        fetch('https://localhost:7248/budget')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => setExpenses(data))
            .catch(error => console.error('There was a problem with the fetch operation', error));
    }, []);

    // Add a new expense and update the state
    const addExpense = () => {
        const expense = { name: expenseName, amount: expenseAmount };

        fetch('https://localhost:7248/budget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                if (text) {
                    const data = JSON.parse(text);
                    setExpenses([...expenses, data]);
                } else {
                    setExpenses([...expenses, expense]);
                }
                setExpenseName('');
                setExpenseAmount(0);
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    // Calculate total expenses and balance
    const totalExpenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    const balance = income - totalExpenses;
    
    return (
        <div className="App">
            <h1>Budget Calculator</h1>
            <div>
                <label>
                    Income:
                    <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <div className="expense-input">
                <h2>Expenses</h2>
                <label>
                    Expense Name:
                    <input
                        type="text"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                    />
                </label>
                <label>
                    Expense Amount:
                    <input
                        type="number"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(parseFloat(e.target.value))}
                    />
                </label>
                <button onClick={addExpense}>Add Expense</button>
                <ul>
                    {expenses.map((expense, index) => {
                        <li key={index}>{expense.name}: ${expense.amount}</li>
                    }) }
                </ul>
            </div>
            <h2>Total Expenses: ${totalExpenses}</h2>
            <h2>Balance: ${balance}</h2>
        </div>
    )
}

export default App;