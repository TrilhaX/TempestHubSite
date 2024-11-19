function getInfo() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username && atob(user.password) && user.email);

    if (user) {
        document.querySelector("#usernameText").placeholder = user.username + "#" + user.id;
        document.querySelector("#emailText").placeholder = user.email;
        document.querySelector("#passwordText").placeholder = atob(user.password);
    } else {
        alert('Invalid username or password');
    }
}

function changeUsername() {
    let inputUsername = document.querySelector("#usernameText");
    let buttonUsername = document.querySelector("#usernameButton");

    if (inputUsername.disabled) {
        inputUsername.innerHTML = "";
        inputUsername.placeholder = "";
        inputUsername.disabled = false;
        buttonUsername.innerHTML = "Confirm new username";
    } else {
        confirmUsername();
    }
}

function changeEmail() {
    let inputEmail = document.querySelector("#emailText");
    let buttonEmail = document.querySelector("#emailButton");

    if (inputEmail.disabled) {
        inputEmail.innerHTML = "";
        inputEmail.placeholder = "";
        inputEmail.disabled = false;
        buttonEmail.innerHTML = "Confirm new email";
    } else {
        confirmEmail();
    }
}

function changePassword() {
    let inputPassword = document.querySelector("#passwordText");
    let buttonPassword = document.querySelector("#passwordButton");

    if (inputPassword.disabled) {
        inputPassword.innerHTML = "";
        inputPassword.placeholder = "";
        inputPassword.disabled = false;
        buttonPassword.innerHTML = "Confirm new password";
    } else {
        confirmPassword();
    }
}

function confirmUsername() {
    let inputUsername = document.querySelector("#usernameText");
    let buttonUsername = document.querySelector("#usernameButton");

    let user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!user) {
        alert('No user is logged in.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let existingUser = users.find(u => u.username === inputUsername.value);
    if (existingUser && existingUser.id !== user.id) {
        inputUsername.disabled = true;
        buttonUsername.innerHTML = "Change username";
        return;
    }

    user.username = inputUsername.value;
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));

    let updatedUsers = users.map(u => u.id === user.id ? user : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    inputUsername.placeholder = user.username + "#" + user.id;
    inputUsername.value = user.username + "#" + user.id;
    inputUsername.disabled = true;
    buttonUsername.innerHTML = "Change username";
}

function confirmEmail() {
    let inputEmail = document.querySelector("#emailText");
    let user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!user) {
        alert('No user is logged in.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    user.email = inputEmail.value;

    sessionStorage.setItem('loggedInUser', JSON.stringify(user));

    let updatedUsers = users.map(u => u.id === user.id ? user : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    document.querySelector("#emailText").innerHTML = user.email;
    inputEmail.disabled = true;
    document.querySelector("#emailButton").innerHTML = "Change Email";
}

function confirmPassword() {
    let inputPassword = document.querySelector("#passwordText");
    let user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!user) {
        alert('No user is logged in.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    user.password = btoa(inputPassword.value);

    sessionStorage.setItem('loggedInUser', JSON.stringify(user));

    let updatedUsers = users.map(u => u.id === user.id ? user : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    document.querySelector("#passwordText").innerHTML = inputPassword.value;
    inputPassword.disabled = true;
    document.querySelector("#passwordButton").innerHTML = "Change Password";
}

document.querySelector("#usernameButton").addEventListener("click", changeUsername);
document.querySelector("#emailButton").addEventListener("click", changeEmail);
document.querySelector("#passwordButton").addEventListener("click", changePassword);

getInfo();