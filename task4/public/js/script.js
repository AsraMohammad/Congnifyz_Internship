// script.js

// Function to check password strength
function checkPasswordStrength(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    let strength = 0;
    for (const requirement of Object.values(requirements)) {
        if (requirement) strength++;
    }

    return strength;
}

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('passwordStrength');

    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);

        let strengthText = '';
        switch (strength) {
            case 0:
                strengthText = 'Weak';
                break;
            case 1:
            case 2:
                strengthText = 'Moderate';
                break;
            case 3:
            case 4:
                strengthText = 'Strong';
                break;
            default:
                break;
        }

        passwordStrength.innerHTML = `<div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${strength * 25}%" aria-valuenow="${strength * 25}" aria-valuemin="0" aria-valuemax="100">${strengthText}</div>
        </div>`;
    });
});

// Form submission validation
document.getElementById('userForm').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;

    const strength = checkPasswordStrength(password);
    if (strength < 3) {
        alert('Password must be strong. Please follow the requirements.');
        event.preventDefault();
    }

    if (isNaN(age) || age < 18) {
        alert('Age must be a number and at least 18.');
        event.preventDefault();
    }
});
