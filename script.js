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
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const themeButton = document.querySelector('.theme-toggle');
    const icon = themeButton.querySelector('i');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark-mode');
        icon.classList.add('fa-moon');
        icon.classList.remove('fa-sun');
    }
    
    const cards = document.querySelectorAll('.card-box');
    cards.forEach(card => {
        const body = card.querySelector('.card-body');
        body.style.display = 'none';
        const cardIcon = card.querySelector('.card-header i');
        if (cardIcon && !cardIcon.classList.contains('fa-moon') && !cardIcon.classList.contains('fa-sun')) {
            cardIcon.style.transform = 'rotate(0deg)';
        }
    });

    // Initialize feedback system
    initializeFeedbackSystem();
    loadFeedbackStats();
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

// Theme Toggle (Dark Mode) with localStorage persistence
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeButton = document.querySelector('.theme-toggle');
    const icon = themeButton.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// ================================
// FEEDBACK SYSTEM (LOCAL ONLY)
// ================================

function initializeFeedbackSystem() {
    const stars = document.querySelectorAll('.star');
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const charCount = document.getElementById('charCount');

    // Star rating functionality
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const ratingValue = this.getAttribute('data-value');
            document.getElementById('ratingValue').value = ratingValue;
            
            // Update stars display
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= ratingValue) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });

            // Update rating text
            const ratingTexts = {
                1: '😞 Poor',
                2: '😐 Fair',
                3: '😊 Good',
                4: '😄 Very Good',
                5: '🤩 Excellent'
            };
            document.getElementById('ratingText').textContent = ratingTexts[ratingValue];
        });

        // Hover effect
        star.addEventListener('mouseover', function() {
            const hoverValue = this.getAttribute('data-value');
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= hoverValue) {
                    s.style.color = '#FFB3D9';
                } else {
                    s.style.color = document.body.classList.contains('dark-mode') ? '#5a4f6d' : '#ddd';
                }
            });
        });
    });

    // Mouse leave event for stars
    document.getElementById('starRating').addEventListener('mouseleave', function() {
        const currentRating = document.getElementById('ratingValue').value;
        stars.forEach(s => {
            if (s.getAttribute('data-value') <= currentRating && currentRating > 0) {
                s.style.color = '#FFB3D9';
            } else {
                s.style.color = document.body.classList.contains('dark-mode') ? '#5a4f6d' : '#ddd';
            }
        });
    });

    // Character counter for textarea
    feedbackMessage.addEventListener('input', function() {
        charCount.textContent = this.value.length;
        if (this.value.length > 500) {
            this.value = this.value.substring(0, 500);
            charCount.textContent = '500';
        }
    });

    // Form submission handler (LOCAL STORAGE ONLY)
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const rating = document.getElementById('ratingValue').value;
        if (rating === '0' || rating === '') {
            alert('Please select a star rating!');
            return;
        }

        const category = document.getElementById('category').value;
        if (!category) {
            alert('Please select a feedback category!');
            return;
        }

        const message = document.getElementById('feedbackMessage').value;
        if (!message.trim()) {
            alert('Please enter your feedback!');
            return;
        }

        const email = document.getElementById('feedbackEmail').value;
        const timestamp = new Date().toLocaleString();

        // Collect feedback data
        const feedbackData = {
            rating: rating,
            category: category,
            email: email,
            message: message,
            timestamp: timestamp
        };

        // Save to localStorage
        let allFeedback = JSON.parse(localStorage.getItem('allFeedback')) || [];
        allFeedback.push(feedbackData);
        localStorage.setItem('allFeedback', JSON.stringify(allFeedback));

        // Show success message
        document.getElementById('feedbackForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        // Update stats
        loadFeedbackStats();

        // Scroll to success message
        document.getElementById('feedback').scrollIntoView({ behavior: 'smooth' });
    });
}

function resetFeedbackForm() {
    document.getElementById('feedbackForm').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('feedbackForm').reset();
    document.getElementById('ratingValue').value = '0';
    document.getElementById('charCount').textContent = '0';
    
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('active');
        star.style.color = document.body.classList.contains('dark-mode') ? '#5a4f6d' : '#ddd';
    });
    document.getElementById('ratingText').textContent = '';
}

function loadFeedbackStats() {
    const allFeedback = JSON.parse(localStorage.getItem('allFeedback')) || [];

    const totalFeedback = allFeedback.length;
    
    const avgRating = totalFeedback > 0 
        ? (allFeedback.reduce((sum, f) => sum + parseInt(f.rating), 0) / totalFeedback).toFixed(1)
        : '0';

    // Find most common category
    const categoryCount = {};
    allFeedback.forEach(f => {
        categoryCount[f.category] = (categoryCount[f.category] || 0) + 1;
    });
    
    const commonCategory = Object.keys(categoryCount).length > 0
        ? Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b)
        : '-';

    const categoryEmojis = {
        suggestion: '💡 Suggestion',
        content: '📚 Content',
        design: '🎨 Design',
        bug: '🐛 Bug',
        feature: '✨ Feature',
        other: '📝 Other'
    };

    // Update stats display
    document.getElementById('totalFeedback').textContent = totalFeedback;
    document.getElementById('avgRating').textContent = avgRating + '⭐';
    document.getElementById('commonCategory').textContent = categoryEmojis[commonCategory] || '-';
}