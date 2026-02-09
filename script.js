// Game state management
let currentScreen = 'loading';
let tetrisGame = null;
let gameScore = 0;
let gameLevel = 1;
let gameLines = 0;
let typewriterInterval = null;
let isTyping = false;
let currentPhotoIndex = 0;
let currentMusicIndex = 0;
let isPlaying = false;
let playbackInterval = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    showScreen('loading');
    simulateLoading();
    addEventListeners();
    initializeTetris();
}

function simulateLoading() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.querySelector('.progress-text');
    const loadingText = document.querySelector('.loading-text');
    const loadingScreen = document.getElementById('loading-screen');
    
    let progress = 0;
    const loadingMessages = [
        '&gt; INITIALIZING..._',
        '&gt; LOADING MEMORIES..._',
        '&gt; PREPARING SURPRISE..._',
        '&gt; ALMOST READY..._',
        '&gt; LOADING COMPLETE!_'
    ];
    
    let messageIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random increment between 5-20
        
        if (progress > 100) progress = 100;
        
        // Update progress bar with smooth animation
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';
        
        // Update loading message based on progress
        const newMessageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
        if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length) {
            messageIndex = newMessageIndex;
            
            // Fade out current message
            loadingText.style.opacity = '0';
            
            setTimeout(() => {
                loadingText.innerHTML = loadingMessages[messageIndex];
                loadingText.style.opacity = '1';
            }, 200);
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Add completion animation
            loadingScreen.classList.add('loading-complete');
            
            // Wait for completion animation, then transition
            setTimeout(() => {
                transitionToMainScreen();
            }, 1000);
        }
    }, 200);
}

function transitionToMainScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainScreen = document.getElementById('main-screen');
    
    // Start fade out animation for loading screen
    loadingScreen.classList.add('fade-out');
    
    // After fade out completes, show main screen
    setTimeout(() => {
        loadingScreen.classList.remove('active', 'fade-out', 'loading-complete');
        
        // Show main screen with entrance animation
        mainScreen.classList.add('active', 'screen-entering');
        currentScreen = 'main';
        
        // Add staggered animations for elements
        setTimeout(() => {
            initializeMainScreen();
        }, 100);
        
        // Remove entrance class after animation
        setTimeout(() => {
            mainScreen.classList.remove('screen-entering');
        }, 1200);
        
    }, 600);
}

function initializeMainScreen() {
    // Add interactive elements and event listeners
    const menuButtons = document.querySelectorAll('.menu-btn');
    const startBtn = document.querySelector('.start-btn');
    
    // Add button click animations
    menuButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Start button functionality
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                // Could trigger some action here
            }, 150);
        });
    }
    
    // Add hover effects for menu buttons
    menuButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function showScreen(screenName) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenName + '-screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenName;
        
        // Initialize screen-specific content
        switch(screenName) {
            case 'message':
                setTimeout(() => {
                    initializeMessage();
                }, 100);
                break;
            case 'gallery':
                setTimeout(() => {
                    initializeGallery();
                }, 100);
                break;
            case 'music':
                setTimeout(() => {
                    initializeMusicPlayer();
                }, 100);
                break;
            case 'tetris':
                setTimeout(() => {
                    if (tetrisGame && !tetrisGame.gameRunning) {
                        startTetrisGame();
                    }
                }, 100);
                break;
        }
    }
}

// Message Page Functions
function initializeMessage() {
    // Clear any existing typewriter interval
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
        typewriterInterval = null;
    }
    
    const messageScreen = document.getElementById('message-screen');
    if (!messageScreen) return;
    
    // Create or update the message screen content
    const pageScreen = messageScreen.querySelector('.page-screen');
    if (pageScreen) {
        pageScreen.innerHTML = `
            <div class="page-header">Message</div>
            <div class="message-content">
                <!-- Content will be populated by typewriter -->
            </div>
            <button class="skip-btn">SKIP</button>
        `;
        
        // Add skip button event listener
        const skipBtn = pageScreen.querySelector('.skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', skipTypewriter);
        }
    }
    
    // Start typewriter effect
    setTimeout(() => {
        startTypewriter();
    }, 300);
}

function startTypewriter() {
    const messageContent = document.querySelector('.message-content');
    if (!messageContent) return;
    
    const fullMessage = `Hi FAZRINA,

HAPPPY BIRTHDAYY TOO MY SWEEET BEAUTIFUELL AND CUTEE PRETTYY GIRLL

seneng rasanya in this years aku bisa nemenin birthday kamuu, forever grateful and blessed to have met someone like youu..

hope you enjoy your special day, filled with joy and happiness. may allah bless you and make everything you wish come true yaa, i will always be your biggest supporter and will be there for you..

I love you so much`;
    
    // Clear content and start fresh
    messageContent.innerHTML = '';
    let charIndex = 0;
    isTyping = true;
    
    // Clear any existing interval
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }
    
    typewriterInterval = setInterval(() => {
        if (charIndex < fullMessage.length) {
            const char = fullMessage[charIndex];
            if (char === '\n') {
                messageContent.innerHTML += '<br>';
            } else {
                messageContent.innerHTML += char;
            }
            charIndex++;
            // Auto scroll to bottom
            messageContent.scrollTop = messageContent.scrollHeight;
        } else {
            clearInterval(typewriterInterval);
            isTyping = false;
        }
    }, 50);
}

function skipTypewriter() {
    if (isTyping && typewriterInterval) {
        clearInterval(typewriterInterval);
        const messageContent = document.querySelector('.message-content');
        if (messageContent) {
            const fullMessage = `Hi FAZRINA,<br><br>HAPPPY BIRTHDAYY TOO MY SWEEET BEAUTIFUELL AND CUTEE PRETTYY GIRLL
<br><br>
seneng rasanya in this years aku bisa nemenin birthday kamuu, forever grateful and blessed to have met someone like youu..<br><br>
hope you enjoy your special day, filled with joy and happiness. may allah bless you and make everything you wish come true yaa, i will always be your biggest supporter and will be there for you..
.<br><br>I love you so much`;
            messageContent.innerHTML = fullMessage;
            isTyping = false;
            messageContent.scrollTop = messageContent.scrollHeight;
        }
    }
}

// Gallery Functions - Pixel Heart dalam tema Game Boy
function initializeGallery() {
    const galleryContent = document.querySelector('.gallery-content');
    if (!galleryContent) return;

    // Pixel art heart dengan tema Game Boy
    galleryContent.innerHTML = `
        <div class="love-gallery-header">
            <div class="love-gallery-title">For Fazrina</div>
            <div class="love-gallery-subtitle">Happy 17th Birthday</div>
        </div>
        <div class="gameboy-heart-container">
            <div class="pixel-heart" id="pixel-heart"></div>
            <div class="heart-message">
                <div class="message-line">FOR FAZRINA</div>
                <div class="message-line">MY PERSON</div>
                <div class="message-line">FOREVER & ALWAYS</div>
            </div>
        </div>
    `;

    // Buat pixel heart dengan warna Game Boy (#9bbc0f)
    const pixelHeart = galleryContent.querySelector('#pixel-heart');
    const heartPattern = [
        [0,1,1,0,1,1,0],
        [1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1],
        [0,1,1,1,1,1,0],
        [0,0,1,1,1,0,0],
        [0,0,0,1,0,0,0]
    ];
    
    const pixelSize = 14;
    const heartWidth = heartPattern[0].length * pixelSize;
    const heartHeight = heartPattern.length * pixelSize;
    
    pixelHeart.style.width = heartWidth + 'px';
    pixelHeart.style.height = heartHeight + 'px';
    pixelHeart.style.opacity = '0';
    pixelHeart.style.transform = 'scale(0)';
    
    heartPattern.forEach((row, y) => {
        row.forEach((pixel, x) => {
            if (pixel === 1) {
                const pixelEl = document.createElement('div');
                pixelEl.className = 'pixel';
                pixelEl.style.left = (x * pixelSize) + 'px';
                pixelEl.style.top = (y * pixelSize) + 'px';
                pixelEl.style.width = pixelSize + 'px';
                pixelEl.style.height = pixelSize + 'px';
                pixelEl.style.opacity = '0';
                pixelEl.style.transform = 'scale(0)';
                pixelEl.style.transition = `all 0.3s ease ${(x + y) * 0.04}s`;
                pixelHeart.appendChild(pixelEl);
            }
        });
    });

    // Animasi muncul otomatis
    setTimeout(() => {
        pixelHeart.style.opacity = '1';
        pixelHeart.style.transform = 'scale(1)';
        pixelHeart.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        const pixels = pixelHeart.querySelectorAll('.pixel');
        setTimeout(() => {
            pixels.forEach((pixel) => {
                pixel.style.opacity = '1';
                pixel.style.transform = 'scale(1)';
            });
        }, 300);
        
        // Pesan muncul setelah heart
        setTimeout(() => {
            const messageLines = galleryContent.querySelectorAll('.message-line');
            messageLines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('visible');
                }, index * 200);
            });
        }, 1200);
    }, 300);
}

function startPhotoShow() {
    const photoBtn = document.querySelector('.photo-btn');
    const photoDisplay = document.querySelector('.photo-display'); 
    const progressDiv = document.querySelector('.photobox-progress');
    
    if (!photoBtn || !photoDisplay || !progressDiv) return;
    
    // Foto lokal dari folder images
    const photos = [
        {
            text: 'Our First Date 💕',
            image: './images/photo1.jpg'
        },
        {
            text: 'Birthday Moment 🎂',
            image: './images/photo2.jpg'
        },
        {
            text: 'Adventure Time 🌟',
            image: './images/photo3.jpg'
        },
        {
            text: 'Cozy Together ❤️',
            image: './images/photo4.jpg'
        },
        {
            text: 'Sweet Memories 🥰',
            image: './images/photo5.jpg'
        },
        {
            text: 'Laugh Together 😂',
            image: './images/photo6.jpg'
        },
        {
            text: 'Perfect Day ☀️',
            image: './images/photo7.jpg'
        },
        {
            text: 'Love Forever 💖',
            image: './images/photo8.jpg'
        }
    ];
    
    console.log('Total photos:', photos.length);
    
    photoBtn.textContent = 'MENCETAK...';
    photoBtn.disabled = true;
    progressDiv.textContent = 'INITIALIZING CAMERA...';
    
    // Create photo frames HTML
    let framesHTML = '';
    for (let i = 0; i < photos.length; i++) {
        framesHTML += `
            <div class="photo-frame" id="frame-${i + 1}">
                <div class="photo-content">READY</div>
            </div>
        `;
    }
    
    // Create vertical photo strip container
    const photoStripHTML = `
        <div class="photo-strip">
            <div class="photo-strip-header">PHOTOSTRIP SESSION</div>
            <div class="photo-frames-container">
                ${framesHTML}
            </div>
            <div class="photo-strip-footer">💕 BIRTHDAY MEMORIES 💕</div>
        </div>
        <div class="scroll-indicator">⬇ Scroll Down ⬇</div>
    `;
    
    photoDisplay.innerHTML = photoStripHTML;
    currentPhotoIndex = 0;
    
    // Countdown before starting
    let countdown = 3;
    progressDiv.textContent = `GET READY... ${countdown}`;
    
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            progressDiv.textContent = `GET READY... ${countdown}`;
        } else {
            clearInterval(countdownInterval);
            progressDiv.textContent = 'SMILE! 📸';
            startPhotoCapture(photos);
        }
    }, 1000);
}

function startPhotoCapture(photos) {
    const progressDiv = document.querySelector('.photobox-progress');
    const photoBtn = document.querySelector('.photo-btn');
    const photoDisplay = document.querySelector('.photo-display');
    const framesContainer = document.querySelector('.photo-frames-container');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    console.log('Starting photo capture. Initial currentPhotoIndex:', currentPhotoIndex);
    console.log('Total photos to capture:', photos.length);
    
    const captureInterval = setInterval(() => {
        console.log('=== CAPTURE LOOP ===');
        console.log('Current photo index:', currentPhotoIndex);
        console.log('Photos remaining:', photos.length - currentPhotoIndex);
        
        if (currentPhotoIndex < photos.length) {
            const frameId = `frame-${currentPhotoIndex + 1}`;
            const frame = document.getElementById(frameId);
            
            console.log('Processing frame:', frameId);
            console.log('Photo content:', photos[currentPhotoIndex]);
            
            if (frame) {
                // Flash effect
                progressDiv.textContent = '✨ FLASH! ✨';
                
                // Auto scroll to current photo
                setTimeout(() => {
                    if (framesContainer) {
                        try {
                            const frameTop = frame.offsetTop - framesContainer.offsetTop;
                            const containerHeight = framesContainer.clientHeight;
                            const frameHeight = frame.clientHeight;
                            
                            const scrollPosition = frameTop - (containerHeight / 2) + (frameHeight / 2);
                            
                            framesContainer.scrollTo({
                                top: scrollPosition,
                                behavior: 'smooth'
                            });
                        } catch (error) {
                            console.log('Scroll error:', error);
                            const frameTop = frame.offsetTop - framesContainer.offsetTop;
                            framesContainer.scrollTop = frameTop - (framesContainer.clientHeight / 2);
                        }
                    }
                }, 200);
                
                // Update frame content with image
                setTimeout(() => {
                    frame.classList.add('filled');
                    
                    const photo = photos[currentPhotoIndex];
                    frame.innerHTML = `
                        <img src="${photo.image}" alt="${photo.text}" class="photo-image" 
                             onerror="this.style.display='none'; this.nextElementSibling.style.background='linear-gradient(45deg, #ff6b9d, #c44569)';" />
                        <div class="photo-overlay">
                            <div class="photo-content">${photo.text}</div>
                        </div>
                    `;
                    
                    const displayCount = currentPhotoIndex + 1;
                    progressDiv.textContent = `CAPTURED ${displayCount}/${photos.length}`;
                    
                    console.log('Photo captured. Showing:', displayCount, 'of', photos.length);
                    
                    if (currentPhotoIndex < photos.length - 1 && scrollIndicator) {
                        scrollIndicator.style.display = 'block';
                    }
                    
                    currentPhotoIndex++;
                    console.log('Index incremented to:', currentPhotoIndex);
                    
                }, 500);
            } else {
                console.error(`Frame with ID ${frameId} not found`);
                currentPhotoIndex++;
            }
            
        } else {
            console.log('=== ALL PHOTOS COMPLETED ===');
            clearInterval(captureInterval);
            
            if (scrollIndicator) {
                scrollIndicator.style.display = 'none';
            }
            
            setTimeout(() => {
                if (framesContainer) {
                    try {
                        framesContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    } catch (error) {
                        framesContainer.scrollTop = 0;
                    }
                }
            }, 1000);
            
            setTimeout(() => {
                progressDiv.textContent = '🎉 PHOTO STRIP COMPLETE! 🎉';
                photoBtn.textContent = 'CETAK LAGI';
                photoBtn.disabled = false;
                
                photoBtn.removeEventListener('click', startPhotoShow);
                photoBtn.addEventListener('click', startNewSession);
            }, 2000);
        }
    }, 2500);
}

function startNewSession() {
    const photoBtn = document.querySelector('.photo-btn');
    const progressDiv = document.querySelector('.photobox-progress');
    
    console.log('=== STARTING NEW SESSION ===');
    
    // Reset for new session
    progressDiv.textContent = 'READY TO PRINT';
    photoBtn.textContent = 'MULAI CETAK';
    
    // Remove old listener and add original
    photoBtn.removeEventListener('click', startNewSession);
    photoBtn.addEventListener('click', startPhotoShow);
    
    // Clear display
    const photoDisplay = document.querySelector('.photo-display');
    if (photoDisplay) {
        photoDisplay.innerHTML = '<div class="photo-placeholder">Press MULAI CETAK to start photo session</div>';
    }
    
    // CRITICAL: Reset photo index to exactly 0
    currentPhotoIndex = 0;
    
    console.log('Session reset. Photo index:', currentPhotoIndex);
}


// Music Player Functions - Game Boy Style dengan 3 Pilihan Lagu
function initializeMusicPlayer() {
    const musicContent = document.querySelector('.music-content');
    if (!musicContent) return;
    
    musicContent.innerHTML = `
        <div class="gameboy-music-player">
            <div class="music-player-header">
                <div class="music-player-title">♪ MUSIC PLAYER</div>
                <div class="music-player-subtitle">For Fazrina</div>
            </div>
            
            <!-- Tombol pilihan lagu -->
            <div class="song-selector">
                <button class="song-btn active" data-song="1">SONG 1</button>
                <button class="song-btn" data-song="2">SONG 2</button>
                <button class="song-btn" data-song="3">SONG 3</button>
            </div>
            
            <!-- Spotify embed -->
            <div class="spotify-embed-container">
                <iframe id="spotify-iframe" 
                        style="border-radius:8px" 
                        src="" 
                        width="100%" 
                        height="152" 
                        frameBorder="0" 
                        allowfullscreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy">
                </iframe>
            </div>
            
            <!-- Info lagu -->
            <div class="music-info">
                <div class="song-title">Select a song</div>
                <div class="song-message">Special songs for you, Fazrina</div>
            </div>
        </div>
    `;
    
    // Data 3 lagu untuk Fazrina
    const songs = {
        1: {
            embedUrl: 'https://open.spotify.com/embed/track/19Hg1UCZaCdpHB37L7x63X',
            name: 'EVERYTHING',
            artist: 'The Black Skirts',
            message: 'Everything about you is special'
        },
        2: {
            embedUrl: 'https://open.spotify.com/embed/track/6VFKuuqSbA1GpMEosUgTwQ',
            name: 'Nobody But You',
            artist: 'Sonder, Jorja Smith',
            message: 'There\'s nobody but you in my heart'
        },
        3: {
            embedUrl: 'https://open.spotify.com/embed/track/3U4isOIWM3VvDubwSI3y7a',
            name: 'All of Me',
            artist: 'John Legend',
            message: 'I give you all of me, Fazrina'
        }
    };
    
    let currentSongNumber = 1;
    
    // Event listeners untuk tombol lagu
    const songBtns = musicContent.querySelectorAll('.song-btn');
    const iframe = document.getElementById('spotify-iframe');
    const songTitle = musicContent.querySelector('.song-title');
    const songMessage = musicContent.querySelector('.song-message');
    
    function loadSong(songNumber) {
        const song = songs[songNumber];
        if (!song || !iframe) return;
        
        currentSongNumber = songNumber;
        
        // Update active song button
        songBtns.forEach(btn => btn.classList.remove('active'));
        const activeBtn = musicContent.querySelector(`[data-song="${songNumber}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        // Update iframe
        iframe.style.opacity = '0.5';
        iframe.src = song.embedUrl;
        
        // Update info
        if (songTitle) {
            songTitle.textContent = `${song.name} - ${song.artist}`;
        }
        if (songMessage) {
            songMessage.textContent = song.message;
        }
        
        iframe.onload = function() {
            this.style.opacity = '1';
        };
    }
    
    // Song button listeners
    songBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const songNum = parseInt(this.getAttribute('data-song'));
            loadSong(songNum);
        });
    });
    
    // Load lagu pertama secara default
    loadSong(1);
}

// Tetris Game Functions
function initializeTetris() {
    const canvas = document.getElementById('tetris-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Calculate much larger canvas size
    const gameContainer = document.querySelector('.tetris-game');
    if (gameContainer) {
        const containerRect = gameContainer.getBoundingClientRect();
        
        // Much larger maximum dimensions - use almost all available space
        const maxWidth = containerRect.width - 15; // Only 15px margin
        const maxHeight = containerRect.height - 15; // Only 15px margin
        
        // Maintain aspect ratio (approximately 1:2 for Tetris)
        const aspectRatio = 1 / 2;
        let canvasWidth = Math.min(maxWidth, maxHeight * aspectRatio);
        let canvasHeight = canvasWidth / aspectRatio;
        
        // If height is too tall, adjust based on height
        if (canvasHeight > maxHeight) {
            canvasHeight = maxHeight;
            canvasWidth = canvasHeight * aspectRatio;
        }
        
        // Ensure minimum reasonable size
        canvasWidth = Math.max(canvasWidth, 500);
        canvasHeight = Math.max(canvasHeight, 600);
        
        canvas.width = Math.floor(canvasWidth);
        canvas.height = Math.floor(canvasHeight);
        
        console.log('Container size:', containerRect.width, 'x', containerRect.height);
        console.log('Canvas size:', canvas.width, 'x', canvas.height);
    } else {
        // Much larger fallback dimensions
        canvas.width = 500; // Increased significantly
        canvas.height = 600; // Increased significantly
    }
    
    // Calculate block size - ensure it's large enough to see clearly
    const blockSize = Math.max(Math.floor(canvas.width / 10), 25); // Minimum 25px blocks
    const boardHeight = Math.floor(canvas.height / blockSize);
    
    tetrisGame = {
        canvas: canvas,
        ctx: ctx,
        board: createEmptyBoard(10, boardHeight),
        currentPiece: null,
        gameRunning: false,
        dropTime: 0,
        lastTime: 0,
        dropInterval: 1000,
        blockSize: blockSize,
        boardWidth: 10,
        boardHeight: boardHeight
    };
    
    console.log('Block size:', blockSize, 'Board:', tetrisGame.boardWidth, 'x', tetrisGame.boardHeight);
    
    updateTetrisStats();
    drawTetrisBoard();
    addTetrisListeners();
}

function createEmptyBoard(width, height) {
    const board = [];
    for (let y = 0; y < height; y++) {
        board[y] = [];
        for (let x = 0; x < width; x++) {
            board[y][x] = 0;
        }
    }
    return board;
}

function drawTetrisBoard() {
    if (!tetrisGame) return;
    
    const { ctx, canvas, board, blockSize } = tetrisGame;
    
    // Clear canvas with proper background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw more visible grid lines for larger canvas
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1; // Thicker lines for better visibility
    
    // Vertical lines
    for (let x = 0; x <= tetrisGame.boardWidth; x++) {
        ctx.beginPath();
        ctx.moveTo(x * blockSize, 0);
        ctx.lineTo(x * blockSize, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= board.length; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * blockSize);
        ctx.lineTo(canvas.width, y * blockSize);
        ctx.stroke();
    }
    
    // Draw placed blocks
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] !== 0) {
                drawBlock(x, y, getBlockColor(board[y][x]));
            }
        }
    }
    
    // Draw current piece
    if (tetrisGame.currentPiece) {
        drawPiece(tetrisGame.currentPiece);
    }
    
    // Draw prominent border around play area
    ctx.strokeStyle = '#9bbc0f';
    ctx.lineWidth = 4; // Much thicker border
    ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
}

function drawBlock(x, y, color) {
    if (!tetrisGame) return;
    
    const { ctx, blockSize } = tetrisGame;
    const padding = Math.max(2, Math.floor(blockSize * 0.08)); // Larger padding for bigger blocks
    
    // Main block with rounded corners effect
    ctx.fillStyle = color;
    ctx.fillRect(
        x * blockSize + padding, 
        y * blockSize + padding, 
        blockSize - padding * 2, 
        blockSize - padding * 2
    );
    
    // Enhanced 3D effect for larger blocks
    if (blockSize > 20) {
        const effectSize = Math.max(2, Math.floor(blockSize * 0.12));
        
        // Highlight (top and left edges) - brighter for better visibility
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(x * blockSize + padding, y * blockSize + padding, blockSize - padding * 2, effectSize);
        ctx.fillRect(x * blockSize + padding, y * blockSize + padding, effectSize, blockSize - padding * 2);
        
        // Shadow (bottom and right edges) - darker for better contrast
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x * blockSize + padding, y * blockSize + blockSize - padding - effectSize, blockSize - padding * 2, effectSize);
        ctx.fillRect(x * blockSize + blockSize - padding - effectSize, y * blockSize + padding, effectSize, blockSize - padding * 2);
        
        // Inner border for more definition
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            x * blockSize + padding, 
            y * blockSize + padding, 
            blockSize - padding * 2, 
            blockSize - padding * 2
        );
    }
}

function drawPiece(piece) {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                drawBlock(piece.x + x, piece.y + y, getBlockColor(value));
            }
        });
    });
}

function getBlockColor(type) {
    const colors = {
        1: '#ff4757', // I-piece - bright red
        2: '#2ed573', // O-piece - bright green
        3: '#3742fa', // T-piece - bright blue
        4: '#ff6b35', // S-piece - bright orange
        5: '#ffa502', // Z-piece - bright yellow
        6: '#a55eea', // J-piece - bright purple
        7: '#26d0ce'  // L-piece - bright cyan
    };
    return colors[type] || '#ffffff';
}

function createTetrisPiece() {
    const pieces = [
        { shape: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], x: 3, y: 0 }, // I
        { shape: [[2,2],[2,2]], x: 4, y: 0 }, // O
        { shape: [[0,3,0],[3,3,3],[0,0,0]], x: 3, y: 0 }, // T
        { shape: [[0,4,4],[4,4,0],[0,0,0]], x: 3, y: 0 }, // S
        { shape: [[5,5,0],[0,5,5],[0,0,0]], x: 3, y: 0 }, // Z
        { shape: [[6,0,0],[6,6,6],[0,0,0]], x: 3, y: 0 }, // J
        { shape: [[0,0,7],[7,7,7],[0,0,0]], x: 3, y: 0 }  // L
    ];
    
    return pieces[Math.floor(Math.random() * pieces.length)];
}

function startTetrisGame() {
    if (!tetrisGame) return;
    
    tetrisGame.gameRunning = true;
    tetrisGame.currentPiece = createTetrisPiece();
    gameScore = 0;
    gameLevel = 1;
    gameLines = 0;
    updateTetrisStats();
    
    tetrisGameLoop();
}

function tetrisGameLoop(time = 0) {
    if (!tetrisGame || !tetrisGame.gameRunning) return;
    
    const deltaTime = time - tetrisGame.lastTime;
    tetrisGame.lastTime = time;
    tetrisGame.dropTime += deltaTime;
    
    if (tetrisGame.dropTime > tetrisGame.dropInterval) {
        moveTetrisPiece('down');
        tetrisGame.dropTime = 0;
    }
    
    drawTetrisBoard();
    requestAnimationFrame(tetrisGameLoop);
}

function moveTetrisPiece(direction) {
    if (!tetrisGame || !tetrisGame.currentPiece) return;
    
    const piece = tetrisGame.currentPiece;
    let newX = piece.x;
    let newY = piece.y;
    
    switch(direction) {
        case 'left':
            newX = piece.x - 1;
            break;
        case 'right':
            newX = piece.x + 1;
            break;
        case 'down':
            newY = piece.y + 1;
            break;
    }
    
    if (isValidMove(piece.shape, newX, newY)) {
        piece.x = newX;
        piece.y = newY;
    } else if (direction === 'down') {
        placePiece();
        clearLines();
        tetrisGame.currentPiece = createTetrisPiece();
        
        if (!isValidMove(tetrisGame.currentPiece.shape, tetrisGame.currentPiece.x, tetrisGame.currentPiece.y)) {
            gameOver();
        }
    }
}

function rotateTetrisPiece() {
    if (!tetrisGame || !tetrisGame.currentPiece) return;
    
    const piece = tetrisGame.currentPiece;
    const rotatedShape = rotateMatrix(piece.shape);
    
    if (isValidMove(rotatedShape, piece.x, piece.y)) {
        piece.shape = rotatedShape;
        drawTetrisBoard(); // Redraw immediately after rotate
    }
}

function isValidMove(shape, x, y) {
    if (!tetrisGame) return false;
    
    for (let py = 0; py < shape.length; py++) {
        for (let px = 0; px < shape[py].length; px++) {
            if (shape[py][px] !== 0) {
                const newX = x + px;
                const newY = y + py;
                
                // Check boundaries
                if (newX < 0 || newX >= tetrisGame.boardWidth || newY >= tetrisGame.boardHeight) {
                    return false;
                }
                
                // Check collision with placed blocks
                if (newY >= 0 && tetrisGame.board[newY] && tetrisGame.board[newY][newX] !== 0) {
                    return false;
                }
            }
        }
    }
    
    return true;
}

function placePiece() {
    if (!tetrisGame || !tetrisGame.currentPiece) return;
    
    const piece = tetrisGame.currentPiece;
    
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                const boardX = piece.x + x;
                const boardY = piece.y + y;
                if (boardY >= 0 && boardY < tetrisGame.board.length && boardX >= 0 && boardX < 10) {
                    tetrisGame.board[boardY][boardX] = value;
                }
            }
        });
    });
}

function clearLines() {
    if (!tetrisGame) return;
    
    let linesCleared = 0;
    
    for (let y = tetrisGame.board.length - 1; y >= 0; y--) {
        if (tetrisGame.board[y].every(cell => cell !== 0)) {
            tetrisGame.board.splice(y, 1);
            tetrisGame.board.unshift(new Array(tetrisGame.boardWidth).fill(0));
            linesCleared++;
            y++; // Check the same line again
        }
    }
    
    if (linesCleared > 0) {
        gameLines += linesCleared;
        
        // Scoring system
        const lineScores = [0, 40, 100, 300, 1200];
        gameScore += (lineScores[linesCleared] || 0) * gameLevel;
        
        // Level progression
        gameLevel = Math.floor(gameLines / 10) + 1;
        tetrisGame.dropInterval = Math.max(50, 1000 - (gameLevel - 1) * 50);
        
        updateTetrisStats();
    }
}

function rotateMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rotated = [];
    
    for (let i = 0; i < cols; i++) {
        rotated[i] = [];
        for (let j = 0; j < rows; j++) {
            rotated[i][j] = matrix[rows - 1 - j][i];
        }
    }
    
    return rotated;
}

function updateTetrisStats() {
    const scoreEl = document.getElementById('score');
    const levelEl = document.getElementById('level');
    const linesEl = document.getElementById('lines');
    
    if (scoreEl) scoreEl.textContent = gameScore;
    if (levelEl) levelEl.textContent = gameLevel;
    if (linesEl) linesEl.textContent = gameLines;
}

function gameOver() {
    if (tetrisGame) {
        tetrisGame.gameRunning = false;
    }
    document.getElementById('game-over-modal').classList.add('active');
}

function resetTetrisGame() {
    if (tetrisGame) {
        tetrisGame.board = createEmptyBoard(tetrisGame.boardWidth, tetrisGame.boardHeight);
        tetrisGame.currentPiece = null;
        tetrisGame.gameRunning = false;
        gameScore = 0;
        gameLevel = 1;
        gameLines = 0;
        updateTetrisStats();
        drawTetrisBoard();
    }
}

// Add window resize handler for responsive canvas
window.addEventListener('resize', function() {
    if (currentScreen === 'tetris' && tetrisGame) {
        // Reinitialize with new dimensions
        setTimeout(() => {
            initializeTetris();
        }, 100);
    }
});

// Event Listeners
function addEventListeners() {
    // Menu buttons
    const menuButtons = document.querySelectorAll('.menu-btn');
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                showScreen(page);
            }
        });
    });
    
    // Back buttons
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                showScreen(page);
            }
        });
    });
    
    // Start button
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (currentScreen === 'main') {
                showScreen('message');
            }
        });
    }
    
    // Continue buttons
    const continueButtons = document.querySelectorAll('.continue-btn');
    continueButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleContinueNavigation();
        });
    });
    
    // Skip button
    const skipBtn = document.querySelector('.skip-btn');
    if (skipBtn) {
        skipBtn.addEventListener('click', function() {
            skipTypewriter();
        });
    }
    
    // Modal buttons
    const confirmBtn = document.getElementById('confirm-btn');
    const okBtn = document.getElementById('ok-btn');
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            document.getElementById('game-over-modal').classList.remove('active');
            document.getElementById('final-message-modal').classList.add('active');
        });
    }
    
    if (okBtn) {
        okBtn.addEventListener('click', function() {
            document.getElementById('final-message-modal').classList.remove('active');
            showScreen('main');
            resetTetrisGame();
        });
    }
    
    // Keyboard controls
    document.addEventListener('keydown', function(event) {
        if (currentScreen === 'tetris' && tetrisGame && tetrisGame.gameRunning) {
            switch(event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    moveTetrisPiece('left');
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    moveTetrisPiece('right');
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    moveTetrisPiece('down');
                    break;
                case 'ArrowUp':
                case ' ':
                    event.preventDefault();
                    rotateTetrisPiece();
                    break;
            }
        }
    });
}

function addTetrisListeners() {
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    const rotateBtn = document.getElementById('rotate-btn');
    const canvas = document.getElementById('tetris-canvas');
    
    let lastButtonMoveTime = 0;
    const buttonMoveCooldown = 150; // ms - delay untuk button clicks
    
    if (leftBtn) {
        leftBtn.addEventListener('click', function() {
            const currentTime = new Date().getTime();
            if (currentTime - lastButtonMoveTime >= buttonMoveCooldown) {
                moveTetrisPiece('left');
                lastButtonMoveTime = currentTime;
            }
        });
    }
    
    if (rightBtn) {
        rightBtn.addEventListener('click', function() {
            const currentTime = new Date().getTime();
            if (currentTime - lastButtonMoveTime >= buttonMoveCooldown) {
                moveTetrisPiece('right');
                lastButtonMoveTime = currentTime;
            }
        });
    }
    
    if (rotateBtn) {
        rotateBtn.addEventListener('click', function() {
            rotateTetrisPiece();
        });
    }
    
    // Touch/Swipe controls for mobile
    if (canvas) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        let lastTapTime = 0;
        let tapCount = 0;
        let lastMoveTime = 0;
        let moveCooldown = 200; // ms - delay between moves
        
        canvas.addEventListener('touchstart', function(e) {
            if (!tetrisGame || !tetrisGame.gameRunning) return;
            e.preventDefault();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: false });
        
        canvas.addEventListener('touchend', function(e) {
            if (!tetrisGame || !tetrisGame.gameRunning) return;
            e.preventDefault();
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 60; // Increased threshold untuk mengurangi false swipe
            const currentTime = new Date().getTime();
            const tapDelay = 300; // ms
            
            // Check if it's a swipe (not just a tap)
            if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
                // Reset tap count on swipe
                tapCount = 0;
                
                // Cooldown check untuk move actions
                if (currentTime - lastMoveTime < moveCooldown) {
                    return; // Skip jika masih dalam cooldown
                }
                
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    // Horizontal swipe
                    if (deltaX > 0) {
                        moveTetrisPiece('right');
                    } else {
                        moveTetrisPiece('left');
                    }
                    lastMoveTime = currentTime;
                } else {
                    // Vertical swipe
                    if (deltaY > 0) {
                        moveTetrisPiece('down');
                        lastMoveTime = currentTime;
                    } else {
                        // Swipe up = rotate (no cooldown untuk rotate)
                        rotateTetrisPiece();
                    }
                }
            } else {
                // Tap detection for rotate
                if (currentTime - lastTapTime < tapDelay) {
                    tapCount++;
                } else {
                    tapCount = 1;
                }
                lastTapTime = currentTime;
                
                // Single tap = rotate (make it easier)
                if (tapCount >= 1) {
                    rotateTetrisPiece();
                    tapCount = 0; // Reset after rotate
                }
            }
        }, { passive: false });
        
        // Prevent scrolling when touching canvas
        canvas.addEventListener('touchmove', function(e) {
            if (tetrisGame && tetrisGame.gameRunning) {
                e.preventDefault();
            }
        }, { passive: false });
    }
}

function handleContinueNavigation() {
    switch(currentScreen) {
        case 'message':
            showScreen('gallery');
            break;
        case 'gallery':
            showScreen('music');
            break;
        case 'music':
            showScreen('tetris');
            break;
        default:
            showScreen('main');
    }
}