const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// --- Birthday Lock Logic ---
const targetTime = new Date('2026-07-19T00:00:00').getTime();
const isLocked = Date.now() < targetTime;
const isBypass = window.location.search.includes('bypass=true');
const path = window.location.pathname;
const isLandingPage = path === "/" || path.endsWith("/index.html") || path.endsWith("/index");

if (isLocked && !isLandingPage && !isBypass) {
  window.location.href = "index.html?locked=true";
}

if (isBypass) {
  const propagateBypass = () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('mailto') && !href.includes('bypass=true')) {
        const separator = href.includes('?') ? '&' : '?';
        link.setAttribute('href', `${href}${separator}bypass=true`);
      }
    });
  };
  propagateBypass();
  document.addEventListener('DOMContentLoaded', propagateBypass);
}

const glow = $('.cursor-glow');
document.addEventListener('mousemove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

// --- Music Player with Persistence ---
const audio = new Audio('assets/music.mp3');
audio.loop = true;

const isPlaying = localStorage.getItem('musicPlaying') === 'true';
const savedTime = localStorage.getItem('musicTime');
if (savedTime) {
  audio.currentTime = parseFloat(savedTime);
}

const musicBtn = $('#musicBtn');

function updateMusicButtonUI() {
  if (!musicBtn) return;
  if (audio.paused) {
    musicBtn.classList.remove('playing');
    musicBtn.textContent = '♪';
  } else {
    musicBtn.classList.add('playing');
    musicBtn.textContent = '♫';
  }
}

if (isPlaying) {
  audio.play().then(updateMusicButtonUI).catch(() => {
    localStorage.setItem('musicPlaying', 'false');
    updateMusicButtonUI();
  });
} else {
  updateMusicButtonUI();
}

musicBtn?.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      localStorage.setItem('musicPlaying', 'true');
      updateMusicButtonUI();
    }).catch(err => console.log("Audio play blocked by browser:", err));
  } else {
    audio.pause();
    localStorage.setItem('musicPlaying', 'false');
    updateMusicButtonUI();
  }
});

setInterval(() => {
  if (!audio.paused) {
    localStorage.setItem('musicTime', audio.currentTime);
  }
}, 1000);

// --- Countdown timer for Disha ---
const birthdayDate = new Date('2026-07-19T00:00:00').getTime();
function updateCountdown() {
  const countdown = $('#countdown');
  if (!countdown) return;

  const difference = Math.max(birthdayDate - Date.now(), 0);
  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  $('#days').textContent = String(days).padStart(2, '0');
  $('#hours').textContent = String(hours).padStart(2, '0');
  $('#mins').textContent = String(minutes).padStart(2, '0');
  $('#secs').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const reasons = [
  'Your smile feels like sunshine.',
  'You make people feel safe.',
  'Your laugh is unforgettable.',
  'You turn simple days into stories.',
  'You care deeply.',
  'Your vibe is soft and magical.',
  'You are beautifully genuine.',
  'You make memories feel golden.',
  'Your heart is rare.',
  'You are my favorite person to annoy.',
  'You glow without trying.',
  'You make everything better.',
  'You listen like home.',
  'You are effortlessly classy.',
  'You deserve the prettiest life.',
  'You are a whole comfort place.',
  'Your presence feels peaceful.',
  'You are pure main character energy.',
  'You make friendship feel precious.',
  'You are loved more than words.',
  'You bring calm into chaos.',
  'You make every photo feel special.',
  'You have the cutest little habits.',
  'You make boring days memorable.',
  'You are gentle but strong.',
  'Your friendship feels like a blessing.',
  'You understand things without words.',
  'You make silence feel comfortable.',
  'You are a walking soft glow.',
  'You make people believe in kindness.',
  'You are so easy to love.',
  'You make celebrations feel brighter.',
  'You carry warmth wherever you go.',
  'You make tiny moments feel cinematic.',
  'You have a beautiful soul.',
  'You make me laugh at random times.',
  'You are honest in the sweetest way.',
  'You are my comfort notification.',
  'You make the world less heavy.',
  'You deserve flowers every day.',
  'You make love feel simple.',
  'You are soft, rare, and precious.',
  'You make every plan more exciting.',
  'You are naturally elegant.',
  'You care even when nobody notices.',
  'You are full of pretty energy.',
  'You make friendship feel magical.',
  'You are the reason behind many smiles.',
  'You make ordinary chats memorable.',
  'You are a safe place.',
  'You look beautiful being yourself.',
  'You make every goodbye feel hard.',
  'You are thoughtful in little ways.',
  'You make life feel warmer.',
  'You are my favorite kind of person.',
  'You make memories worth saving.',
  'You are sunshine with a little drama.',
  'You make birthdays feel meaningful.',
  'You are a beautiful chapter.',
  'You make every corner feel like home.',
  'You are cute without even trying.',
  'You have the prettiest heart.',
  'You make people feel noticed.',
  'You bring sparkle into simple things.',
  'You are love in human form.',
  'You make every story better.',
  'You are someone I am grateful for.',
  'You make emotions feel safe.',
  'You have a rare kind of grace.',
  'You make the day softer.',
  'You are a forever kind of friend.',
  'You make everyone around you happier.',
  'You are pure golden-hour energy.',
  'You make small surprises feel huge.',
  'You are beautifully dramatic sometimes.',
  'You make life feel like a cute vlog.',
  'You are my favorite memory keeper.',
  'You make even chaos look pretty.',
  'You are special in every season.',
  'You make me proud to know you.',
  'You carry love in your details.',
  'You make every laugh feel louder.',
  'You are a little universe of warmth.',
  'You make everything feel less lonely.',
  'You are rare, real, and radiant.',
  'You make wishes feel possible.',
  'You are the prettiest comfort zone.',
  'You make every message feel sweet.',
  'You turn moments into keepsakes.',
  'You are always worth celebrating.',
  'You make kindness look beautiful.',
  'You are a blessing in soft colors.',
  'You make every page of life prettier.',
  'You are deeply loved.',
  'You make my heart smile.',
  'You deserve all the magic.',
  'You make today feel golden.',
  'You are unforgettable.',
  'You are my favorite birthday girl.',
  'You are more loved than 100 reasons can say.'
];

const reasonGrid = $('#reasonGrid');
if (reasonGrid) {
  // Default elegant rose-gold / peach gradient.
  // To display personal photos, copy them to assets/1.jpg, 2.jpg... and uncomment the url() reference below.
  reasonGrid.innerHTML = reasons
    .map((reason, index) => {
      return `
      <article class="reason-card reveal" tabindex="0">
        <div class="reason-inner">
          <div class="reason-front">
            <h3>${index + 1}</h3>
            <p>tap love note</p>
          </div>
          <div class="reason-back" style="background: linear-gradient(135deg, #e8cfc1 0%, #d8b4a0 100%);">
            <p>${reason}</p>
          </div>
        </div>
      </article>`;
    })
    .join('');
}

$('#randomReasonBtn')?.addEventListener('click', () => {
  $('#randomReason').textContent = reasons[Math.floor(Math.random() * reasons.length)];
});

const envelope = $('#envelope');
const letterPaper = $('#letterPaper');
const letterText = `Dear Disha,

You are one of those rare people who make the world feel gentler just by being in it. Your presence brings a kind of warmth, peace, and beauty that words could never fully capture.

Happy Birthday, Betu. 🤍

On your birthday, I just want you to know how deeply you are loved, not just today but every single day. You deserve happiness that feels real, dreams that slowly blossom into reality, and moments so beautiful that your heart wants to hold onto them forever.

I hope this year brings you soft mornings, peaceful nights, unexpected reasons to smile, and every little thing your heart has been quietly wishing for. May your days be filled with love, laughter, and countless little moments that remind you how wonderful you truly are.

Always remember, Betu, you are iridescent. You have a beautiful way of bringing light wherever you go. Even during life's darkest moments, your light never fades. It only shines brighter. Never let the world make you forget how extraordinary you are.

Thank you for being you. You make my world softer, exciting, brighter, and infinitely more beautiful just by being in it.

Happy Birthday once again, Toodles. 🌸

I love you. 🫶
Always. In all ways. ❣️`;

let hasTypedLetter = false;
let typingInterval = null;

envelope?.addEventListener('click', () => {
  envelope.classList.add('open');
  if (hasTypedLetter) return;

  hasTypedLetter = true;
  let index = 0;
  const typedLetter = $('#typedLetter');
  typingInterval = setInterval(() => {
    typedLetter.textContent += letterText[index] || '';
    index += 1;
    if (index > letterText.length) clearInterval(typingInterval);
  }, 25);
});

letterPaper?.addEventListener('click', () => {
  if (envelope.classList.contains('open') && typingInterval) {
    clearInterval(typingInterval);
    const typedLetter = $('#typedLetter');
    typedLetter.textContent = letterText;
  }
});

const cake = $('#birthdayCake') || $('.cake');
const cutCakeBtn = $('.cut-cake-btn');
const cakeStageText = $('#cakeStageText');
let cakeAnimationStarted = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cutCakeBtn?.addEventListener('click', async () => {
  if (!cake || cakeAnimationStarted) return;

  cakeAnimationStarted = true;
  cutCakeBtn.disabled = true;

  cakeStageText.textContent = 'blowing the candles... 🌬️';
  cutCakeBtn.textContent = 'Blowing Candles...';
  cake.classList.add('blow');
  await wait(1500);

  cakeStageText.textContent = ' cake is cutting 🔪';
  cutCakeBtn.textContent = '';
  cake.classList.add('knife-in');
  await wait(1200);

  cakeStageText.textContent = ' into a slice... 🍰';
  cutCakeBtn.textContent = 'Cutting Slice...';
  cake.classList.add('sliced');
  await wait(900);

  cakeStageText.textContent = 'first slice for my betu 🎉';
  cutCakeBtn.textContent = 'Cake Cut 🎉';

  if (typeof confetti === 'function') {
    confetti({ particleCount: 280, spread: 115, origin: { y: 0.62 } });
  }
});

cakeStageText?.addEventListener('click', () => {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 180, spread: 100, origin: { y: 0.6 } });
  }
});

// --- Birthday Lock Visual Cue & Handlers ---
function showLockModal() {
  let modal = document.getElementById('lock-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lock-modal';
    modal.className = 'lock-modal';
    modal.innerHTML = `
      <div class="lock-modal-content glass">
        <div class="lock-icon">🔒</div>
        <h2>Patience, My Love! 🤍</h2>
        <p>This part of your universe is locked until your birthday.</p>
        <p class="lock-date">July 19, 2026</p>
        <button class="btn primary" id="closeLockModal">Okay, I'll wait! 🥰</button>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Close button
    document.getElementById('closeLockModal').addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
  
  // Trigger active class
  setTimeout(() => modal.classList.add('active'), 10);
}

function initLockHandlers() {
  if (!isLocked || isBypass) return;

  // Add lock styling and handlers to navbar, action buttons, and garden buttons
  const lockedLinks = $$('.nav-links a, .hero-actions a, .garden-btn');
  lockedLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === 'index.html' || href === '/' || href === '#') return;

    link.style.cursor = 'not-allowed';
    
    // Add lock icon inside nav links for visual cue
    if (link.parentElement.classList.contains('nav-links')) {
      link.innerHTML += ' <span style="font-size: 0.8rem; vertical-align: middle;">🔒</span>';
    }

    link.addEventListener('click', (e) => {
      e.preventDefault();
      showLockModal();
    });
  });

  // Check if redirected from a locked page
  if (window.location.search.includes('locked=true')) {
    window.history.replaceState({}, document.title, window.location.pathname);
    showLockModal();
  }
}

initLockHandlers();

// --- Secret Garden Cassette Player ---
const voiceAudio = $('#voiceAudio');
const cassetteBtn = $('#cassetteBtn');
const leftReel = $('#leftReel');
const rightReel = $('#rightReel');
const cassetteStatus = $('#cassetteStatus');

if (cassetteBtn && voiceAudio) {
  let fadeInterval;

  function fadeAudio(targetVolume, duration = 1200) {
    clearInterval(fadeInterval);
    const startVolume = audio.volume;
    const steps = 25;
    const stepTime = duration / steps;
    const volumeStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    fadeInterval = setInterval(() => {
      currentStep++;
      audio.volume = Math.max(0, Math.min(1, startVolume + (volumeStep * currentStep)));
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        audio.volume = targetVolume;
      }
    }, stepTime);
  }

  function playCassette() {
    voiceAudio.play().then(() => {
      // Duck background music
      fadeAudio(0.1, 1200);
      
      // Visual state
      leftReel.classList.add('spinning');
      rightReel.classList.add('spinning');
      cassetteBtn.querySelector('.btn-play').style.display = 'none';
      cassetteBtn.querySelector('.btn-pause').style.display = 'inline';
      cassetteStatus.textContent = 'Playing voice message... 🎧';
      cassetteStatus.classList.add('playing');
    }).catch(err => {
      console.log("Audio play blocked:", err);
    });
  }

  function pauseCassette() {
    voiceAudio.pause();
    // Fade background music back up
    fadeAudio(1.0, 1200);
    
    // Visual state
    leftReel.classList.remove('spinning');
    rightReel.classList.remove('spinning');
    cassetteBtn.querySelector('.btn-play').style.display = 'inline';
    cassetteBtn.querySelector('.btn-pause').style.display = 'none';
    cassetteStatus.textContent = 'Voice message paused.';
    cassetteStatus.classList.remove('playing');
  }

  cassetteBtn.addEventListener('click', () => {
    if (voiceAudio.paused) {
      playCassette();
    } else {
      pauseCassette();
    }
  });

  voiceAudio.addEventListener('ended', () => {
    pauseCassette();
    cassetteStatus.textContent = 'Voice message ended. 🤍';
  });
}

// --- Floating Rose Petals Generator ---
const particlesContainer = $('#gardenParticles');
if (particlesContainer) {
  const petalColors = ['white-rose', 'red-rose', '']; // empty string is default (rose pink)
  
  function createPetal() {
    const petal = document.createElement('div');
    petal.className = `petal ${petalColors[Math.floor(Math.random() * petalColors.length)]}`;
    
    // Randomize size, starting horizontal position, animation duration and delay
    const startLeft = Math.random() * 100;
    const size = Math.random() * 14 + 12; // 12px to 26px
    const animDuration = Math.random() * 6 + 9; // 9s to 15s
    const startDelay = Math.random() * 4;
    
    petal.style.left = `${startLeft}vw`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.animationDuration = `${animDuration}s`;
    petal.style.animationDelay = `${startDelay}s`;
    
    particlesContainer.appendChild(petal);
    
    // Clean up petal after animation
    setTimeout(() => {
      petal.remove();
    }, (animDuration + startDelay) * 1000);
  }

  // Seed initial batch of floating petals
  for (let i = 0; i < 15; i++) {
    createPetal();
  }
  
  // Spawn more petals at intervals
  setInterval(createPetal, 800);
}

// --- Memories Card Flip ---
const polaroids = $$('.polaroid');
polaroids.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// --- Wishes Page Bokeh Light Generator ---
const bokehContainer = $('#bokehContainer');
if (bokehContainer) {
  function createBokeh() {
    const dot = document.createElement('div');
    dot.className = 'bokeh-dot';
    const size = Math.random() * 25 + 10; // 10px to 35px
    const startLeft = Math.random() * 100;
    const startTop = Math.random() * 90;
    const animDuration = Math.random() * 8 + 8; // 8s to 16s
    const delay = Math.random() * 5;
    
    dot.style.left = `${startLeft}vw`;
    dot.style.top = `${startTop}vh`;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.animationDuration = `${animDuration}s`;
    dot.style.animationDelay = `${delay}s`;
    
    bokehContainer.appendChild(dot);
    
    setTimeout(() => {
      dot.remove();
    }, (animDuration + delay) * 1000);
  }

  // Seed initial dots
  for (let i = 0; i < 22; i++) {
    createBokeh();
  }
  
  // Continuously spawn dots
  setInterval(createBokeh, 900);
}
