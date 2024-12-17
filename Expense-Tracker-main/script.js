const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide"),
  loginForm = document.querySelector(".login_form"),
  signupForm = document.querySelector(".signup_form");

formOpenBtn.addEventListener("click", () => {
  // Open the form container and show the login form by default
  formContainer.classList.add("active");
  home.classList.add("show");
});

formCloseBtn.addEventListener("click", () => {
  // Close the form container and hide the home section
  formContainer.classList.remove("active");
  home.classList.remove("show");
});

pwShowHide.forEach((icon) => {
  // Toggle password visibility
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // Switch to the signup form view
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // Switch to the login form view
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});
