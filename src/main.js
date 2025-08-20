function initCountdown() {
  const weddingDate = new Date("2025-10-11T10:00:00").getTime()

  function updateCountdown() {
    const now = new Date().getTime()
    const distance = weddingDate - now;

    const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(distance / (1000 * 60 * 60 * 24) % 30);
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
  }

  updateCountdown()
  setInterval(updateCountdown, 1000)
}

function initGlide() {
  new Glide('.glider-masculino', {
    type: 'carousel',
    perView: 1,
    focusAt: 'center',
    autoplay: 3000
  }).mount();

  new Glide('.glider-feminino', {
    type: 'carousel',
    perView: 1,
    focusAt: 'center',
    autoplay: 3000
  }).mount();
}

function initMessageForm() {
  const form = document.getElementById("messageForm")
  const messagesList = document.getElementById("messagesList")

  // Load existing messages from localStorage
  loadMessages()

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    if (name && message) {
      const messageData = {
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleDateString("pt-BR"),
      }

      saveMessage(messageData)
      displayMessage(messageData)
      form.reset()

      // Show success message
      alert("Mensagem enviada com sucesso! Obrigado pelo carinho! ❤️")
    }
  })

  function saveMessage(messageData) {
    const messages = JSON.parse(localStorage.getItem("weddingMessages") || "[]")
    messages.unshift(messageData)
    localStorage.setItem("weddingMessages", JSON.stringify(messages))
  }

  function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("weddingMessages") || "[]")
    messages.forEach((message) => displayMessage(message))
  }

  function displayMessage(messageData) {
    const messageElement = document.createElement("div")
    messageElement.classList.add("message-item")
    messageElement.innerHTML = `
      <div class="message-header">
        <span class="message-name">${messageData.name}</span>
        <span class="message-date">${messageData.date}</span>
      </div>
      <div class="message-text">${messageData.message}</div>
    `

    messagesList.insertBefore(messageElement, messagesList.firstChild)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initCountdown();
  initMessageForm();
  initGlide();
})
