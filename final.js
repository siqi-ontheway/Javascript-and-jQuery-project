let divReg;
let divMain;
//Global variables to represent if related inputs satisfied the requirement
let statusLogin = false;
let statusPassword = false;
let statusConfirm = false;
let statusEmail = false;

function fHandleEnter(e) {
    e.target.style.backgroundColor = "yellow";
}

function fHandleExit(e) {
    e.target.style.backgroundColor = "white";

}
//This function will be used to hide the form when the user clicks
// on the button Register and to slowly display the divRegistered
// element using jQuery with some text in it.
function fProcessForm() {

    let strQueryString = location.search;
    strQueryString = strQueryString.replace(/^.*?\=/,'');
    if (strQueryString.length > 0) {
        //Create a variable named login and assign it the querystring after the equal sign.
        let login = decodeURIComponent(strQueryString);
        //Using the variable divReg assign the following string to the inner HTML property of divReg: Thank you, {login variable} , you are now registered
        divReg.innerHTML = "Thank you, " + login+", you are now registered."
        //Then hide the divMain by setting the display style property to none. Use the jQuery method fadeIn on the divRegistered element to slowly show this element. Use any numbers of seconds.
        divMain.style.display = "none";
        $(document).ready(function () {
            $("#divRegistered").fadeIn(3000);
        });
    } else {
        //If the length is 0, then the form was initially loaded.
        divReg.style.display = "none";
        divMain.style.display = "block";
    }
}
//Compare input of two input elements (Password, Email)
//value1:The first value to be compared
//value2:The second value to be compared against the first
//display: The span element to display a message whether the two entries match or not
function fCompareInput (value1, value2, display){
    //Check whether one of the values parameter is empty (length ==0),
    // if so, set the inner HTML and the style attribute of the display parameter to an empty string.
    if (value1.length == 0 && value2.length == 0) {
        display.innerHTML = "";
    } else if (value1.value == value2.value) {
        //Check whether both values are exactly the same,
        // if so, set the inner HTML attribute to ‘Entries match’ and set the background color to green.
        display.innerHTML = "Entries Match";
        display.style.backgroundColor = "green";
        statusConfirm = true;

    } else {
        //If the values are not empty and do not equal,
        // set the inner HTML attribute to ‘Entries do not match’ and the background color to red.
        display.innerHTML = "Entries do not match";
        display.style.backgroundColor = "red";
        statusConfirm = false;
    }

}

function fLoginInput(inputElement, spanElement) {
    let count = inputElement.value.length;
    let temp1 = false;
    let temp2 = false;
    // Show the number of characters entered.
    spanElement.innerHTML = "<span id = 'count' > Count of Characters = " + count.toString() + "</span>" +"<br>" + "<span id = 'action'></span>" + "<br>" +
        "Your username can only contain alphanumeric and the underscore.";
    let spnCount = document.getElementById("count")
    // Enforce a minimum and maximum length for the login username.
    // Use the input event (triggered for every keystroke) and display the current length in span element next to the input element.
    if (count < 6) {
        // Choose a red and green background color in the span element to visually convey to the user whether the length is good or not.
        spnCount.style.backgroundColor = "red";
        document.getElementById("action").innerText = "Please make it longer. Must be between six and 50 characters long.";
        document.getElementById("action").style.backgroundColor = "red";
        temp1 = false;

    } else if (count > 20) {
        // Choose a red and green background color in the span element to visually convey to the user whether the length is good or not.
        spnCount.style.backgroundColor = "red";
        document.getElementById("action").innerText = "Please make it shorter. Must be between six and 50 characters long.";
        document.getElementById("action").style.backgroundColor = "red";
        temp1 = false;

    } else {
        // Choose a red and green background color in the span element to visually convey to the user whether the length is good or not.
        spnCount.style.backgroundColor = "green";
        document.getElementById("action").innerText = "Username length is good";
        document.getElementById("action").style.backgroundColor = "green";
        temp1 = true;

    }
    // Enforce that only certain characters are used, such as alphanumeric and the underscore.
    // Use the input event for tracking what the user entered.
    // Use regular expression functionality to verify the characters entered.
    let pattern =  /^[a-zA-Z0-9_]*$/;
    if(pattern.test(inputElement.value)) {
        spanElement.style.backgroundColor = "green";
        temp2 = true;
    } else {
        spanElement.style.backgroundColor = "red";
        temp2 = false;
    }
    statusLogin = temp1 && temp2;

}

function fPasswordInput(inputElement, spanElement) {
    // Enforce a password complexity rule: at least one uppercase letter, one numeric character, one special character
    // Use regular expression for this verification.
    spanElement.innerHTML = "<span id = 'status' ></span>" +"<br>" +"Your password should contain at least 8 characters, including at least one number and includes both lower and uppercase letters and special characters, for example #, ?, !.";
    let strong =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let mid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let passwordStatus = document.getElementById("status");
    // Display the status of the password complexity in the span element next to the password input.
    // Use different background colors for visually showing the password complexity (weak, medium, strong, very strong)
    if (inputElement.value.length < 8) {
        passwordStatus.innerHTML = "Your password is weak."
        spanElement.style.backgroundColor = "red"
        statusPassword = false;
        passwordStatus.style.backgroundColor = "red";
    } else {
        passwordStatus.innerHTML = "Your password is medium."
        spanElement.style.backgroundColor = "orange";
        statusPassword = true;
        passwordStatus.style.backgroundColor = "orange";
    }
    if(mid.test(inputElement.value)) {
        spanElement.style.backgroundColor = "silver";
        passwordStatus.innerHTML = "Your password is strong."
        statusPassword = true;
        passwordStatus.style.backgroundColor = "silver";
    }
    if(strong.test(inputElement.value)) {
        spanElement.style.backgroundColor = "green";
        statusPassword = true;
        passwordStatus.innerHTML = "Your password is very strong.";
        passwordStatus.style.backgroundColor = "green";
    }
}

// Verify the validity of the e-mail address.


function fEmailInput(inputElement, spanElement) {
    // Use regular expression functionality.
    let address = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (address.test(inputElement.value)) {
        // Use the span element next to the e-mail input to display whether the e-mail is valid or invalid.
        spanElement.innerHTML = "Your email is valid."
        spanElement.style.backgroundColor = "green";
       statusEmail = true;
    } else {
        // Use the span element next to the e-mail input to display whether the e-mail is valid or invalid.
        spanElement.innerHTML = "Your email is NOT valid."
        spanElement.style.backgroundColor = "red";
        statusEmail = false;
    }
}
//Disable the Register button when any of the fields are not filled in correctly.
//Enable the Register button when all fields have been filled in correctly.
function fRegister() {
    $("input").blur(function() {

        if (statusEmail && statusPassword && statusConfirm && statusLogin) {
            $('#btnRegister').removeAttr('disabled');
        } else {
            $('#btnRegister').attr('disabled', 'disabled');
        }
    });
}

window.addEventListener("DOMContentLoaded",function () {
    divReg = document.getElementById("divRegistered");
    divMain = document.getElementById("divMain");
    divMain.addEventListener('focus', function(event){fHandleEnter(event)}, true);
    divMain.addEventListener('blur', function(event){fHandleExit(event)}, true);
    fProcessForm();
    let inputElements = document.querySelectorAll("input[type='text'], input[type='password']");
    let spanElements = document.querySelectorAll("span");
    // for (let i = 0; i < inputElements.length; i++) {
    //  alert(inputElements[i]);
    // }
    //Here I could follow the project guidelines and set the event to be blur, but I use
    //input event here for better performance.
    inputElements[2].addEventListener("input",function() {fCompareInput(inputElements[1],inputElements[2],spanElements[2])});
    inputElements[4].addEventListener("input",function() {fCompareInput(inputElements[3],inputElements[4],spanElements[4])});
    //Enforce length check and characters check for login.
    inputElements[0].addEventListener("input",function(){fLoginInput(inputElements[0],spanElements[0])});
    inputElements[1].addEventListener("input",function(){fPasswordInput(inputElements[1],spanElements[1])});
    inputElements[3].addEventListener("input",function(){fEmailInput(inputElements[3],spanElements[3])});
    fRegister();
});


