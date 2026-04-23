// Login check
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

const form = document.getElementById("notice-form");
const input = document.getElementById("notice-input");
const container = document.getElementById("notice-container");

// Load saved notices
let notices = JSON.parse(localStorage.getItem("notices")) || [];

// =====================
// SHOW NOTICES FUNCTION
// =====================
function displayNotices() {
    container.innerHTML = "";

    notices.forEach((notice, index) => {
        const div = document.createElement("div");
        div.className = "notice";

        div.innerHTML = `
            <span>${notice}</span>
            <button onclick="deleteNotice(${index})">❌</button>
        `;

        container.appendChild(div);
    });
}

// =====================
// ADD NOTICE
// =====================
form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (input.value.trim() === "") return;

    notices.push(input.value);
    localStorage.setItem("notices", JSON.stringify(notices));

    input.value = "";
    displayNotices();
});

// =====================
// DELETE NOTICE
// =====================
function deleteNotice(index) {
    notices.splice(index, 1);
    localStorage.setItem("notices", JSON.stringify(notices));
    displayNotices();
}

// =====================
// LOGOUT
// =====================
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}

// Initial load
displayNotices();