document.addEventListener("DOMContentLoaded", function() {
    const showRegistration = document.getElementById("showRegistration");
    const loginForm = document.getElementById("loginForm");
    const registrationForm = document.getElementById("registrationForm");
    
    showRegistration.addEventListener("click", function() {
        loginForm.style.display = "none";
        registrationForm.style.display = "block";
    });
    
    const backToLogin = document.getElementById("backToLogin");
    if (backToLogin) {
        backToLogin.addEventListener("click", function() {
            registrationForm.style.display = "none";
            loginForm.style.display = "block";
        });
    }
});