let error = document.querySelector('.error')
let email = document.getElementById('email');
let form = document.getElementById('submit-form');
let modal = document.getElementById('success-modal');
let main = document.getElementById('form-main');
let dismiss = document.getElementById('dismiss-btn');

form.addEventListener('submit', (e) => {
    e.preventDefault()

    // Email Validation
    let emailValue = email.value;


    const emailError = validateEmail(emailValue);
    if (emailError) {
        error.textContent = emailError
        email.className = "error-state"
        return
    }

    error.textContent = ''
    email.className = "normal"
    main.style.display = "none"
    modal.style.display = "flex"
})

function validateEmail(email) {
    if (!email) return 'Email is required';

    const isValidEmail = /^\S+@\S+$/g
    if (!isValidEmail.test(email)) {
        return 'Valid email required';
    }

    return '';
}

email.addEventListener('focus', () => {
    email.className = "normal";
    error.textContent = "";
});

dismiss.addEventListener('click', () => {
  modal.style.display = "none";
  main.style.display = "block";
});