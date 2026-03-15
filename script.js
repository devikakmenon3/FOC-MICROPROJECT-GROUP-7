// Toggle Sidebar with Arrow
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    
    sidebar.classList.toggle('show');
    hamburger.classList.toggle('active');
}

// Toggle Menu Items
function toggleMenu(event, menuId) {
    event.preventDefault();
    const menu = document.getElementById(menuId);
    menu.classList.toggle('show');
}

// Scroll to Section
function scrollToSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('show');
        const hamburger = document.getElementById('hamburger');
        hamburger.classList.remove('active');
    }
}

// Toggle Card Expansion
function toggleCard(header) {
    const card = header.closest('.card-box');
    const body = card.querySelector('.card-body');
    const icon = header.querySelector('i');
    
    body.style.display = body.style.display === 'none' ? 'block' : 'none';
    icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Initialize cards - COLLAPSE by default
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-box');
    cards.forEach(card => {
        const body = card.querySelector('.card-body');
        body.style.display = 'none';
        const icon = card.querySelector('.card-header i');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

// Unicode Converter
function convertChar() {
    const input = document.getElementById('charInput').value;
    const resultDiv = document.getElementById('charResult');
    
    if (!input) {
        resultDiv.innerHTML = '<p style="color: #f44336;">Please enter a character!</p>';
        return;
    }

    const char = input[0];
    const code = char.charCodeAt(0);
    const hex = code.toString(16).toUpperCase().padStart(4, '0');
    const binary = code.toString(2).padStart(8, '0');

    resultDiv.innerHTML = `
        <div><strong>Character:</strong> ${char}</div>
        <div><strong>Unicode:</strong> U+${hex}</div>
        <div><strong>Decimal:</strong> ${code}</div>
        <div><strong>Binary:</strong> ${binary}</div>
    `;
}

// Text Encoder
function encodeText() {
    const input = document.getElementById('textInput').value;
    const resultDiv = document.getElementById('textResult');
    
    if (!input) {
        resultDiv.innerHTML = '<p style="color: #f44336;">Please enter some text!</p>';
        return;
    }

    const utf8 = [];
    for (let i = 0; i < input.length; i++) {
        const code = input.charCodeAt(i);
        utf8.push('0x' + code.toString(16).toUpperCase().padStart(2, '0'));
    }

    resultDiv.innerHTML = `
        <div><strong>Text:</strong> ${input}</div>
        <div><strong>UTF-8 Bytes:</strong> ${utf8.join(', ')}</div>
        <div><strong>Character Count:</strong> ${input.length}</div>
    `;
}

// Quiz Submission
function submitQuiz() {
    let score = 0;
    
    // Question 1 - Correct answer: Input/Output (first option)
    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1) {
        const q1Options = document.querySelectorAll('input[name="q1"]');
        if (q1 === q1Options[0]) {
            score += 1;
        }
    }
    
    // Question 2 - Correct answer: UTF-8 (second option)
    const q2 = document.querySelector('input[name="q2"]:checked');
    if (q2) {
        const q2Options = document.querySelectorAll('input[name="q2"]');
        if (q2 === q2Options[1]) {
            score += 1;
        }
    }
    
    // Question 3 - Correct answer: Client-Server (second option)
    const q3 = document.querySelector('input[name="q3"]:checked');
    if (q3) {
        const q3Options = document.querySelectorAll('input[name="q3"]');
        if (q3 === q3Options[1]) {
            score += 1;
        }
    }
    
    // Show result
    let message = '';
    if (score === 3) {
        message = '🌟 Perfect! Excellent work!';
    } else if (score === 2) {
        message = '👍 Good job! Keep learning!';
    } else if (score === 1) {
        message = '📚 Not bad! Study more topics!';
    } else {
        message = '💪 Keep practicing!';
    }
    
    alert(`Quiz Complete!\n\nYou scored: ${score}/3\n\n${message}`);
}

// Allow Enter key in tools
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (document.activeElement.id === 'charInput') {
            convertChar();
        } else if (document.activeElement.id === 'textInput') {
            encodeText();
        }
    }
});

// Theme Toggle (Dark Mode)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeButton = document.querySelector('.theme-toggle');
    const icon = themeButton.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}