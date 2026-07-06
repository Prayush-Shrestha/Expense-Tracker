const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");
const searchInput = document.getElementById("search");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

renderList(expenses);

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const amount = amountInput.value;

  if (name === "" || amount === "") {
    alert("Fill all fields");
    return;
  }

  expenses.push({
    id: Date.now(),
    name,
    amount: Number(amount),
    category: categoryInput.value
  });

  save();
  renderList(expenses);

  nameInput.value = "";
  amountInput.value = "";
});

searchInput.addEventListener("keyup", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = expenses.filter(e => e.name.toLowerCase().includes(keyword));
  renderList(filtered);
});

function renderList(list) {
  expenseList.innerHTML = "";
  let sum = 0;

  list.forEach(exp => {
    sum += exp.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <b>${exp.name}</b><br>
        ${exp.category}<br>
        $${exp.amount}
      </div>
      <button class="delete" onclick="removeExpense(${exp.id})">Delete</button>
    `;

    expenseList.appendChild(li);
  });

  totalEl.textContent = sum;
}

function removeExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  save();
  renderList(expenses);
}

function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}