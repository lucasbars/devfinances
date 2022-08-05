const Modal = {
  open() {
    document.querySelector('.modal-overlay').classList.add('active');
  },
  close() {
    document.querySelector('.modal-overlay').classList.remove('active');
  }
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50001,
    date: '23/01/2020'
  },
  {
    id: 2,
    description: 'Website',
    amount: 500020,
    date: '23/01/2020'
  },
  {
    id: 3,
    description: 'internet',
    amount: -20000,
    date: '23/01/2020'
  },
];

const Transaction = {
  incomes() {
    let income = 0;
    transactions.forEach((transaction)=>{
      if(transaction.amount > 0 ){
        income += transaction.amount;
      }
    });
    return income;
  },
  expenses() {
    let expense = 0;
    transactions.forEach((transaction)=>{
      if(transaction.amount < 0 ){
        expense += transaction.amount;
      }
    });
    return expense;
  },
  total() {
    return Transaction.incomes() + Transaction.expenses();
  }
}

const Utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? "-" : "";
    value = String(value).replace(/\D/g,"");
    value =Number(value) / 100;
    value = value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})
    return signal + value;
    
  }
}

const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index){
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img src="./assets/minus.svg" alt ="Remover Transacao"></td>
    `;
    return html;
  },

  upadateBalance(){
    document.getElementById('incomeDisplay').innerHTML=Utils.formatCurrency(Transaction.incomes());
    document.getElementById('expenseDisplay').innerHTML=Utils.formatCurrency(Transaction.expenses());
    document.getElementById('totalDisplay').innerHTML=Utils.formatCurrency(Transaction.total());

  },
}

transactions.forEach(function(transaction){
  DOM.addTransaction(transaction)
});

DOM.upadateBalance();