function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        
        // Enviar e-mail de verificação
        user.sendEmailVerification().then(() => {
            hideLoading();
            alert('Verificação enviada. Verifique seu e-mail para ativar sua conta.');
            window.location.href = "../index.html";
        }).catch((error) => {
            hideLoading();
            alert(getErrorMessage(error));
        });
    })
    .catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}
