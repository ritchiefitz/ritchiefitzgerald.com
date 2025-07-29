// Amdy's Awesome Fun Zone - Main JavaScript

// Initialize the site when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeHomepage();
});

function initializeHomepage() {
    // Update footer year automatically
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('nav a, .fun-button').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add click animation to game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            if (!this.classList.contains('coming-soon')) {
                // Navigate to game page
                const gameData = this.getAttribute('data-game');
                if (gameData) {
                    window.location.href = `games/${gameData}.html`;
                } else {
                    const gameTitle = this.querySelector('h3').textContent;
                    console.log('Game clicked:', gameTitle);
                    navigateToGame(gameTitle);
                }
            } else {
                // Show coming soon message with bounce animation
                this.style.animation = 'bounce 0.5s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            }
        });
    });
    
    // Add floating animation to shapes with random delays
    document.querySelectorAll('.shape').forEach((shape, index) => {
        shape.style.animationDelay = `${Math.random() * 3}s`;
        shape.style.animationDuration = `${4 + Math.random() * 4}s`;
    });
}

// Function to navigate to individual games (to be implemented)
function navigateToGame(gameTitle) {
    // Extract game name from title (remove emoji)
    const gameName = gameTitle.replace(/[^\w\s]/gi, '').trim().toLowerCase().replace(/\s+/g, '-');
    
    // For now, just log - later we'll navigate to game pages
    console.log(`Navigating to game: ${gameName}`);
    
    // Future implementation:
    // window.location.href = `games/${gameName}.html`;
}

// Utility functions for games
const GameUtils = {
    // Create a canvas element with specified dimensions
    createCanvas: function(width, height, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id '${containerId}' not found`);
            return null;
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.className = 'game-canvas';
        
        container.appendChild(canvas);
        return canvas.getContext('2d');
    },
    
    // Create game controls
    createControls: function(buttons, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id '${containerId}' not found`);
            return;
        }
        
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'game-controls';
        
        buttons.forEach(button => {
            const btn = document.createElement('button');
            btn.textContent = button.text;
            btn.className = 'game-button';
            btn.onclick = button.onclick;
            if (button.disabled) btn.disabled = true;
            controlsDiv.appendChild(btn);
        });
        
        container.appendChild(controlsDiv);
    },
    
    // Create score display
    createScoreDisplay: function(containerId, initialScore = 0) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id '${containerId}' not found`);
            return null;
        }
        
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'game-score';
        scoreDiv.innerHTML = `Score: <span id="score-value">${initialScore}</span>`;
        
        container.appendChild(scoreDiv);
        
        return {
            update: function(newScore) {
                document.getElementById('score-value').textContent = newScore;
            }
        };
    },
    
    // Handle keyboard input
    setupKeyboardControls: function(keyMap) {
        document.addEventListener('keydown', function(e) {
            if (keyMap[e.key]) {
                e.preventDefault();
                keyMap[e.key]();
            }
        });
    },
    
    // Random number generator
    random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Check collision between two rectangles
    checkCollision: function(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameUtils, initializeHomepage };
}
