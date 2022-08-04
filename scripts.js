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
    amount: -50000,
    date: '23/01/2020'
  },
  {
    id: 2,
    description: 'Website',
    amount: 500000,
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

  },
  expenses() {

  },
  total() {

  }
}

const Utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? "-" : "";
    
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
      <td class="${CSSclass}">${transaction.amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img src="./assets/minus.svg" alt ="Remover Transacao"></td>
    `;
    return html;
  },
}


transactions.forEach(function(transaction){
  DOM.addTransaction(transaction)
})