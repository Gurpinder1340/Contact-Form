document.getElementById("Contact-Form").add.onsubmit = () => {

    clearErrors();

    let isValid = true;

    // Validate first name
    let fname = document.getElementById("fname").value.trim();
    if (!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    // Validate last name
    let lname = document.getElementById("lname").value.trim();
    if (!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    // Validate LinkedIn URL
    let linkedin = document.getElementById("linkedin").value.trim();
    let linkedinPrefix = "https://linkedin.com/in/";
    if (linkedin && !linkedin.startsWith(linkedinPrefix)) {
        document.getElementById("err-linkedin").style.display = "block";
        isValid = false;
    }

    // Validate email
    let email = document.getElementById("email").value.trim();
    let mailingListChecked = document.getElementById("mailingList").checked;

    if (mailingListChecked) {
        
        if (!email) {
            document.getElementById("err-email").textContent =
                "Email is required to join the mailing list!";
            document.getElementById("err-email").style.display = "block";
            isValid = false;
        } else if (!email.includes("@") || !email.includes(".")) {
            document.getElementById("err-email").textContent =
                "Please enter a valid email address!";
            document.getElementById("err-email").style.display = "block";
            isValid = false;
        } 
    } else {
        // Email optional
        if (email && (!email.includes("@") || !email.includes("."))) {
            document.getElementById("err-email").textContent =
                "Please enter a valid email address!";
            document.getElementById("err-email").style.display = "block";
            isValid = false;
        }
    }

    // Validate "How we met"
    let how = document.getElementById("meet").value;
    if (!how) {
        document.getElementById("err-meet").style.display = "block";
        isValid = false;
    }

    return isValid;
}

// Function to clear all errors
function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}
