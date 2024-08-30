document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
   document.getElementById('phoneError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
   const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    let isValid = true;

    // Validate name
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    }

    // Validate email
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('emailError').textContent = 'Email is invalid';
        isValid = false;
    }

    // Validate password
    if (password === '') {
        document.getElementById('passwordError').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    // Validate confirm password
    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').textContent = 'Confirm Password is required';
        isValid = false;
    } else if (confirmPassword !== password) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }

    // If form is valid, submit it
    if (isValid) {
        alert('Registration successful!');
        document.getElementById('registrationForm').reset(); // Reset form after successful submission
    }
});