// app.js

//slider
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


// Sign Up

// Fungsi untuk mengecek apakah semua input fields sudah terisi
function checkInputs() {
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signUpButton = document.getElementById("sign-up-button");
  const passwordHint = document.getElementById("password-hint-signup"); // Updated ID

  const usernameValue = usernameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  // Cek apakah semua input fields sudah terisi
  if (usernameValue !== "" && emailValue !== "" && passwordValue !== "") {
    // Validasi password minimal 8 digit
    if (passwordValue.length >= 8) {
      signUpButton.removeAttribute("disabled"); // Aktifkan tombol "Sign up"
      passwordHint.style.display = "none"; // Sembunyikan pesan hint jika password sudah memenuhi syarat
    } else {
      signUpButton.setAttribute("disabled", "disabled"); // Nonaktifkan tombol "Sign up"
      passwordHint.style.display = "block"; // Tampilkan pesan hint jika password kurang dari 8 digit
    }
  } else {
    signUpButton.setAttribute("disabled", "disabled"); // Nonaktifkan tombol "Sign up" jika ada input fields yang kosong
    passwordHint.style.display = "none"; // Sembunyikan pesan hint jika ada input fields yang kosong
  }
}

// Event listener untuk setiap input field
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

usernameInput.addEventListener("input", checkInputs);
emailInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

// Fungsi untuk validasi form sebelum submit

// function validateForm(msg) {
//   const msg1 = msg; // Ganti dengan pesan yang ingin Anda tampilkan
//   console.log(msg1);
//   alert(msg1);
//   window.location.href = "/";
// }





// function pesan(msg) {
//   alert(msg);
//   window.location.href = '/';
// }

// Fungsi untuk toggle tampilan password
function toggleShowPassword() {
  const passwordInput = document.getElementById("password");
  const showPasswordBtn = document.getElementById("show-password-btn");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showPasswordBtn.textContent = "Hide Password";
  } else {
    passwordInput.type = "password";
    showPasswordBtn.textContent = "Show Password";
  }
}

// Sign In

// Fungsi untuk toggle tampilan password pada Sign In form
function toggleShowSignInPassword() {
  const passwordInput = document.getElementById("signin-password");
  const showPasswordBtn = document.getElementById("show-signin-password-btn");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showPasswordBtn.textContent = "Hide Password";
  } else {
    passwordInput.type = "password";
    showPasswordBtn.textContent = "Show Password";
  }
}



// Fungsi untuk mengecek apakah semua input fields pada Sign In form sudah terisi
function checkSignInInputs() {
  const usernameInput = document.getElementById("signin-username");
  const passwordInput = document.getElementById("signin-password");
  const loginButton = document.getElementById("login-button");
  const passwordHint = document.getElementById("password-hint");

  const usernameValue = usernameInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  // Cek apakah semua input fields sudah terisi
  if (usernameValue !== "" && passwordValue !== "") {
    // Cek apakah password memiliki minimal 8 digit
    if (passwordValue.length >= 8) {
      loginButton.removeAttribute("disabled"); // Enable tombol "Login"
      passwordHint.style.display = "none"; // Sembunyikan pesan hint jika password sudah memenuhi syarat
    } else {
      loginButton.setAttribute("disabled", "disabled"); // Disable tombol "Login"
      passwordHint.style.display = "block"; // Tampilkan pesan hint jika password kurang dari 8 digit
    }
  } else {
    loginButton.setAttribute("disabled", "disabled"); // Disable tombol "Login" jika ada input fields yang kosong
    passwordHint.style.display = "none"; // Sembunyikan pesan hint jika ada input fields yang kosong
  }
}

// Event listener untuk setiap input field pada Sign In form
const signinUsernameInput = document.getElementById("signin-username");
const signinPasswordInput = document.getElementById("signin-password");

signinUsernameInput.addEventListener("input", checkSignInInputs);
signinPasswordInput.addEventListener("input", checkSignInInputs);

// Fungsi untuk validasi form Sign In sebelum submit (Tambahkan validasi sesuai kebutuhan)
function validateSignInForm(event) {
  event.preventDefault(); // Hentikan submit form secara default

  const usernameInput = document.getElementById("signin-username");
  const passwordInput = document.getElementById("signin-password");

  // Ambil nilai dari input fields
  const usernameValue = usernameInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  // Periksa apakah input fields sudah diisi (Isi validasi sesuai kebutuhan)
  if (usernameValue === "" || passwordValue === "") {
    alert("Mohon lengkapi semua input fields.");
    return false; // Jangan submit form jika ada input fields yang kosong
  }

  // Periksa apakah password memiliki minimal 8 digit
  if (passwordValue.length < 8) {
    alert("Password harus memiliki minimal 8 digit.");
    return false; // Jangan submit form jika password kurang dari 8 digit
  }

  // Add your own Sign In validation logic here (e.g., check credentials against a database)

  // Clear input fields
  usernameInput.value = "";
  passwordInput.value = "";

  // Redirect to index.html after successful login

  return true; // Submit form jika semua input fields sudah diisi dan validasi berhasil
}

function profile() {
  window.location.href = '/profile'
}

const signInForm = document.getElementById("signin-form");
const signUpForm = document.getElementById("signup-form");

signInForm.addEventListener("submit", validateSignInForm);
signUpForm.addEventListener("submit", validateSignUpForm);

// Event listener untuk submit form Sign In
signInForm.addEventListener("submit", validateSignInForm);
signUpForm.addEventListener("submit", validateSignUpForm);
// pesan();