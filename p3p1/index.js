import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

// Your web app's Firebase configuration. You will get this when you create a new Firebase project.
const firebaseConfig = {
  databaseURL: "https://first-database-38499-default-rtdb.firebaseio.com/",
}

// Your web app's Firebase configuration
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const thingsRef = ref(database, "things")

// Page elements
const inputFieldEl = document.getElementById("input-field")
const pushButtonEl = document.getElementById("push-button")
const thingsEl = document.getElementById("things")

// Firebase functions
pushButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value
  push(thingsRef, inputValue)
})

onValue(thingsRef, function(snapshot) {
  if (snapshot.exists()) {
    let things = Object.values(snapshot.val())
    thingsEl.innerHTML = ""
        
    for (let i = 0; i < things.length; i++) {
      thingsEl.innerHTML += `<li>${things[i]}</li>`   
    }   
  } else {
      thingsEl.innerHTML = "No things yet"
  }
})