// const axios = require('axios/dist/browser/axios.cjs');

document.querySelector("#signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {};
  userData.name = document.querySelector("#name").value;
  userData.email = document.querySelector("#email").value;
  userData.password = document.querySelector("#password").value;

  // const formData = new FormData(document.querySelector("#signupForm"));
  // console.log(formData.entries());
  console.log(userData);
  axios.post("/signup", userData).then((res) => {
    if(res.status === 200){
      document.querySelector("#messageBox").innerHTML = `${res.data.message}. You will be redirected to <a href="/login">login</>`;
      setTimeout(function() {
        location.href = "/login";
      }, 3000);
    } else {
      document.querySelector("#errorBox").textContent = res.data.message;
    }
  });
});
