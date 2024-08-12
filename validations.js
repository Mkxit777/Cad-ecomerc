function login() {
    showLoading();

    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then((userCredential) => {
        const user = userCredential.user;
        
        if (user.emailVerified) {
            hideLoading();
            window.location.href = "index.html";
        } else {
            hideLoading();
            alert('Por favor, verifique seu e-mail antes de fazer login.');
            firebase.auth().signOut();  // Desconectar o usuário não verificado
        }
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}
