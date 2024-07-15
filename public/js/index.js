window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches }) => {
    if (matches) {
      document.querySelector("html").setAttribute("data-theme", "halloween");
    } else {
      document.querySelector("html").setAttribute("data-theme", "fantasy");
    }
  });

document.querySelector("#showPassword").addEventListener("change", () => {
  const elem = document.getElementById("password");
  if (elem.type === "password") {
    elem.type = "text";
  } else {
    elem.type = "password";
  }
});
