console.log("Button script loaded");

function showMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.style.position = "fixed";
  messageDiv.style.bottom = "50px";
  messageDiv.style.left = "10px";
  messageDiv.style.backgroundColor = "orange";
  messageDiv.style.color = "white";
  messageDiv.style.padding = "5px 10px";
  messageDiv.style.borderRadius = "5px";
  messageDiv.style.zIndex = "1";
  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.remove();
  }, 1000);
}

function createButton() {
  const button = document.createElement("button");
  button.textContent = "Click Me!";
  button.style.position = "fixed";
  button.style.bottom = "10px";
  button.style.left = "10px";
  button.style.color = "white";
  button.style.backgroundColor = "skyblue";
  button.style.padding = "5px 10px";
  button.style.borderRadius = "5px";
  button.style.zIndex = "1";
  document.body.appendChild(button);

  button.onclick = () => {
    console.log("Button was clicked!");
    showMessage("Button Clicked!");
  };
}

window.createButton = createButton;
