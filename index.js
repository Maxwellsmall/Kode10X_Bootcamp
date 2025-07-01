function signUp() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("signPass").value.trim();
  const email = document.getElementById("email").value.trim();
  const fullname = document.getElementById("fullname").value.trim();

  if (!username || !password || !email || !fullname) {
    alert("Fill in all the fields");
    return;
  }

  const userData = {
    username: username,
    password: password,
    email: email,
    fullname: fullname,
  };

  localStorage.setItem("user", JSON.stringify(userData));
  alert("Sign up successful");

  setTimeout(() => {
    window.location.href = "./signin.html";
  }, 2000);
}

function login() {
  const username = document.getElementById("username").value.trim();

  const password = document.getElementById("loginPassword").value.trim();

  const saveToLocal = JSON.parse(localStorage.getItem("user"));
  console.log(saveToLocal);

  if (username === saveToLocal.username && password === saveToLocal.password) {
    alert("login successful");
  } else {
    alert("login fail");
  }
}

let message = JSON.parse(localStorage.getItem("message") || "[]");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const feed = document.getElementById("preview");
  const output = document.getElementById("output");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const feedInput = feed.value.trim();
      console.log("Works");

      if (feedInput) {
        message.unshift({ message: feedInput, replyans: null }); // Use 'message' property
        localStorage.setItem("message", JSON.stringify(message));
        form.reset();

        console.log("food");

        // Optionally, show messages here or redirect as needed
        // showMessage(output);
        window.location.href = "reply.html";
      }
    });
  }

  showMessage(output);
});

function showMessage(container) {
  if (!container) return;
  container.innerHTML = "";
  message.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "MessageList";
    div.innerHTML = `
      <p>${q.message}</p>
      <textarea id="usersInput${i}"></textarea>
      <button onclick="reply(${i})">Reply</button>
      ${q.replyans ? `<p><strong>Reply:</strong> ${q.replyans}</p>` : ""}
    `;
    container.appendChild(div);
  });
}
function reply(i) {
  const usersInput = document.getElementById("usersInput" + i);
  const replyValue = usersInput.value;
  if (replyValue.trim() === "") {
    return alert("can't send empty message");
  }
  message[i].replyans = replyValue;
  localStorage.setItem("message", JSON.stringify(message));
  alert("reply sent");
  showMessage(output);
}
document.addEventListener("DOMContentLoaded", function () {
  showMessage(output);
});

document.addEventListener("click", function () {
  const burgerOpen = document.getElementById("burgerOpen");
  const burgerMenu = document.getElementById("burgerMenu");
  const burgerClose = document.getElementById("burgerClose");

  burgerOpen.onclick = function () {
    burgerMenu.style.display = "block";
  };
  burgerClose.onclick = function () {
    burgerMenu.style.display = "none";
  };
});