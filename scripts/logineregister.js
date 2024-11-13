let users = JSON.parse(localStorage.getItem('users')) || [];
let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')) || [];

function generateUniqueId() {
    return 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

function register(event) {
    event.preventDefault();
    let erroMensagem = document.getElementById('erroMensagem');
    erroMensagem.innerHTML = '';

    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (username && email && password && confirmPassword) {
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            erroMensagem.innerHTML = "Account already registered";
            erroMensagem.style.display = "block";
        } else {
            if (password === confirmPassword) {
                const user = {
                    username: username,
                    email: email,
                    password: btoa(password),
                    id: generateUniqueId()
                };

                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));

                window.location.href = "login.html";
            } else {
                erroMensagem.innerHTML = "Passwords do not match!";
                erroMensagem.style.display = "block";
            }
        }
    } else {
        erroMensagem.innerHTML = "Please fill in all fields!";
        erroMensagem.style.display = "block";
    }
}

function login(event) {
    event.preventDefault();

    let erroMensagem = document.getElementById('erroMensagem');
    erroMensagem.innerHTML = '';

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const storedUsers = JSON.parse(localStorage.getItem("users"));

    if (storedUsers) {
        const user = storedUsers.find(user => user.username === username && atob(user.password) === password);
        if (user) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "index.html";
        } else {
            erroMensagem.innerHTML = "Incorrect username or password!";
            erroMensagem.style.display = "block";
        }
    } else {
        erroMensagem.innerHTML = "No users found!";
        erroMensagem.style.display = "block";
    }
}

if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", register);
}else{
    document.getElementById("loginForm").addEventListener("submit", login);
}