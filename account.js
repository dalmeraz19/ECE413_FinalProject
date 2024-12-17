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

    // Form references
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Password validation function
    function isStrongPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // console.log('hi')
        return passwordRegex.test(password);
    }

    // Signup form submission handling
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        // Validate input
        if (!isStrongPassword(password)) {
            alert('Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Send data to the backend
        try {
            const response = await fetch('http://your-backend-url/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Account created successfully!');
                // Switch to login form
                showLoginForm(e);
            } else {
                alert(data.error || 'Failed to create account.');
            }
        } catch (error) {
            // console.error('Error:', error);
            // alert('An error occurred. Please try again.');
            // Store user data in localStorage
            const userInfo = {
                name: name,
                email: email,
                password: password,
                experience: null  // null for user
            };

            // Save userInfo in localStorage (can also use sessionStorage for temporary storage)
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            if (localStorage.getItem('userInfo')) {
                localStorage.removeItem('physicianInfo');
            }

            alert('Sign up successful!');
            window.location.href = 'dashboard.html';  // Redirect to login page
            }
    });

    // Login form submission handling
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Retrieve user info from localStorage
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (storedUserInfo) {
            // Validate the email and password
            if (storedUserInfo.email === email && storedUserInfo.password === password) {
                // Check if experience exists to distinguish between physician and user
                if (storedUserInfo.experience) {
                    // Redirect to physician dashboard
                    window.location.href = 'physician_portal.html';
                } else {
                    // Redirect to user dashboard
                    window.location.href = 'dashboard.html';
                }
            } else {
                alert('Invalid email or password');
            }
        } else {
            alert('No user found');
        }

        // Send data to the backend
        // try {
        //     const response = await fetch('http://your-backend-url/api/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ email, password }),
        //     });

        //     const data = await response.json();
        //     if (response.ok) {
        //         alert('Login successful!');
        //         // Redirect to dashboard
        //         window.location.href = 'dashboard.html';
        //     } else {
        //         alert(data.error || 'Login failed. Please check your credentials.');
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        //     alert('An error occurred. Please try again.');
        // }
    });
});
