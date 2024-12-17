document.getElementById("reg-form").addEventListener("submit", async function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Get form values
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const experience = document.getElementById("experience").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm").value;

    // Validate password
    if (!isStrongPassword(password)) {
        alert("Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.");
        return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Prepare data to send
    const formData = {
        name,
        email,
        experience,
        password,
        experience
    };

    try {
        // Send data to the server
        const response = await fetch("https://example.com/api/register", { // Replace with your server API URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // Handle the server response
        if (response.ok) {
            const result = await response.json();
            alert("Registration successful!");
            console.log(result);
            // Redirect to login page
            window.location.href = "account.html";
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        // console.error("Error during registration:", error);
        // alert("Failed to register. Please try again later.");
        // Store locally
        const physicianInfo = {
            name: name,
            email: email,
            experience: experience,
            password:password,
        };

        //  store locally
        localStorage.setItem('physicianInfo', JSON.stringify(physicianInfo));
        if (localStorage.getItem('physicianInfo')) {
            localStorage.removeItem('userInfo');
        }

        alert('Sign up successful!');
        // Redirect to physician page
        window.location.href = "physician_portal.html"; 
        }
});

// Strong password validation function
function isStrongPassword(password) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return strongPasswordRegex.test(password);
}