let currentStep = 0;
showStep(currentStep);

function showStep(step) {
    const sections = document.getElementsByClassName('form-section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none'; // Hide all sections
    }
    sections[step].style.display = 'block'; // Show the current section
    document.getElementById('currentStep').textContent = step + 1; // Update step indicator
}

function nextPrev(n) {
    const sections = document.getElementsByClassName('form-section');

    // Validate current step
    if (currentStep === 0 || currentStep === 1 || currentStep === 2 || currentStep === 3) {
        if (n === 1 && !validateForm()) return false; // Prevent moving to the next section if validation fails
    }

    sections[currentStep].style.display = 'none'; // Hide current section
    currentStep += n; // Update step index

    if (currentStep >= sections.length) {
        document.getElementById('regForm').submit(); // Submit the form if on the last section
        return false;
    }

    showStep(currentStep); // Show the next/previous step
}

function validateForm() {
    let valid = true; // Start with valid status
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    // Validate Full Name
    if (currentStep === 0) { // Personal Information section
        if (fullName.value.trim() === "") {
            document.getElementById('fullNameError').textContent = "Full Name is required.";
            document.getElementById('fullNameError').style.display = "block";
            valid = false;
        } else {
            document.getElementById('fullNameError').style.display = "none";
        }

        // Validate Email
        if (!email.checkValidity()) {
            document.getElementById('emailError').textContent = "Please enter a valid email address.";
            document.getElementById('emailError').style.display = "block";
            valid = false;
        } else {
            document.getElementById('emailError').style.display = "none";
        }

        // Validate Phone
        if (phone.value.trim() === "") {
            document.getElementById('phoneError').textContent = "Phone Number is required.";
            document.getElementById('phoneError').style.display = "block";
            valid = false;
        } else {
            document.getElementById('phoneError').style.display = "none";
        }
    }

    // Add additional validations for each section here based on the currentStep
    if (currentStep === 1) { // Course Selection section
        const course = document.getElementById('course');
        if (course.value === "") {
            document.getElementById('courseError').textContent = "Course selection is required.";
            document.getElementById('courseError').style.display = "block";
            valid = false;
        } else {
            document.getElementById('courseError').style.display = "none";
        }
    }

    // Additional validations for payment details and account setup can be added similarly

    return valid; // Return the overall validity status
}

// Call loadProgress when the form is loaded
window.onload = loadProgress;