// Application State
let isInPrankMode = false;
let progressInterval;
let threatMessageInterval;
let popupTimeout;

// Gemini API Configuration
// For production, you should replace this with your actual API key
const GEMINI_API_KEY = 'AIzaSyBSZUCrHWZcopKuyp9bZ6vIc-XqiTFYyBQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Sound effects using Web Audio API
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.initAudio();
    }

    async initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    async playAlertSound() {
        if (!this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        } catch (error) {
            console.warn('Error playing sound:', error);
        }
    }

    async playGlitchSound() {
        if (!this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(100, this.audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        } catch (error) {
            console.warn('Error playing glitch sound:', error);
        }
    }
}

// Initialize audio manager
const audioManager = new AudioManager();

// Gemini API Integration
class ThreatGenerator {
    constructor() {
        this.threatTypes = [
            {
                type: 'Advanced Persistent Threat',
                prompts: [
                    'Generate a realistic but fictional computer security threat message about an advanced persistent threat that has infiltrated a system. Make it sound technical and urgent, mentioning specific attack vectors like lateral movement or credential harvesting. Keep it under 100 words.',
                    'Create a cybersecurity alert about an APT group that has gained unauthorized access. Include technical details about their methods like zero-day exploits or supply chain attacks. Make it sound realistic but fictional.',
                    'Write a security incident report about an advanced threat actor using sophisticated techniques like living-off-the-land attacks or memory-only malware. Keep it concise and technical.'
                ]
            },
            {
                type: 'Data Exfiltration',
                prompts: [
                    'Generate a security alert about sensitive data being stolen from a computer system. Mention specific data types like personal information, financial records, or corporate secrets. Make it sound urgent and technical.',
                    'Create a data breach notification about unauthorized access to confidential files. Include details about encryption bypass or database compromise. Keep it under 100 words.',
                    'Write an incident report about corporate espionage where sensitive documents are being transmitted to external servers. Make it sound realistic but fictional.'
                ]
            },
            {
                type: 'Unauthorized Access',
                prompts: [
                    'Generate a security warning about unauthorized remote access to a computer system. Mention specific indicators like unusual login patterns or privilege escalation attempts.',
                    'Create an alert about suspicious user activity indicating a compromised account. Include details about unusual file access or system modifications.',
                    'Write a security incident about an intruder gaining administrator privileges through credential theft or social engineering tactics.'
                ]
            }
        ];
        
        this.popupPrompts = [
            'Generate a dramatic but fictional computer virus warning message. Make it sound urgent and scary, mentioning system corruption or data loss. Keep it under 50 words.',
            'Create a fake ransomware message that threatens to encrypt files. Make it sound menacing but clearly fictional. Include threats about permanent data loss.',
            'Write a dramatic system breach alert about hackers taking control of the computer. Make it sound urgent and technical but fictional.'
        ];
    }

    async generateThreatMessage(threatIndex) {
        try {
            const threatType = this.threatTypes[threatIndex];
            const randomPrompt = threatType.prompts[Math.floor(Math.random() * threatType.prompts.length)];
            
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: randomPrompt
                        }]
                    }],
                    generationConfig: {
                        maxOutputTokens: 150,
                        temperature: 0.8
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text.trim();
            } else {
                throw new Error('Invalid API response format');
            }
        } catch (error) {
            console.error('Error generating threat message:', error);
            return this.getFallbackMessage(threatIndex);
        }
    }

    async generatePopupMessage() {
        try {
            const randomPrompt = this.popupPrompts[Math.floor(Math.random() * this.popupPrompts.length)];
            
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: randomPrompt
                        }]
                    }],
                    generationConfig: {
                        maxOutputTokens: 80,
                        temperature: 0.9
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text.trim();
            } else {
                throw new Error('Invalid API response format');
            }
        } catch (error) {
            console.error('Error generating popup message:', error);
            return this.getFallbackPopupMessage();
        }
    }

    getFallbackMessage(threatIndex) {
        const fallbackMessages = [
            'CRITICAL: Malicious payload detected attempting to establish persistent backdoor access. Threat actor using advanced evasion techniques to maintain system persistence.',
            'WARNING: Sensitive database records are being exfiltrated to external command and control servers. Unauthorized data transfer detected across encrypted channels.',
            'ALERT: Unauthorized administrative access granted through privilege escalation exploit. Remote attacker has gained elevated system permissions.'
        ];
        return fallbackMessages[threatIndex] || fallbackMessages[0];
    }

    getFallbackPopupMessage() {
        const fallbackPopups = [
            'SYSTEM BREACH DETECTED! Your computer has been compromised by advanced malware!',
            'CRITICAL ERROR: Ransomware encryption in progress! All files will be permanently lost!',
            'SECURITY BREACH: Hackers have gained complete control of your system!'
        ];
        return fallbackPopups[Math.floor(Math.random() * fallbackPopups.length)];
    }
}

// Initialize threat generator
const threatGenerator = new ThreatGenerator();

// DOM Elements
const legitimateInterface = document.getElementById('legitimate-interface');
const prankInterface = document.getElementById('prank-interface');
const startScanBtn = document.getElementById('start-scan-btn');
const resetBtn = document.getElementById('reset-btn');
const loadingScreen = document.getElementById('loading-screen');

// Progress tracking
let currentProgress = 0;

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();
});

function initializeApplication() {
    // Set up event listeners
    startScanBtn.addEventListener('click', handleScanStart);
    resetBtn.addEventListener('click', handleReset);
    
    // Set up popup close handlers
    document.querySelectorAll('.close-popup').forEach(button => {
        button.addEventListener('click', function() {
            const popupId = this.getAttribute('data-popup');
            closePopup(popupId);
        });
    });

    // Enable audio on user interaction
    document.addEventListener('click', function enableAudio() {
        if (audioManager.audioContext && audioManager.audioContext.state === 'suspended') {
            audioManager.audioContext.resume();
        }
    }, { once: true });
}

async function handleScanStart() {
    if (isInPrankMode) return;
    
    isInPrankMode = true;
    
    // Show loading screen
    showLoadingScreen();
    
    // Wait for dramatic effect
    await sleep(3000);
    
    // Hide loading screen and start prank sequence
    hideLoadingScreen();
    startPrankSequence();
}

function showLoadingScreen() {
    loadingScreen.classList.add('active');
}

function hideLoadingScreen() {
    loadingScreen.classList.remove('active');
}

async function startPrankSequence() {
    // Switch to prank interface
    legitimateInterface.classList.remove('active');
    prankInterface.classList.add('active');
    
    // Play initial alert sound
    audioManager.playAlertSound();
    
    // Start progress animation
    startProgressAnimation();
    
    // Generate and display threat messages
    await generateThreatMessages();
    
    // Show popup alerts
    schedulePopupAlerts();
    
    // Add glitch effects
    addGlitchEffects();
}

function startProgressAnimation() {
    currentProgress = 0;
    const progressElement = document.getElementById('progress');
    const loadingFill = document.querySelector('.loading-fill');
    
    progressInterval = setInterval(() => {
        currentProgress += Math.random() * 15 + 5;
        
        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(progressInterval);
        }
        
        progressElement.textContent = Math.floor(currentProgress);
        loadingFill.style.width = `${currentProgress}%`;
    }, 500);
}

async function generateThreatMessages() {
    const threatMessages = [
        document.getElementById('threat-message-1'),
        document.getElementById('threat-message-2'),
        document.getElementById('threat-message-3')
    ];
    
    // Generate messages with staggered timing
    for (let i = 0; i < threatMessages.length; i++) {
        setTimeout(async () => {
            const message = await threatGenerator.generateThreatMessage(i);
            animateTextReveal(threatMessages[i], message);
            audioManager.playGlitchSound();
        }, i * 2000 + 1000);
    }
}

function animateTextReveal(element, text) {
    element.textContent = '';
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
            element.textContent += text[charIndex];
            charIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);
}

async function schedulePopupAlerts() {
    // First popup after 4 seconds
    setTimeout(async () => {
        const message = await threatGenerator.generatePopupMessage();
        showPopup('popup-1', message);
        audioManager.playAlertSound();
    }, 4000);
    
    // Second popup after 8 seconds
    setTimeout(async () => {
        const message = await threatGenerator.generatePopupMessage();
        showPopup('popup-2', message);
        audioManager.playAlertSound();
    }, 8000);
}

function showPopup(popupId, message) {
    const popup = document.getElementById(popupId);
    const messageElement = document.getElementById(`${popupId.replace('popup', 'popup-message')}`);
    
    messageElement.textContent = message;
    popup.classList.add('active');
    
    // Auto-close popup after 5 seconds
    setTimeout(() => {
        closePopup(popupId);
    }, 5000);
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.remove('active');
}

function addGlitchEffects() {
    // Add random glitch sounds
    const glitchInterval = setInterval(() => {
        if (!isInPrankMode) {
            clearInterval(glitchInterval);
            return;
        }
        
        if (Math.random() < 0.3) {
            audioManager.playGlitchSound();
        }
    }, 2000);
    
    // Add screen flicker effect
    const flickerInterval = setInterval(() => {
        if (!isInPrankMode) {
            clearInterval(flickerInterval);
            return;
        }
        
        if (Math.random() < 0.2) {
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 100);
        }
    }, 1500);
}

function handleReset() {
    // Reset application state
    isInPrankMode = false;
    
    // Clear intervals
    if (progressInterval) {
        clearInterval(progressInterval);
    }
    
    // Reset progress
    currentProgress = 0;
    document.getElementById('progress').textContent = '0';
    document.querySelector('.loading-fill').style.width = '0%';
    
    // Close any open popups
    document.querySelectorAll('.popup-overlay').forEach(popup => {
        popup.classList.remove('active');
    });
    
    // Reset threat messages
    document.getElementById('threat-message-1').textContent = 'Scanning for threats...';
    document.getElementById('threat-message-2').textContent = 'Analyzing attack vector...';
    document.getElementById('threat-message-3').textContent = 'Generating threat report...';
    
    // Reset visual effects
    document.body.style.filter = 'none';
    
    // Switch back to legitimate interface
    prankInterface.classList.remove('active');
    legitimateInterface.classList.add('active');
    
    // Play reset sound
    setTimeout(() => {
        audioManager.audioContext && audioManager.audioContext.resume();
    }, 100);
}

// Utility function for delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Handle window resize for responsiveness
window.addEventListener('resize', function() {
    // Adjust interface layout if needed
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('mobile', isMobile);
});

// Prevent right-click context menu for more immersive experience
document.addEventListener('contextmenu', function(e) {
    if (isInPrankMode) {
        e.preventDefault();
    }
});

// Handle escape key to reset (emergency exit)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isInPrankMode) {
        handleReset();
    }
});

// Console message for developers
console.log('%cSecureShield Pro - Prank Application', 'font-size: 20px; color: #4299e1; font-weight: bold;');
console.log('%cThis is a harmless prank application. No actual security threats detected.', 'font-size: 14px; color: #718096;');
console.log('%cPress ESC key to reset the application at any time.', 'font-size: 12px; color: #a0aec0;');
