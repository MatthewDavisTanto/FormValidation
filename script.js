const form = document.getElementById("registrationForm");

const fields = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
    phone: document.getElementById("phone"),
    country: document.getElementById("country")
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{10,}$/;

function showError(fieldName, message) {
    const input = fields[fieldName];
    document.getElementById(fieldName + "Error").textContent = message;
    input.classList.toggle("invalid", message !== "");
    input.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateField(fieldName) {
    const value = fields[fieldName].value.trim();
    let message = "";

    if (fieldName === "fullName" && value === "") {
        message = "Full name cannot be empty.";
    } else if (fieldName === "email") {
        if (value === "") message = "Email is required.";
        else if (!emailPattern.test(value)) message = "Enter a valid email, e.g. name@example.com.";
    } else if (fieldName === "password" && value.length < 6) {
        message = "Password must be at least 6 characters.";
    } else if (fieldName === "confirmPassword") {
        if (value === "") message = "Please confirm your password.";
        else if (value !== fields.password.value) message = "Passwords do not match.";
    } else if (fieldName === "phone" && !phonePattern.test(value)) {
        message = "Enter at least 10 digits (numbers only).";
    } else if (fieldName === "country" && value === "") {
        message = "Please select a country.";
    }

    showError(fieldName, message);
    return message === "";
}

function validateGender() {
    const selected = document.querySelector('input[name="gender"]:checked');
    document.getElementById("genderError").textContent = selected ? "" : "Please select your gender.";
    return Boolean(selected);
}

function validateHobbies() {
    const selected = document.querySelectorAll('input[name="hobbies"]:checked');
    document.getElementById("hobbiesError").textContent =
        selected.length ? "" : "Select at least one hobby or interest.";
    return selected.length > 0;
}

// Show feedback while the user fills in the form.
Object.keys(fields).forEach((fieldName) => {
    fields[fieldName].addEventListener("input", () => {
        validateField(fieldName);
        if (fieldName === "password" && fields.confirmPassword.value !== "") {
            validateField("confirmPassword");
        }
    });
    fields[fieldName].addEventListener("change", () => validateField(fieldName));
});

document.querySelectorAll('input[name="gender"]').forEach((radio) => {
    radio.addEventListener("change", validateGender);
});
document.querySelectorAll('input[name="hobbies"]').forEach((checkbox) => {
    checkbox.addEventListener("change", validateHobbies);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fieldsValid = Object.keys(fields).map(validateField).every(Boolean);
    const genderValid = validateGender();
    const hobbiesValid = validateHobbies();
    const successMessage = document.getElementById("successMessage");

    if (fieldsValid && genderValid && hobbiesValid) {
        successMessage.textContent = "Form submitted successfully!";
        form.reset();
        Object.keys(fields).forEach((fieldName) => {
            fields[fieldName].classList.remove("invalid");
            fields[fieldName].setAttribute("aria-invalid", "false");
            document.getElementById(fieldName + "Error").textContent = "";
        });
        document.getElementById("genderError").textContent = "";
        document.getElementById("hobbiesError").textContent = "";
    } else {
        successMessage.textContent = "";
        const firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
    }
});
