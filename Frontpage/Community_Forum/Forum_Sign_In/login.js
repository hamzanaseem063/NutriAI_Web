document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 1. Get users from Signup
    const users = JSON.parse(localStorage.getItem('nutriUsers')) || [];
    
    // 2. Find if any user matches
    const matchedUser = users.find(u => u.email === email && u.password === password);

    // 3. Default Admin Check
    const isAdmin = (email === "user@nutriai.com" && password === "password123");

    if (isAdmin || matchedUser) {
        sessionStorage.setItem('isLoggedIn', 'true');
        // If it's a signed up user, use their name. Otherwise use "Demo User"
        sessionStorage.setItem('userName', matchedUser ? matchedUser.name : "Demo User");
        
        window.location.href = "forum.html";
    } else {
        alert("Invalid email or password. Please try again or Sign Up.");
    }
});