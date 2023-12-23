const openaiApiKey = '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'; // Reemplaza con tu API Key de OpenAI
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const chatIcon = document.querySelector('.chat-icon');
let isOpen = false;

// Función para enviar mensajes al chatbot de OpenAI
async function sendMessageToOpenAI() {
    const userMessage = userInput.value;
    chatBox.innerHTML += `<div class="user-message">${userMessage}</div>`;
    userInput.value = ''; // Limpiar el input

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 100
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].text.trim();
        chatBox.innerHTML += `<div class="bot-message">${botMessage}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Desplazar hacia abajo para ver la respuesta
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para mostrar u ocultar el chat
function toggleChat() {
    isOpen = !isOpen;
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.style.display = isOpen ? 'block' : 'none';
}

chatIcon.addEventListener('click', toggleChat);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessageToOpenAI();
    }
});

async function sendMessageToOpenAI() {
    const userMessage = userInput.value;
    chatBox.innerHTML += `<div class="user-message">${userMessage}</div>`;
    userInput.value = '';

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 100
            })
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        const botMessage = data.choices[0].text.trim();
        chatBox.innerHTML += `<div class="bot-message">${botMessage}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        chatBox.innerHTML += `<div class="bot-message">Lo siento, ha ocurrido un error.</div>`;
    }
}
