import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, push, onValue, set, remove } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

// Firebase configuration
const firebaseConfig = {
  databaseURL: "https://roadwallet-ca339-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const roadWalletRef = ref(database, "roadWallet")

// Retrieve necessary elements for manipulation
const expenseForm = document.getElementById("expense-form");
const totalExpensesAmountElement = document.getElementById("total-expenses-amount");
const expenseList = document.getElementById("expense-list");
const modal = document.getElementById("travelers-modal");
const openModalButton = document.getElementById("open-modal-button");
const closeButton = document.querySelector(".close-button");
const travelersForm = document.getElementById("travelers-form");
const travelerNameInput = document.getElementById("traveler-name");
const travelersList = document.getElementById("travelers-list");

// Initialize arrays to store expense and traveler data
let expenses = [];
let travelers = [];

// Fetch initial data from Firebase
fetchData();

// Event listener to show the modal when the button is clicked
openModalButton.addEventListener("click", function () {
  modal.classList.add("display-modal");
});

// Event listener to hide the modal when the close button is clicked
closeButton.addEventListener("click", function () {
  modal.classList.remove("display-modal");
});

// Event listener to close the modal if clicked outside of it
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.remove("display-modal");
  }
});

// Handle form submission for expenses
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  handleNewExpense();
});

// Handle form submission for adding a new traveler
travelersForm.addEventListener("submit", function (event) {
  event.preventDefault();
  handleNewTraveler();
});

// Function to fetch data from Firebase
function fetchData() {
  onValue(roadWalletRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      expenses = data.expenses || [];
      travelers = data.travelers || [];
      updateDisplays();
    }
  });
}

// Function to process a new expense entry
function handleNewExpense() {
  const category = document.getElementById("expense-category").value;
  const amount = parseInt(document.getElementById("expense-amount").value);
  expenses.push({ category, amount });
  updateFirebase();
  expenseForm.reset();
}

// Function to process adding a new traveler
function handleNewTraveler() {
  const travelerName = travelerNameInput.value.trim();
  if (travelerName !== "") {
    travelers.push({ name: travelerName, amountOwed: 0 });
    updateFirebase();
    travelerNameInput.value = "";
  }
}

// Function to update Firebase
function updateFirebase() {
  set(roadWalletRef, { expenses, travelers });
}

// Function to update all relevant displays (expenses and travelers)
function updateDisplays() {
  calculateAmountOwed();
  updateTotalExpensesAmount();
  updateExpenseList();
  updateTravelersList();
}

// Calculate the amount each traveler owes and update their record
function calculateAmountOwed() {
  if (travelers.length === 0) return;
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const amountPerTraveler = (totalExpense / travelers.length).toFixed(2);
  travelers.forEach(traveler => traveler.amountOwed = amountPerTraveler);
}

// Update the total expenses display
function updateTotalExpensesAmount() {
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalExpensesAmountElement.textContent = "$" + totalExpense;
}

// Refresh the list of expenses on the page
function updateExpenseList() {
  expenseList.innerHTML = "";
  expenses.forEach(function (expense, index) {
    addExpenseToList(expense, index);
  });
}

// Add a single expense item to the list
function addExpenseToList(expense, index) {
  const expenseItem = document.createElement("li");
  expenseItem.textContent = expense.category + ": $" + expense.amount;
  const deleteIcon = createDeleteButton(index, deleteExpense);
  expenseItem.appendChild(deleteIcon);
  expenseList.appendChild(expenseItem);
}

// Remove an expense from the list and update displays
function deleteExpense(index) {
  expenses.splice(index, 1);
  updateFirebase();
}

// Refresh the list of travelers on the page
function updateTravelersList() {
  travelersList.innerHTML = "";
  travelers.forEach(function (traveler, index) {
    addTravelerToList(traveler, index);
  });
}

// Add a single traveler to the list
function addTravelerToList(traveler, index) {
  const travelerItem = document.createElement("div");
  travelerItem.classList.add("traveler-item");
  travelerItem.textContent = traveler.name + ": $" + traveler.amountOwed;
  const removeButton = createDeleteButton(index, removeTraveler);
  travelerItem.appendChild(removeButton);
  travelersList.appendChild(travelerItem);
}

// Remove a traveler from the list and update displays
function removeTraveler(index) {
  travelers.splice(index, 1);
  updateFirebase();
}

// Helper function to create a delete button for both expenses and travelers
function createDeleteButton(index, deleteFunction) {
  const button = document.createElement("button");
  button.innerHTML = "<i class='fas fa-trash-alt'></i>";
  button.addEventListener("click", function () {
    deleteFunction(index);
  });
  return button;
}
