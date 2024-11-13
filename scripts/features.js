window.addEventListener('load', function() {
    const loginLink = document.getElementById('loginLink');
    const dashboardLink = document.getElementById('dashboardLink');
    const dashboardButton = document.querySelector('.buttonRegister');

    if (sessionStorage.getItem('loggedInUser')) {
        loginLink.textContent = 'Account';
        loginLink.href = 'account.html';
        dashboardLink.style.display = 'block';
        
        if (dashboardButton) {
            dashboardButton.innerText = 'Dashboard';
        }
    } else {
        loginLink.textContent = 'Login';
        dashboardLink.style.display = 'none';

        if (dashboardButton) {
            dashboardButton.innerText = 'Login';
        }
    }
});