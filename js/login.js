// selectors
const btnLogin = document.querySelector("#btn-login");
const form = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const spinner = document.querySelector("#spinner");
const logText = document.querySelector("#LogText");

try {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = validationForm();
    console.log(valid, "valid");
    if (valid) {
      btnLogin.classList.remove("hover:bg-lime-600");
      btnLogin.classList.add("bg-gray-400");
      logText.textContent = "";
      spinner.classList.remove("hidden");
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    }
  });
} catch (error) {
  console.log(error);
}

const isValidEmail = (email) => {
  //l'expression régulière
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

function validationForm() {
  let valid = true;

  if (email.value.trim() === "") {
    emailError.textContent = "Please enter your email";
    email.classList.add("border-red-500");
    valid = false;
  } else if (!isValidEmail(email.value)) {
    emailError.textContent = "Please enter a valid email";
    email.classList.add("border-red-500");
    valid = false;
  } else {
    email.classList.remove("border-red-500");
    emailError.textContent = "";
  }

  if (password.value.trim() === "") {
    passwordError.textContent = "Please enter your password";
    password.classList.add("border-red-500");
    valid = false;
  } else {
    password.classList.remove("border-red-500");
    passwordError.textContent = "";
  }

  return valid;
}
