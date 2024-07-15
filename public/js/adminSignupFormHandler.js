document.querySelector("#signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {};
  userData.name = document.querySelector("#name").value;
  userData.email = document.querySelector("#email").value;
  userData.password = document.querySelector("#password").value;

  axios.post("/admin/signup", userData).then((res) => {
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
