const btnLogin = document.querySelector(".login__signInButton");
const validAccount = document.getElementById("valid_account");
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    const inputEmail = document.querySelector(".input-signup-email");
    const inputPassword = document.querySelector(".input-login-password");
    if (!inputEmail.value) {
        validAccount.innerText = "Vui lòng nhập Email";
        setTimeout(() => {
            validAccount.innerText = "";
        }, 3000)
        inputEmail.focus();
    }
    else if(!validateEmail(inputEmail.value)) {
        validAccount.innerText = "Email không đúng định dạng";
        setTimeout(() => {
            validAccount.innerText = "";
        }, 3000)
        inputEmail.focus();
    }
    else {
        if (!inputPassword.value) {
            validAccount.innerText = "Vui lòng nhập mật khẩu";
            setTimeout(() => {
                validAccount.innerText = "";
            }, 3000)
            inputPassword.focus();
        }
        else if (inputPassword.value.trim().length < 8) {
            validAccount.innerText = "password phải có ít nhất 8 ký tự";
            setTimeout(() => {
                validAccount.innerText = "";
            }, 3000)
            inputPassword.focus();
        }
        else {
            //Done
            validAccount.innerText = "";
            console.log("Đã nhập đúng định dạng");
                const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []; //lấy mảng users
                if (users) {
                    const user_check = users.some(user => user.email === inputEmail.value && user.password === inputPassword.value);
                    if (user_check) {
                        alert("Đăng Nhập Thành Công");
                        handleCurrentUse(user_check);
                        window.location.href = "index.html";
                    }
                    else {
                        validAccount.innerText = "Email hoặc Mật khẩu sai!";
                        setTimeout(() => {
                            validAccount.innerText = "";
                        }, 3000)
                    }
                }
                else {
                    validAccount.innerText = "Email hoặc Mật khẩu sai!";
                    setTimeout(() => {
                        validAccount.innerText = "";
                    }, 3000)
                }
        }
    }
});
const handleCurrentUser = (data) => {
    localStorage.setItem("currentUser", JSON.stringify(data));
}
const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };