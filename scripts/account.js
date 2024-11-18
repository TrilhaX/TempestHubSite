function getInfo() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username && atob(user.password));  // Closing the parentheses properly

    if (user) {
        document.querySelector("#spanUsername").innerHTML = user.username + "#" + user.id;
        document.querySelector("#spanEmail").innerHTML =  user.email;
        document.querySelector("#spanSenha").innerHTML = atob(user.password)
    } else {
        alert('Invalid username or password');
    }
}

getInfo();