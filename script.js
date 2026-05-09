// LOGIN

function login(){

  let username =
    document.getElementById("username").value;

  let password =
    document.getElementById("password").value;

  if(username !== "" &&
     password !== ""){

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "username",
      username
    );

    window.location.href =
      "dashboard.html";

  }

}



// LOGOUT

function logout(){

  localStorage.removeItem(
    "isLoggedIn"
  );

  window.location.href =
    "index.html";

}



// LOAD

window.onload = function(){

  let savedUsername =
    localStorage.getItem("username");

  if(savedUsername &&
     document.getElementById("profileName")){

    document.getElementById("profileName")
    .innerHTML =
    savedUsername;

  }

  let savedImage =
    localStorage.getItem("profileImage");

  if(savedImage &&
     document.getElementById("profileImage")){

    document.getElementById("profileImage")
    .src = savedImage;

  }

  loadDashboard();

  loadStatement();

};



// PROFILE IMAGE

if(document.getElementById("uploadProfile")){

  document.getElementById("uploadProfile")
  .addEventListener("change", function(){

    let file = this.files[0];

    if(file){

      let reader =
        new FileReader();

      reader.onload = function(e){

        let imageData =
          e.target.result;

        document.getElementById("profileImage")
        .src = imageData;

        localStorage.setItem(
          "profileImage",
          imageData
        );

      };

      reader.readAsDataURL(file);

    }

  });

}



// ADD INCOME

function addIncome(){

  let text =
    document.getElementById("incomeText").value;

  let amount =
    document.getElementById("incomeAmount").value;

  if(text !== "" &&
     amount !== ""){

    let transaction = {

      type:"Income",

      name:text,

      amount:parseFloat(amount),

      date:
      new Date().toLocaleString()

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

    document.getElementById("incomeText").value = "";

    document.getElementById("incomeAmount").value = "";

    loadDashboard();

  }

}



// ADD EXPENSE

function addExpense(){

  let text =
    document.getElementById("expenseText").value;

  let amount =
    document.getElementById("expenseAmount").value;

  if(text !== "" &&
     amount !== ""){

    let transaction = {

      type:"Expense",

      name:text,

      amount:parseFloat(amount),

      date:
      new Date().toLocaleString()

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

    document.getElementById("expenseText").value = "";

    document.getElementById("expenseAmount").value = "";

    loadDashboard();

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

  let balance =
    income - expense;

  if(document.getElementById("balance")){

    document.getElementById("balance")
    .innerHTML =
    "$" + balance;

  }

  if(document.getElementById("incomeTotal")){

    document.getElementById("incomeTotal")
    .innerHTML =
    "$" + income;

  }

  if(document.getElementById("expenseTotal")){

    document.getElementById("expenseTotal")
    .innerHTML =
    "$" + expense;

  }

}



// STATEMENT

function loadStatement(){

  let transactions =
    JSON.parse(
      localStorage.getItem("transactions")
    ) || [];

  let list =
    document.getElementById("statementList");

  if(list){

    list.innerHTML = "";

    transactions.reverse().forEach(function(item){

      list.innerHTML += `

        <div class="transaction">

          <div class="transaction-left">

            <h3>${item.name}</h3>

            <p>${item.date}</p>

          </div>

          <div class="transaction-right
               ${item.type === "Income"
                 ? "plus"
                 : "minus"}">

            ${item.type === "Income"
              ? "+"
              : "-"}$${item.amount}

          </div>

        </div>

      `;

    });

  }

}