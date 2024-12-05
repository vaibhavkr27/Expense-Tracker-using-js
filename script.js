let transactions = [];

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    
    if (!description || !amount) {
        alert('Please fill all fields');
        return;
    }
    
    const transaction = {
        id: Date.now(),
        description,
        amount: type === 'expense' ? -amount : amount,
        type,
        category
    };
    
    transactions.push(transaction);
    updateBalance();
    renderTransactions();
    clearInputs();
}

function updateBalance() {
    const balance = transactions.reduce((sum, t) => sum + t.amount, 0);
    document.getElementById('balanceDisplay').innerText = `Balance: $${balance.toFixed(2)}`;
}

function renderTransactions() {
    const list = document.getElementById('transactionList');
    list.innerHTML = '';
    
    transactions.forEach(t => {
        const div = document.createElement('div');
        div.classList.add('transaction', t.type);
        div.innerHTML = `
            <span>${t.description} (${t.category})</span>
            <span>$${t.amount.toFixed(2)}</span>
            <button onclick="deleteTransaction(${t.id})">❌</button>
        `;
        list.appendChild(div);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateBalance();
    renderTransactions();
}

function clearInputs() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}