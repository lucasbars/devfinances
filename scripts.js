const Modal = {
  open() {
    document.querySelector('.modal-overlay').classList.add('active');
  },
  close() {
    document.querySelector('.modal-overlay').classList.remove('active');
  }
}

// const transactions = [
//   {
//     description: 'Luz',
//     amount: -50001,
//     date: '23/01/2020'
//   },
//   {
//     description: 'Website',
//     amount: 500020,
//     date: '23/01/2020'
//   },
//   {
//     description: 'internet',
//     amount: -20000,
//     date: '23/01/2020'
//   },
// ];

const Transaction = {
  all: [
    {
      description: 'Luz',
      amount: -50001,
      date: '23/01/2020'
    },
    {
      description: 'Website',
      amount: 500020,
      date: '23/01/2020'
    },
    {
      description: 'internet',
      amount: -20000,
      date: '23/01/2020'
    },
  ],
  add(transaction){
    Transaction.all.push(transaction);
    App.reload();
  },
  remove(index){
    Transaction.all.splice(index,1);
    App.reload();
  },
  incomes() {
    let income = 0;
    Transaction.all.forEach((transaction)=>{
      if(transaction.amount > 0 ){
        income += transaction.amount;
      }
    });
    return income;
  },
  expenses() {
    let expense = 0;
    Transaction.all.forEach((transaction)=>{
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
  formatAmount(value){
    value = Number(value.replace(/\,\./g,"")) * 100;
    // value = Number(value) * 100;
    // console.log(value);
    return value;

  },

  formatDate(date){
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    // console.log(date);

  },

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
    tr.innerHTML = DOM.innerHTMLTransaction(transaction,index);
    tr.dataset.index = index;

    DOM.transactionContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction,index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt ="Remover Transacao"></td>
    `;
    return html;
  },

  upadateBalance(){
    document.getElementById('incomeDisplay').innerHTML=Utils.formatCurrency(Transaction.incomes());
    document.getElementById('expenseDisplay').innerHTML=Utils.formatCurrency(Transaction.expenses());
    document.getElementById('totalDisplay').innerHTML=Utils.formatCurrency(Transaction.total());

  },

  clearTransactions(){
    DOM.transactionContainer.innerHTML="";
  }
}

const App = {
  init(){
    
    Transaction.all.forEach((transaction,index) => {
      DOM.addTransaction(transaction, index);
    });
    
    DOM.upadateBalance();

  },
  reload(){
    DOM.clearTransactions();
    App.init();
  },
}

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValue(){
    return{
      description: Form.description.value,
      amount : Form.amount.value,
      date: Form.date.value,
    }
  },

  validateFields(){
   const {description, amount, date} = Form.getValue();
   
   if(description.trim() === "" || amount.trim() =="" || date.trim()=== "") {
    throw new Error("Por favor, preencha todos os campos");
   }
  },

  formatValues(){
    let {description, amount, date} = Form.getValue();

    amount = Utils.formatAmount(amount);

    date= Utils.formatDate(date);
    
    return {
      description,
      amount,
      date
    }
  },

  clearFields(){
    Form.description.value ="";
    Form.amount.value ="";
    Form.date.value ="";
  },

  // saveTransaction(transaction){
  //   Transaction.add(transaction);
  // },

  submit(event){
    event.preventDefault();

    try {
      Form.validateFields();
     const transaction =  Form.formatValues();

     Transaction.add(transaction);

     Form.clearFields();
     Modal.close();
    //  Form.saveTransaction(transaction)
    } catch (error) {
      alert(error.message);
    }
    // console.log(event);
  }
}

App.init();

// Transaction.remove(1);