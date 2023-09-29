// Any combination of characters, an @ symbol, followed by 2 - 3 characters
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const validateEmail = (email) => {
    if(email.length < 1)
        return [false, "An email is required"];
    if(!emailRegex.test(email))
        return [false, "Email failed regular expression match"];

    return [true, ""]
}

export const validatePassword = (password) => {
    if(password.length < 1)
        return [false, "A password is required"];
    if(password.length < 5)
        return [false, "Password must contain at least 5 letters"];

    return [true, ""]
}