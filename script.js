document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
        }
    });

    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = contactForm.elements['name'].value;
        const email = contactForm.elements['email'].value;
        const message = contactForm.elements['message'].value;

        if (name && email && message) {
            alert('Form submitted successfully!');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendChatbotMessage = document.getElementById('sendChatbotMessage');
    const chatbotMessages = document.getElementById('chatbotMessages');

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('show');
    });

    closeChatbot.addEventListener('click', () => {
        chatbotContainer.classList.remove('show');
    });

    sendChatbotMessage.addEventListener('click', () => {
        const userMessage = chatbotInput.value;
        if (userMessage) {
            const messageElement = document.createElement('div');
            messageElement.textContent = userMessage;
            messageElement.classList.add('user-message');
            chatbotMessages.appendChild(messageElement);
            chatbotInput.value = '';

            // Simulate chatbot response
            setTimeout(() => {
                const botMessageElement = document.createElement('div');
                botMessageElement.textContent = 'Hello! How can I assist you today?';
                botMessageElement.classList.add('bot-message');
                chatbotMessages.appendChild(botMessageElement);
            }, 1000);
        }
    });

    // Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(() => {
                console.log('Service Worker registered successfully.');
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    }
});
