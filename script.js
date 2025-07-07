// Get references to the form containers and buttons
const mainAuthContainer = document.getElementById('main-auth-container');
const dynamicPanel = document.getElementById('dynamic-panel');
const formPanel = document.getElementById('form-panel');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotPasswordForm = document.getElementById('forgot-password-form');

const toggleRegisterBtn = document.getElementById('toggle-register-btn');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToLoginFromForgot = document.getElementById('back-to-login-from-forgot');

const welcomeTitle = document.getElementById('welcome-title');
const welcomeText = document.getElementById('welcome-text');

//-- Password toggle logic --
//Get reference to password input fields and toggle icons
const loginPasswordInput = document.getElementById('login-password');
const toggleLoginPassword = document.getElementById('toggle-login-password');
 
const registerPasswordInput = document.getElementById('register-password');
const toggleRegisterPassword = document.getElementById('toggle-register-password');

const registerConfirmPasswordInput = document.getElementById('register-confirm-password');
const toggleRegisterConfirmPassword = document.getElementById('toggle-register-confirm-password'); 

/**
 * Toggle the visibility of a password input field.
 * changes the input type between 'password' and 'text' and updates the eye icon. 
 */
function togglePasswordVisibility(passwordInput, toggleIcon){
    // check if the elements exist to prevent errors.
    if(!passwordInput || !toggleIcon){
        console.error("Password input or toggle icon not found. ");
        return;
    }

    // check the current type of the input field
    if(passwordInput.type === 'password'){

        // if it's a password , changes it to text to show the characters 
        passwordInput.type = 'text';

        //change the icon from 'eye' to 'eye-slash'
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else{
        //if it's text , change it back to password to hide the characters
        passwordInput.type = 'password';

        //change the icon back from 'eye-slash' to 'eye'
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

//Add event listeners for password toggles
if(toggleLoginPassword){
    toggleLoginPassword.addEventListener('click', () => {
        togglePasswordVisibility(loginPasswordInput, toggleLoginPassword);
    });
}


//Add a click prevent listener to the first password fields toggle icon 
if(toggleRegisterPassword && registerPasswordInput){
    toggleRegisterPassword.addEventListener('click', () => {
        togglePasswordVisibility(registerPasswordInput, toggleRegisterPassword);
    });
}

//Add a click event listener to the confirm password fields toggle icon 
if(toggleRegisterConfirmPassword && registerConfirmPasswordInput){
    toggleRegisterConfirmPassword.addEventListener('click', () => {
        togglePasswordVisibility(registerConfirmPasswordInput, toggleRegisterConfirmPassword);
    });
}

// Function to show a specific form and hide others
function showForm(formToShow) {
    // Hide all forms first
    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');
    forgotPasswordForm.classList.add('hidden');

    // Show the desired form
    formToShow.classList.remove('hidden');

    // Reset layout and panel classes
    mainAuthContainer.classList.remove('md:flex-row-reverse');
    dynamicPanel.classList.remove('left-panel-custom-shape', 'right-panel-custom-shape');
    dynamicPanel.classList.remove('md:rounded-l-2xl', 'md:rounded-tr-none', 'md:rounded-r-2xl', 'md:rounded-tl-none');
    dynamicPanel.classList.add('rounded-t-2xl'); // Default for mobile (top corners rounded)

    // Update the toggle button text based on which form is now visible
    if (formToShow === loginForm) {

       /* toggleRegisterBtn.textContent = 'Register';
        */

        // Login page layout: black panel on left
        dynamicPanel.classList.add('left-panel-custom-shape');
        dynamicPanel.classList.add('md:rounded-l-2xl', 'md:rounded-tr-none'); // Apply specific rounded corners for desktop

        welcomeTitle.textContent = 'Hello, Welcome!';
        welcomeText.textContent = "Don't have an account?";
        toggleRegisterBtn.textContent = 'Register';
       /* toggleRegisterBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
        toggleRegisterBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');*/
    } else if (formToShow === registerForm) {
        // Register page layout: black panel on right
        mainAuthContainer.classList.add('md:flex-row-reverse'); // Reverse the order for md screens and up
        dynamicPanel.classList.add('right-panel-custom-shape');
        dynamicPanel.classList.add('md:rounded-r-2xl', 'md:rounded-tl-none'); // Adjust rounded corners for desktop

        welcomeTitle.textContent = 'Welcome Back!';
        welcomeText.textContent = "Already have an account?";
        toggleRegisterBtn.textContent = 'Login';

    } else if (formToShow === forgotPasswordForm) {
        // Forgot Password layout: black panel on left (same as login)
        dynamicPanel.classList.add('left-panel-custom-shape');
        dynamicPanel.classList.add('md:rounded-l-2xl', 'md:rounded-tr-none'); // Apply specific rounded corners for desktop

        welcomeTitle.textContent = 'Trouble Logging In?';
        welcomeText.textContent = "We'll help you reset your password.";
        toggleRegisterBtn.textContent = 'Back to Login';
    }
}
document.addEventListener('DOMContentLoaded', () => {
            showForm(loginForm);
        });

// Event Listener for the main toggle button (Register/Login/Back to Login)
toggleRegisterBtn.addEventListener('click', () => {
    if (!loginForm.classList.contains('hidden')) { // Currently showing login form
        showForm(registerForm);
    } else if (!registerForm.classList.contains('hidden')) { // Currently showing register form
        showForm(loginForm);
    } else if (!forgotPasswordForm.classList.contains('hidden')) { // Currently showing forgot password form
        showForm(loginForm);
    }
});

// Event Listener for "Forgot Password?" link
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    showForm(forgotPasswordForm);
});

// Event listener for "Back to Login" link inside register form
        showLoginFromRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            showForm(loginForm);
        });
        
// Event Listener for "Back to Login" link on forgot password page
backToLoginFromForgot.addEventListener('click', (e) => {
    e.preventDefault();
    showForm(loginForm);
});


// Initialize by showing the login form when the page loads
showForm(loginForm);