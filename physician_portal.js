document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('physicianInfo');
    if (!token) {
        // Apply the blur effect to the background
        document.body.style.filter = 'blur(5px)';
        // After the alert is dismissed, automatically redirect
        window.location.href = 'physician_registration.html';
    }
})