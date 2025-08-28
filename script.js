document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const menuButtons = document.querySelectorAll('.menu-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const heartIcon = document.getElementById('heart-icon');
    const messageModal = document.getElementById('message-modal');
    const newMessageBtn = document.getElementById('new-message-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const saveMessageBtn = document.getElementById('save-message-btn');
    const newMessageText = document.getElementById('new-message-text');
    
    // Elementos do player de música
    const backgroundMusic = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const nowPlaying = document.getElementById('now-playing');
    
    // Data do relacionamento (atualize com sua data)
    const startDate = new Date('2023-07-30');
    
    // Configuração inicial da música
    backgroundMusic.volume = 0.5; // Volume inicial (50%)
    let isMusicPlaying = false;
    
    // Tenta iniciar a música automaticamente
    function startBackgroundMusic() {
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay foi bloqueado, mostra botão para ativar
                nowPlaying.textContent = "Clique para ativar a música";
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                isMusicPlaying = false;
            }).then(() => {
                isMusicPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });
        }
    }
    
    // Inicia a música após pequeno delay para melhor compatibilidade
    setTimeout(startBackgroundMusic, 1000);
    
    // Controles do player de música
    playPauseBtn.addEventListener('click', function() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            backgroundMusic.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    muteBtn.addEventListener('click', function() {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            backgroundMusic.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    // Navegação entre seções
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Animação do coração
    heartIcon.addEventListener('click', function() {
        this.style.transform = 'scale(1.5)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Calcula o tempo de relacionamento
    function updateAnniversaryCounter() {
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = (diffDays % 365) % 30;
        
        const counterElement = document.getElementById('counter');
        if (counterElement) {
            counterElement.innerHTML = `
                <div>${years} Ano${years !== 1 ? 's' : ''}, ${months} Mes${months !== 1 ? 'es' : ''} e ${days} Dia${days !== 1 ? 's' : ''}</div>
                <div>Total: ${diffDays} Dia${diffDays !== 1 ? 's' : ''} de Felicidade ao seu ladinho ❤️</div>
            `;
        }
    }
    
    // Modal de mensagens
    newMessageBtn.addEventListener('click', function() {
        messageModal.style.display = 'block';
        newMessageText.focus();
    });
    
    closeModalBtn.addEventListener('click', function() {
        messageModal.style.display = 'none';
        newMessageText.value = '';
    });
    
    saveMessageBtn.addEventListener('click', function() {
        const messageText = newMessageText.value.trim();
        if (messageText) {
            addNewMessage(messageText);
            newMessageText.value = '';
            messageModal.style.display = 'none';
        }
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === messageModal) {
            messageModal.style.display = 'none';
            newMessageText.value = '';
        }
    });
    
    function addNewMessage(text) {
        const messageContainer = document.querySelector('.message-container');
        const today = new Date();
        const dateStr = today.toLocaleDateString('pt-BR');
        
        const newMessage = document.createElement('div');
        newMessage.className = 'message-card';
        newMessage.innerHTML = `
            <div class="message-header">
                <div class="message-date">${dateStr}</div>
                <div class="message-heart">❤</div>
            </div>
            <div class="message-text">
                <p>${text}</p>
            </div>
        `;
        
        messageContainer.insertBefore(newMessage, messageContainer.firstChild);
        
        newMessage.style.opacity = '0';
        setTimeout(() => {
            newMessage.style.transition = 'opacity 0.5s ease';
            newMessage.style.opacity = '1';
        }, 10);
    }
    
    // Inicializa o contador
    updateAnniversaryCounter();
    setInterval(updateAnniversaryCounter, 86400000); // Atualiza a cada dia
});