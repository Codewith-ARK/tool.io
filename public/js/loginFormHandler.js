document.querySelector("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {};
  userData.email = document.querySelector("#email").value;
  userData.password = document.querySelector("#password").value;

  axios
    .post("/login", userData)
    .then((res) => {
      if (res.status === 200) {
        document.querySelector(
          "#messageBox"
        ).innerHTML = `${res.data.message} You will be redirected to <a class="link" href="/home">Home</>`;
        setTimeout(function () {
          location.href = "/app";
        }, 3000);
      }
    })
    .catch((err) => {
      if (err.response) {
        document.querySelector("#errorBox").innerHTML =
          err.response.data.message;
      } else if (err.request) {
        // The request was made but no response was received
        console.log(err.request);
        document.querySelector("#errorBox").innerHTML =
          "No response received from server.";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", err.message);
        document.querySelector("#errorBox").innerHTML = "Error: " + err.message;
      }
    });
});
