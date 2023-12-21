const form = document.getElementById("form");
const useranme = document.getElementById("username");
const email = document.getElementById("email")
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message 
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

// show sucess outline 
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
    const re =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    }else {
        showError(input, "Email is not Valid")
    }
}

// Check require fields
 
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function(input) {
        if(input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required `);
            isRequired = true;
        }else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// Check input length
function checkLength(input, min, max){
    if(input.value.length < min) {
        showError(
            input, 
            `${getFieldName(input)} must be at least ${min} charcters`
        );
    }else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        )
    }else {
        showSuccess(input);
    }
}

// Check password match 
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Password do not match");
    }
}

// Get Fieldname 
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listners 
form.addEventListener("submit", function(e){
    e.preventDefault();

    if(checkRequired([useranme, email, password, password2])){
        checkLength(useranme, 3, 15);
        checkLength(password, 6, 25);
        checkEmail(email);
        checkPasswordsMatch(password, password2);
    }
}) 