document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Dark/Light Mode Toggle
    const toggleSwitch = document.querySelector('.toggle-checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Contact Form Submission with Enhanced Validation
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = contactForm.elements['name'].value.trim();
        const email = contactForm.elements['email'].value.trim();
        const message = contactForm.elements['message'].value.trim();

        if (name && email && message) {
            alert('Form submitted successfully!');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Chatbot Functionality
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

    sendChatbotMessage.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user-message');
            chatbotInput.value = '';

            const botResponse = await getBotResponse(userMessage);
            addMessage(botResponse, 'bot-message');
        }
    }

    function addMessage(message, className) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = message;
        messageElement.classList.add(className);
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    async function getBotResponse(message) {
        // Simulate an AI-powered response (replace with actual API call)
        const response = await fetch('https://api.example.com/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        return data.reply;
    }

    // Voice Interaction for Chatbot (Advanced Feature)
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = function(event) {
            chatbotInput.value = event.results[0][0].transcript;
            sendMessage();
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error', event);
        };

        recognition.onend = function() {
            console.log('Speech recognition service disconnected');
        };

        document.getElementById('startVoiceRecognition').addEventListener('click', () => {
            recognition.start();
        });
    }

    // Text-to-Speech for Bot Responses
    function speak(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en-US';
        speechSynthesis.speak(speech);
    }

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
