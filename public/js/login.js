//stop the browser from submitting the form so we can use JavaScript using async promises
const loginHandler = async (event) => {
    event.preventDefault();
}
//Gather the data from the form elements on the page
const emailLogin = document.querySelector('#email-login');
const passwordLogin = document.querySelector('#password-login');
//send the email and password to the server using fetch and a conditional
if (emailLogin && passwordLogin) {
    const getResponse = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({emailLogin, passwordLogin}),
        headers: {'Content-Type': 'application/json'},
    });
}
//use a .queryselector for login form
//use a .addEventListener to submit 