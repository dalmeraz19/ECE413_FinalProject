document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form sections and toggle links
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');

    // Function to show signup form
    function showSignupForm(e) {
        e.preventDefault();
        loginSection.classList.remove('active');
        signupSection.classList.add('active');
    }

    // Function to show login form
    function showLoginForm(e) {
        e.preventDefault();
        signupSection.classList.remove('active');
        loginSection.classList.add('active');
    }

    // Add event listeners to toggle links
    showSignupLink.addEventListener('click', showSignupForm);
    showLoginLink.addEventListener('click', showLoginForm);

    // Optional: Form submission handling (you'll expand this later)
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Login logic will be implemented later
        console.log('Login submitted');
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Signup logic will be implemented later
        console.log('Signup submitted');
    });
});