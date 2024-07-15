// Function to set the theme based on the user's color scheme preference
function setThemeBasedOnPreference(prefersDarkScheme) {
  if (prefersDarkScheme) {
    document.querySelector("html").setAttribute("data-theme", "halloween");
  } else {
    document.querySelector("html").setAttribute("data-theme", "fantasy");
  }
}

// Set the initial theme based on the current preference
setThemeBasedOnPreference(window.matchMedia("(prefers-color-scheme: dark)").matches);

// Add an event listener to respond to changes in the color scheme preference
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches }) => {
  setThemeBasedOnPreference(matches);
});

if(location.href === "/login" || location.href === "/signup"){
  document.querySelector("#showPassword").addEventListener("change", () => {
    const elem = document.getElementById("password");
    if (elem.type === "password") {
      elem.type = "text";
    } else {
      elem.type = "password";
    }
  });  
}