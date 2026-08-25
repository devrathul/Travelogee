const formSignUpEl = document.getElementById("formSignUp");

const formSignInEl = document.getElementById("formSignIn");

let name_El = document.getElementById("txtName");
let email_El = document.getElementById("txtEmail");
let phone_El = document.getElementById("txtPhone");
let location_El = document.getElementById("txtLocation");
let password_El = document.getElementById("txtPassword");
let conPassword_El = document.getElementById("txtConPassword");

let errorName = document.getElementById("errorName");
let errorPhone = document.getElementById("errorPhone");
let errorEmail = document.getElementById("errorEmail");
let errorLocation = document.getElementById("errorLocation");
let errorPassword = document.getElementById("errorPassword");
let errorConPwd = document.getElementById("errorConPwd");
let errorMsg = document.getElementById("errorMsg");

let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regexPhone = /^\d{10}$/;
let onlyAlphabets = /^[A-Za-z\s]+$/;
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
let userList = [];

if (formSignUpEl) {
    formSignUpEl.addEventListener('submit', async (event) => {
        event.preventDefault();
        let isFormValid = true;
        let val = "";

        val = name_El.value.trim();
        if (val.length === 0) {
            errorName.innerText = 'Please enter name';
            isFormValid = false;
        } else {
            errorName.innerText = '';
        }

        val = email_El.value.trim();
        if (val.length === 0) {
            errorEmail.innerText = 'Please enter email';
            isFormValid = false;
        } else if (!(val.match(regexEmail))) {
            errorEmail.innerText = 'Invalid Email-ID'
            isFormValid = false;
        } else {
            errorEmail.innerText = '';
        }

        val = phone_El.value.trim();
        if (val.length === 0) {
            errorPhone.innerText = 'Please enter Phone#';
            isFormValid = false;
        } else if (!(val.match(regexPhone))) {
            errorPhone.innerText = 'Invalid Phone#';
            isFormValid = false;
        } else {
            errorPhone.innerText = '';
        }

        val = location_El.value;
        if (val.length === 0) {
            errorLocation.innerText = 'Please enter you location';
            isFormValid = false;
        } else if (!(onlyAlphabets.test(val))) {
            errorLocation.innerText = 'Text contain only alphabets';
            isFormValid = false;
        } else {
            errorLocation.innerText = '';
        }

        val = password_El.value.trim();
        if (val.length === 0) {
            errorPassword.innerText = 'Please enter password';
            isFormValid = false;
        } else if (!val.match(passwordRegex)) {
            errorPassword.innerText = 'Password should be at least 8 characters long with a mix of letters and numbers';
            isFormValid = false;
        }
        else {
            errorPassword.innerText = '';
        }

        val = conPassword_El.value.trim();
        if (val.length === 0) {
            errorConPwd.innerText = 'Please re-enter password';
            isFormValid = false;
        } else if (password_El.value.trim() != conPassword_El.value.trim()) {
            errorConPwd.innerText = 'Password not matched'
            isFormValid = false;
        }
        else {
            errorConPwd.innerText = '';
        }

        if (isFormValid) {
            const user = {
                fullname: name_El.value.trim(),
                email: email_El.value.trim(),
                phone: phone_El.value.trim(),
                location: location_El.value.trim(),
                password: password_El.value.trim()
            };

            const isUserAdded = await register_user(user);

            if (isUserAdded === true) {
                window.location.href = "signin.html";
            }
        }
    });

}

if (formSignInEl) {
    formSignInEl.addEventListener('submit', async (event) => {
        event.preventDefault();

        let emailval = formSignInEl["txtEmail"].value.trim();
        let pwdval = formSignInEl["txtLoginPassword"].value.trim();

        const user = await isValidUser(emailval, pwdval);
        if(user.length === 0){
            errorMsg.innerText = "Invalid User Name and Password"
        }else{
            window.location.href = "home.html";
        }
    });
}



let register_user = async (user) => {
    try {
        const response = await fetch("https://6a79f5b2674f43f4db1201ec.mockapi.io/contacts/registerdetail", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {           
            return true;
        }else{
            return false;
        }
        
    } catch (error) {
        console.error("Error:", error);
    }
}

let isValidUser = async (emailval, pwdval) => {
    try {
        const response = await fetch("https://6a79f5b2674f43f4db1201ec.mockapi.io/contacts/registerdetail");

        if (response.ok) {
            const data = await response.json();

            const user = data.find(user => user.email === emailval && user.password === pwdval);
            return user;
        }

        return [];

    } catch (error) {
        console.error("Error:", error);
    }
}

if (name_El) {
    name_El.addEventListener('input', (event) => {
        let val = event.target.value;
        if (val.trim() === "") {
            errorName.innerText = 'Please enter name'
        } else {
            errorName.innerText = ''
        }
    });
}

if (email_El) {
    email_El.addEventListener('input', (event) => {
        let val = event.target.value;
        if (val.trim() === "") {
            errorEmail.innerText = 'Please enter email'
        } else if (!(val.match(regexEmail))) {
            errorEmail.innerText = 'Invalid Email-ID'
        } else {
            errorEmail.innerText = '';
        }
    });
}

if (phone_El) {
    phone_El.addEventListener('input', (event) => {
        let val = event.target.value;
        if (val.trim() === "") {
            errorPhone.innerText = 'Please enter Phone#';
        } else if (!(val.match(regexPhone))) {
            errorPhone.innerText = 'Invalid Phone#';
        } else {
            errorPhone.innerText = '';
        }
    });
}

if (location_El) {
    location_El.addEventListener('input', (event) => {
        let val = event.target.value;
        if (val.trim() === "") {
            errorLocation.innerText = 'Please enter city'
        } else if (!(onlyAlphabets.test(val))) {
            errorLocation.innerText = 'Text contain only alphabets';
        } else {
            errorLocation.innerText = '';
        }
    });
}

if (password_El) {
    password_El.addEventListener('input', (event) => {
        let val = event.target.value;
        if (val.trim() === "") {
            errorPassword.innerText = 'Please enter password!'
        } else if (!val.match(passwordRegex)) {
            errorPassword.innerText = 'Password should be at least 8 characters long with a mix of letters and numbers';
        }
        else {
            errorPassword.innerText = '';
        }
    });
}

if (conPassword_El) {
    conPassword_El.addEventListener('input', (event) => {
        let val = event.target.value;
        if (val.trim() === "") {
            errorConPwd.innerText = 'Please enter Confirm Password!'
        } else if (password_El.value.trim() != conPassword_El.value.trim()) {
            errorConPwd.innerText = 'Password not matched'
        }
        else {
            errorConPwd.innerText = '';
        }
    });
}