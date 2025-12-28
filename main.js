import { NAVIGATION, MODULES } from './data.js';
import { renderERT, renderAudioToggle, renderModuleHeader, renderCaseStudy } from './components.js';

let currentAudio = null;
let isMuted = false;

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    renderContentFlow();
    initScrollLogic();
    initAudioManagement();
    initCharts();
    initAnimations();
    lucide.createIcons();
});

function initNavigation() {
    const nav = document.getElementById('nav-links');
    NAVIGATION.forEach(item => {
        const link = document.createElement('a');
        link.href = `#${item.id}`;
        link.className = 'nav-link flex items-center gap-4 px-5 py-4 rounded-2xl border border-transparent text-zinc-500 hover:text-white transition-all';
        link.setAttribute('role', 'menuitem');
        link.setAttribute('aria-label', `Navigate to ${item.label}`);
        link.innerHTML = `
            <div class="icon-box w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all">
                <i data-lucide="${item.icon}" class="w-5 h-5"></i>
            </div>
            <div class="flex flex-col">
                <span class="text-sm font-bold tracking-tight">${item.label}</span>
                <span class="text-[9px] uppercase tracking-widest text-zinc-600">Module Insight</span>
            </div>
        `;
        link.onclick = (e) => {
            e.preventDefault();
            document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu after navigation
            closeMobileMenu();
        };
        nav.appendChild(link);
    });
}

function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (!toggle || !sidebar || !overlay) return;
    
    toggle.onclick = () => {
        const isOpen = sidebar.classList.contains('translate-x-0');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    };
    
    overlay.onclick = closeMobileMenu;
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });
}

function openMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100');
    toggle.setAttribute('aria-expanded', 'true');
    
    const icon = toggle.querySelector('i');
    icon.setAttribute('data-lucide', 'x');
    lucide.createIcons();
}

function closeMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (!sidebar || !overlay) return;
    
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('translate-x-0');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100');
    
    if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        const icon = toggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
}

function renderContentFlow() {
    const container = document.getElementById('content-flow');


    const sum = MODULES.summary;
    container.innerHTML += `
        <section id="summary" class="px-8 py-32 max-w-7xl mx-auto section-reveal">
            <div class="grid lg:grid-cols-3 gap-16">
                <div class="lg:col-span-2 prose-custom">
                    ${renderModuleHeader(sum)}
                    ${sum.content}
                </div>
                <div class="space-y-6 pt-24">
                    ${sum.stats.map(s => `
                        <div class="glass p-8 rounded-3xl">
                            <p class="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">${s.label}</p>
                            <h4 class="text-4xl font-bold text-white m-0">${s.value}</h4>
                            <p class="text-xs text-indigo-400 mt-1">${s.sub}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        <div class="section-divider"></div>
    `;


    const tech = MODULES.technologies;
    container.innerHTML += `
        <section id="technologies" class="px-8 py-32 max-w-7xl mx-auto section-reveal">
            <div class="prose-custom mb-16 max-w-4xl">
                ${renderModuleHeader(tech)}
                ${tech.content}
            </div>
            <div class="relative rounded-[40px] overflow-hidden border border-white/5 mb-20 shadow-2xl">
                <img data-src="${tech.image}" 
                     class="lazy-img reveal-img w-full h-auto loading" 
                     alt="AI astrology personalization pipeline showing data flow from NASA JPL ephemeris to LLM interpretation"
                     loading="lazy"
                     onerror="this.src='https://placehold.co/1024x1024/0a0a0a/6366f1?text=Pipeline+Diagram'">
                <div class="absolute bottom-8 left-8 glass p-6 rounded-2xl border-indigo-500/20 max-w-xs">
                    <p class="text-xs text-white font-bold mb-1">Personalization Pipeline v2</p>
                    <p class="text-[10px] text-zinc-400">Visualizing the NASA JPL to LLM interface.</p>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                ${tech.features.map(f => `
                    <div class="glass p-10 rounded-3xl border-white/5 hover:border-indigo-500/30 transition-all group">
                        <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 group-hover:bg-indigo-500 group-hover:text-white transition-all text-indigo-400">
                            <i data-lucide="cpu" class="w-6 h-6"></i>
                        </div>
                        <h4 class="text-xl font-bold text-white mb-4 mt-0">${f.title}</h4>
                        <p class="text-sm text-zinc-400 leading-relaxed">${f.desc}</p>
                    </div>
                `).join('')}
            </div>
        </section>
        <div class="section-divider"></div>
    `;


    const vibe = MODULES.vibecoding;
    container.innerHTML += `
        <section id="vibecoding" class="px-8 py-32 max-w-7xl mx-auto section-reveal">
            <div class="prose-custom mb-24 max-w-4xl">
                ${renderModuleHeader(vibe)}
                ${vibe.content}
            </div>
            ${vibe.caseStudies.map(cs => renderCaseStudy(cs)).join('')}
        </section>
        <div class="section-divider"></div>
    `;


    const market = MODULES.market;
    container.innerHTML += `
        <section id="market" class="px-8 py-32 max-w-7xl mx-auto section-reveal">
            <div class="grid lg:grid-cols-2 gap-20 items-center">
                <div class="prose-custom">
                    ${renderModuleHeader(market)}
                    ${market.content}
                </div>
                <div class="glass p-12 rounded-[40px] border-white/5 relative overflow-hidden">
                    <div class="absolute top-8 left-8">
                        <p class="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Market Projection</p>
                    </div>
                    <canvas id="marketChart" class="w-full mt-12"></canvas>
                </div>
            </div>
        </section>
        <div class="section-divider"></div>
    `;


    const syn = MODULES.synthesis;
    container.innerHTML += `
        <section id="synthesis" class="px-8 py-32 max-w-4xl mx-auto section-reveal prose-custom text-center">
            <div class="flex justify-center mb-12">
                <div class="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <i data-lucide="database" class="w-10 h-10"></i>
                </div>
            </div>
            ${renderModuleHeader(syn)}
            <div class="text-left">
                ${syn.content}
            </div>
        </section>
    `;
}

function initScrollLogic() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollBar = document.getElementById('scroll-bar');
    const scrollPercText = document.getElementById('scroll-percentage');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
                

                const lazyImgs = entry.target.querySelectorAll('.lazy-img');
                lazyImgs.forEach(img => {
                    if (img.dataset.src) {
                        img.classList.add('loading');
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        
                        img.onload = () => {
                            img.classList.remove('loading');
                            img.classList.add('in-view', 'loaded');
                        };
                        
                        img.onerror = () => {
                            img.classList.remove('loading');
                            console.warn('Failed to load image:', img.src);
                        };
                    }
                });
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollBar.style.width = scrolled + "%";
        scrollPercText.innerText = Math.round(scrolled) + "%";
    });
}

function initAudioManagement() {
    const audioUI = document.getElementById('audio-ui');
    const playTitle = document.getElementById('now-playing-title');
    const playDesc = document.getElementById('now-playing-desc');
    const muteBtn = document.getElementById('master-mute');
    const heroPlay = document.getElementById('start-narrative');

    const toggleAudio = (url, title, desc) => {
        try {
            if (currentAudio && currentAudio.src === url) {
                if (currentAudio.paused) {
                    currentAudio.play().catch(handleAudioError);
                    muteBtn.classList.add('playing');
                    muteBtn.setAttribute('aria-pressed', 'true');
                } else {
                    currentAudio.pause();
                    muteBtn.classList.remove('playing');
                    muteBtn.setAttribute('aria-pressed', 'false');
                }
                return;
            }

            if (currentAudio) {
                currentAudio.pause();
            }

            currentAudio = new Audio(url);
            currentAudio.loop = true;
            currentAudio.muted = isMuted;
            
            // Error handling
            currentAudio.onerror = handleAudioError;
            
            currentAudio.play().catch(handleAudioError);
            
            audioUI.classList.remove('hidden');
            muteBtn.classList.add('playing');
            muteBtn.setAttribute('aria-pressed', 'true');
            playTitle.innerText = title;
            playDesc.innerText = desc;
        } catch (error) {
            handleAudioError(error);
        }
    };
    
    const handleAudioError = (error) => {
        console.error('Audio playback error:', error);
        if (audioUI) {
            playTitle.innerText = 'Error';
            playDesc.innerText = 'Audio unavailable';
        }
        if (muteBtn) {
            muteBtn.classList.remove('playing');
            muteBtn.setAttribute('aria-pressed', 'false');
        }
    };

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.audio-trigger');
        if (trigger) {
            toggleAudio(trigger.dataset.audio, trigger.dataset.title, trigger.dataset.desc);

            const icon = trigger.querySelector('.play-icon');
            lucide.createIcons(); // reset
        }
    });

    heroPlay.onclick = () => {
        toggleAudio(MODULES.summary.audio, "Executive Narrative", "Algorithmic Firmament v4.8");
    };

    muteBtn.onclick = () => {
        isMuted = !isMuted;
        if (currentAudio) currentAudio.muted = isMuted;
        muteBtn.setAttribute('aria-pressed', isMuted ? 'true' : 'false');
        muteBtn.setAttribute('aria-label', isMuted ? 'Unmute audio' : 'Mute audio');
        const icon = document.getElementById('mute-icon');
        icon.setAttribute('data-lucide', isMuted ? 'volume-x' : 'volume-2');
        lucide.createIcons();
    };
}

function initCharts() {
    const ctx = document.getElementById('marketChart')?.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: MODULES.market.chartData.labels,
            datasets: [{
                label: 'Market Value ($B)',
                data: MODULES.market.chartData.values,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#6366f1',
                pointHoverBorderWidth: 4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#52525b', font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { color: '#52525b', font: { size: 10 } } }
            }
        }
    });
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: "power4.out"
    });

    document.querySelectorAll('.section-reveal').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%"
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });
}
