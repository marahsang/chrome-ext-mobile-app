import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://chrome-ext-mobile-app-default-rtdb.europe-west1.firebasedatabase.app/"
    // databaseURL: process.env.DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

// Listen for changes in the database
onValue(referenceInDB, function(snapshot) {
    if (snapshot.exists()) {  // Ensure data exists before rendering
        const data = snapshot.val();
        const leads = Object.entries(data); // Get keys and values as an array of [key, value] pairs
        render(leads);
    } else {
        ulEl.innerHTML = ""; // Clear list if database is empty
    }
});

// Render leads in the list
function render(leads) {
    let listItems = "";
    leads.forEach(([key, lead]) => {
        listItems += `
            <li>
                <a target='_blank' href='${lead}'>
                    ${lead}
                </a>
                <button class="delete-lead-btn" data-key="${key}">❌</button>
            </li>
        `;
    });
    ulEl.innerHTML = listItems;

    // Add event listeners for each delete button
    document.querySelectorAll(".delete-lead-btn").forEach(button => {
        button.addEventListener("click", function() {
            const key = this.getAttribute("data-key");
            remove(ref(database, `leads/${key}`)) // Delete the specific lead by its key
                .catch(error => console.error("Error deleting lead:", error));
        });
    });
}

// Handle the DELETE ALL button
deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
        .then(() => {
            ulEl.innerHTML = ""; // Clear UI after deletion
        })
        .catch((error) => {
            console.error("Error deleting leads:", error);
        });
});

// Handle the ADD LEAD button
inputBtn.addEventListener("click", function() {
    const lead = inputEl.value.trim(); // Remove extra spaces
    if (lead) {
        push(referenceInDB, lead) // Push new lead to Firebase
            .then(() => inputEl.value = ""); // Clear input after saving
    }
});





/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase,
         ref,
         push,
        onValue,
    remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://abel-tracker-app-default-rtdb.europe-west1.firebasedatabase.app/"
    // databaseURL: process.env.DATABASE_URL
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

onValue(referenceInDB, function(snapshot) {
    if (snapshot.exists()) {  // Ensure data exists before rendering
        const leads = Object.values(snapshot.val());
        render(leads);
    } else {
        ulEl.innerHTML = ""; // Clear list if database is empty
    }
});

function render(leads) {
    let listItems = "";
    leads.forEach((lead, index) => {
        listItems += `
            <li>
                <a target='_blank' href='${lead}'>
                    ${lead}
                </a>
                <button class="delete-lead-btn" data-index="${index}">❌</button>
            </li>
        `;
    });
    ulEl.innerHTML = listItems;

    // Add event listeners for each delete button
    document.querySelectorAll(".delete-lead-btn").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            remove(ref(database, `leads/${index}`)); // Deletes specific lead
        });
    });
}
deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
        .then(() => {
            ulEl.innerHTML = ""; // Clear UI after deletion
        })
        .catch((error) => {
            console.error("Error deleting leads:", error);
        });
});

inputBtn.addEventListener("click", function() {
    const lead = inputEl.value.trim(); // Remove extra spaces
    if (lead) {
        push(referenceInDB, lead)  // Push new lead to Firebase
            .then(() => inputEl.value = ""); // Clear input after saving
    }
});

*/




/*import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase,
         ref,
         push,
        onValue,
    remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://abel-tracker-app-default-rtdb.europe-west1.firebasedatabase.app/"
    // databaseURL: process.env.DATABASE_URL
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

onValue(referenceInDB, function(snapshot){
    const snapshotValues = snapshot.val()
    if (snapshotValues) {
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    // Challenge: Import the 'push' function and modify the line above to push inputEl.value to the referenceInDB in the database
    inputEl.value = ""
})
*/    