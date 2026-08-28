document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById('newName').value,
        email: document.getElementById('newEmail').value,
        password: document.getElementById('newPassword').value
    };

    let users = JSON.parse(localStorage.getItem('nutriUsers')) || [];
    
    // Check if user exists
    if (users.find(u => u.email === userData.email)) {
        alert("Email already registered!");
        return;
    }

    users.push(userData);
    localStorage.setItem('nutriUsers', JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "login.html";
});