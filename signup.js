const myForm = document.getElementById("register");
const validUsername = document.getElementById("valid_username");
const validPassword = document.getElementById("valid_password");
const validEmail = document.getElementById("valid_email");
myForm.onsubmit = function(e){
    e.preventDefault();
}
//Phải để sau click mới lấy được thông tin
const username = document.querySelector(".input-signup-username");
const password = document.querySelector(".input-signup-password");
const confirm_password = document.querySelector(".input-confirm-password");
const email = document.querySelector(".input-signup-email");
const handleCurrentUser = (data) => {
    localStorage.setItem("currentUser", JSON.stringify(data));
}
function valid(username, password, email) { // check xem có nhập đúng số lượng username và password && email không
    let status1 = false;
    let status2 = false;
    let status3 = false;
    if (!password.value) {
        console.log(1);
        validPassword.innerText = "Vui lòng nhập mật khẩu";
        setTimeout(() => {
            validPassword.innerText = "";
        }, 3000)
        password.focus();
    }
    else if (password.value.trim().length < 8) {
        validPassword.innerText = "password phải có ít nhất 8 ký tự";
        setTimeout(() => {
            validPassword.innerText = "";
        }, 3000)
        password.focus();
    }
    else {
        //Done
        validPassword.innerText = "";
        status2 = true;
    }
    if (!email.value) {
        console.log(2);
        validEmail.innerText = "Vui lòng nhập Email";
        setTimeout(() => {
            validEmail.innerText = "";
        }, 3000)
        email.focus();
    }
    else if(!validateEmail(email.value)) {
        validEmail.innerText = "Email không đúng định dạng";
        setTimeout(() => {
            validEmail.innerText = "";
        }, 3000)
        email.focus();
    }
    else {
        //Done
        validEmail.innerText = "";
        status3 = true;
    }
    if (!username.value) {
        console.log(3);
        validUsername.innerText = "Vui lòng nhập tên đăng nhập!";
        setTimeout(() => {
            validUsername.innerText = "";
        }, 3000)
        username.focus();
    }
    else if (username.value.trim().length < 8) {
        validUsername.innerText = "username phải có ít nhất 8 ký tự";
        setTimeout(() => {
            validUsername.innerText = "";
        }, 3000)
        username.focus();
    }
    else {
        //Done
        validUsername.innerText = "";
        status1 = true;
    }
    return status1 && status2 && status3;
}
function send() {
    if (valid(username, password, email)) {
        const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];// 'users' name of key on localstorage
        const existingUser = users.some(user => user.username === username.value);
        const existingEmail = users.some(user => user.email === email.value); // quên .value fix mất 1 tiếng
        if (existingUser) {
            validUsername.innerText = "Username đã được sử dụng. Tôi đoán những bộ óc vĩ đại thực sự có suy nghĩ giống nhau.";
            setTimeout(() => {
                validUsername.innerText = "";
            }, 3000)
            username.focus();
        }
        if(existingEmail){
            validEmail.innerText = "Email đã được sử dụng";
            setTimeout(() => {
                validEmail.innerText = "";
            }, 3000)
            email.focus();
        }
        if (confirm_password.value != password.value) {
            validPassword.innerText = "Sai mật khẩu vui lòng nhập lại";
            setTimeout(() => {
                validPassword.innerText = "";
            }, 3000)
            confirm_password.focus();
        }
        else if (!existingUser && !existingEmail) {
            // Done: Gửi(lưu) dữ liệu của người dùng
            const user = {
                username: username.value,
                password: password.value,
                email: email.value
            }
            users.push(user);
            handleCurrentUser(user);
            localStorage.setItem('users', JSON.stringify(users));
            alert("Đăng ký thành công");
            setTimeout(() => {
                window.location.href = "/index.html";
            }, 2000)
        }
    }
}
const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };