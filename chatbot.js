;(function () {
  // Select elements
  const chatbotContainer = document.querySelector(".chatbot-container")
  const chatbotMessages = document.querySelector(".chatbot-messages")
  const chatbotInput = document.querySelector(".chatbot-input-field")
  const chatbotSend = document.querySelector(".chatbot-send")

  const chatHistory = [] // Initialize an array to store previous messages

  // Send message to chatbot
  chatbotSend.addEventListener("click", () => {
    const messageText = chatbotInput.value
    addMessage("user", messageText)
    chatbotInput.value = ""
    const payload = {
      model: "gpt-3.5-turbo",
      messages: chatHistory,
    }

    // Make the API call with the payload
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const message = data.choices[0].message.content
        addMessage("assistant", message)
      })
      .catch((error) => console.error(error))
  })

  // Add message to chatbot messages list
  function addMessage(sender, message) {
    const messageClass = sender === "user" ? "chatbot-user" : "chatbot-response"
    const messageElement = document.createElement("div")
    messageElement.className = `chatbot-message ${messageClass}`
    messageElement.innerHTML =
      sender === "user" ? message : processMarkdown(message)
    chatbotMessages.appendChild(messageElement)
    chatHistory.push({ role: sender, content: message }) // Add the message to chat history
  }

  function processMarkdown(str) {
    const converter = new showdown.Converter()
    return converter.makeHtml(str)
  }
})()
