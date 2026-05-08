// LOGIN

function login(){

  let username =
    document.getElementById("username").value;

  let password =
    document.getElementById("password").value;


  if(username !== "" &&
     password !== ""){

    document.getElementById("loginPage")
    .style.display = "none";

    document.getElementById("mainPage")
    .style.display = "block";

    loadDashboard();

    loadStatement();

  }
  else{

    alert("Please enter username and password");

  }

}



// PAGE

function showPage(pageId){

  let sections =
    document.querySelectorAll("section");


  sections.forEach(function(section){

    section.style.display = "none";

  });


  document.getElementById(pageId)
  .style.display = "block";

}



// SAVE INCOME

function addIncome(){

  let incomeText =
    document.getElementById("incomeText").value;

  let incomeAmount =
    document.getElementById("incomeAmount").value;


  if(incomeText !== "" &&
     incomeAmount !== ""){

    let transaction = {

      type:"Income",

      name:incomeText,

      amount:parseFloat(incomeAmount),

      date:
      new Date().toLocaleDateString(),

      time:
      new Date().toLocaleTimeString()

    };


    let transactions =
      JSON.parse(
        localStorage.getItem("transactions")
      ) || [];


    transactions.push(transaction);


    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );


    alert("Income Saved");


    document.getElementById("incomeText").value = "";

    document.getElementById("incomeAmount").value = "";


    loadDashboard();

    loadStatement();

  }

}



// SAVE EXPENSE

function addExpense(){

  let expenseText =
    document.getElementById("expenseText").value;

  let expenseAmount =
    document.getElementById("expenseAmount").value;


  if(expenseText !== "" &&
     expenseAmount !== ""){

    let transaction = {

      type:"Expense",

      name:expenseText,

      amount:parseFloat(expenseAmount),

      date:
      new Date().toLocaleDateString(),

      time:
      new Date().toLocaleTimeString()

    };


    let transactions =
      JSON.parse(
        localStorage.getItem("transactions")
      ) || [];


    transactions.push(transaction);


    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );


    alert("Expense Saved");


    document.getElementById("expenseText").value = "";

    document.getElementById("expenseAmount").value = "";


    loadDashboard();

    loadStatement();

  }

}



// DASHBOARD

function loadDashboard(){

  let transactions =
    JSON.parse(
      localStorage.getItem("transactions")
    ) || [];


  let income = 0;

  let expense = 0;


  transactions.forEach(function(item){

    if(item.type === "Income"){

      income += item.amount;

    }
    else{

      expense += item.amount;

    }

  });


  let balance = income - expense;


  document.getElementById("balance")
  .innerHTML =
  "$" + balance;


  document.getElementById("incomeTotal")
  .innerHTML =
  "$" + income;


  document.getElementById("expenseTotal")
  .innerHTML =
  "$" + expense;

}



// STATEMENT

function loadStatement(){

  let transactions =
    JSON.parse(
      localStorage.getItem("transactions")
    ) || [];


  let table =
    document.getElementById("statementList");


  table.innerHTML = "";


  transactions.forEach(function(item){

    table.innerHTML += `

      <tr>

        <td>${item.type}</td>

        <td>${item.name}</td>

        <td>$${item.amount}</td>

        <td>${item.date}</td>

        <td>${item.time}</td>

      </tr>

    `;

  });

}



// DEFAULT PAGE

document.getElementById("dashboard")
.style.display = "block";