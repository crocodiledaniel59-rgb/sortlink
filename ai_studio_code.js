// --- FUNGSI TEMA ---
const modeToggle = document.getElementById('modeToggle');
const modeIcon = document.getElementById('modeIcon');
const themePickerBtn = document.getElementById('themePickerBtn');
const themeOptions = document.getElementById('themeOptions');

// Toggle Mode Gelap/Terang
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark'); // asumsikan dark adalah default
    if (document.body.classList.contains('light')) {
        modeIcon.textContent = '☀️';
    } else {
        modeIcon.textContent = '🌙';
    }
});

// Tampilkan/Sembunyikan Pemilih Tema
themePickerBtn.addEventListener('click', () => {
    themeOptions.classList.toggle('hidden');
});

// Terapkan Tema yang Dipilih
document.querySelectorAll('.theme-btn').forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.dataset.theme;
        document.body.dataset.theme = theme;
        themeOptions.classList.add('hidden');
    });
});
// Set default mode
document.body.classList.add('dark');


// --- FUNGSI VOICE-TO-TEXT ---
const voiceBtn = document.getElementById('voiceBtn');
const promptTextarea = document.getElementById('promptTextarea');

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID'; // Set bahasa ke Indonesia

    recognition.onstart = () => {
        voiceBtn.classList.add('text-red-500'); // Indikator sedang merekam
    };
    recognition.onresult = (event) => {
        promptTextarea.value = event.results[0][0].transcript;
    };
    recognition.onend = () => {
        voiceBtn.classList.remove('text-red-500');
    };

    voiceBtn.addEventListener('click', () => {
        recognition.start();
    });
} else {
    voiceBtn.style.display = 'none'; // Sembunyikan jika tidak didukung
    alert("Maaf, browser Anda tidak mendukung Voice-to-Text.");
}


// --- FUNGSI INTERAKSI BUBBLE ---
const conversationLog = document.getElementById('conversationLog');

conversationLog.addEventListener('click', (e) => {
    const bubble = e.target.closest('.message-bubble');
    if (bubble) {
        // Tutup semua menu lain
        document.querySelectorAll('.message-bubble.active').forEach(b => {
            if (b !== bubble) b.classList.remove('active');
        });
        // Toggle menu yang diklik
        bubble.classList.toggle('active');
    }
    
    // Logika untuk tombol opsi
    if (e.target.classList.contains('delete-btn')) {
        handleDelete(e.target.closest('.message-bubble'));
    }
    if (e.target.classList.contains('copy-btn')) {
        handleCopy(e.target.closest('.message-bubble'));
    }
    // Tambahkan logika untuk edit di sini
});

function handleDelete(bubble) {
    bubble.classList.add('exploding');
    // Hapus elemen dari DOM setelah animasi selesai
    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}

function handleCopy(bubble) {
    const textToCopy = bubble.querySelector('p').textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Animasi copy
        const clone = bubble.cloneNode(true);
        clone.classList.add('copy-clone');
        document.body.appendChild(clone);
        
        const rect = bubble.getBoundingClientRect();
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;

        setTimeout(() => {
            clone.style.transform = 'translateY(-100px) scale(0.5)';
            clone.style.clipPath = 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'; // Efek belah
            clone.style.opacity = '0';
        }, 10);

        clone.addEventListener('transitionend', () => {
            clone.remove();
        });
        
        bubble.classList.remove('active'); // Tutup menu setelah copy
    });
}


// --- MODIFIKASI FUNGSI `kirimPrompt` ---
// Ganti cara menampilkan respons
function tampilkanPesan(teks, pengirim) {
    const log = document.getElementById('conversationLog');
    const bubbleWrapper = document.createElement('div');
    bubbleWrapper.className = `message-bubble ${pengirim}-bubble`;
    bubbleWrapper.innerHTML = `
        <p>${teks}</p>
        <div class="bubble-options">
            <button class="copy-btn">📄</button>
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
        </div>
    `;
    log.appendChild(bubbleWrapper);
    log.scrollTop = log.scrollHeight; // Auto-scroll ke bawah
}

// Modifikasi fungsi `kirimPrompt` mu
async function kirimPrompt() {
    const promptText = promptTextarea.value;
    if (!promptText) return;

    tampilkanPesan(promptText, 'user'); // Tampilkan bubble user
    promptTextarea.value = ''; // Kosongkan input
    
    // ... (kode fetch API ke Gemini AI mu yang sudah ada)
    // Di dalam `try` setelah mendapatkan jawaban `aiText`
    // Ganti `responseContainer.innerHTML += ...` dengan:
    tampilkanPesan(aiText, 'ai'); // Tampilkan bubble AI
}