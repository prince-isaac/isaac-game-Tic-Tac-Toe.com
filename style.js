// Function to validate password strength
function checkPasswordStrength(password) {
    const lowercase = document.getElementById('lowercase');
    const uppercase = document.getElementById('uppercase');
    const number = document.getElementById('number');
    const length = document.getElementById('length');

    // Check for each rule and update its status
    lowercase.classList.toggle('valid', /[a-z]/.test(password));
    lowercase.classList.toggle('invalid', !/[a-z]/.test(password));

    uppercase.classList.toggle('valid', /[A-Z]/.test(password));
    uppercase.classList.toggle('invalid', !/[A-Z]/.test(password));

    number.classList.toggle('valid', /\d/.test(password));
    number.classList.toggle('invalid', !/\d/.test(password));

    length.classList.toggle('valid', password.length >= 6);
    length.classList.toggle('invalid', password.length < 6);
}

// Handle password input in the signup form
document.getElementById('signup-password').addEventListener('input', function () {
    const password = document.getElementById('signup-password').value;
    checkPasswordStrength(password);
});

// Validate password format on signup
function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordPattern.test(password);
}

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store the current user
        window.location.href = 'index.html'; // Redirect to welcome page
    } else {
        document.getElementById('login-error').style.display = 'block'; // Show error message
    }
});

// Handle sign-up form submission
document.getElementById('signup').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    // Validate password
    if (!validatePassword(password)) {
        alert('Password must be at least 6 characters long, contain uppercase and lowercase letters, and at least one number.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username already exists
    if (users.find(user => user.username === username)) {
        alert('Username already exists. Please choose a different one.');
        return;
    }

    // Add new user
    const newUser = { name, username, password };
    users.push(newUser);

    // Save users to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('signup-success').style.display = 'block'; // Show success message

    setTimeout(() => {
        document.querySelector('.signup-form').style.display = 'none';
        document.querySelector('.login-form').style.display = 'block'; // Switch to login form
    }, 2000);
});

// Auto-fill the login form with the last registered username
document.addEventListener('DOMContentLoaded', function () {
    const savedUsername = localStorage.getItem('signupUsername');
    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
    }
});

// Switch between login and signup forms
document.getElementById('signup-link').addEventListener('click', function () {
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.signup-form').style.display = 'block';
});

document.getElementById('login-link').addEventListener('click', function () {
    document.querySelector('.signup-form').style.display = 'none';
    document.querySelector('.login-form').style.display = 'block';
});
