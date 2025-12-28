/**
 * Merged Main.js
 * Combines AlgoFirm functionality with Sanctuary features
 */

import { NAVIGATION, MODULES } from './data.js';
import { renderERT, renderAudioToggle, renderModuleHeader, renderCaseStudy } from './components.js';
import { AGENTS, renderAgentGrid, setActiveAgent, getActiveAgent, updateAgentGridSelection } from './agents.js';
import { mountAstrowheel } from './wheel-engine.js';

let currentAudio = null;
let isMuted = false;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Astrowheel
    initAstrowheel();
    
    // Original AlgoFirm functionality
    initNavigation();
    initMobileMenu();
    renderContentFlow();
    initScrollLogic();
    initAudioManagement();
    initAnimations();
    
    // New Agent functionality
    initAgentSection();
    
    // Lucide icons
    lucide.createIcons();
});

/**
 * Initialize p5.js Astrowheel
 */
function initAstrowheel() {
    const container = document.getElementById('wheel-canvas');
    if (container && window.p5) {
        mountAstrowheel('wheel-canvas');
        console.log('Astrowheel mounted');
    }
}

/**
 * Initialize Agent Section
 */
function initAgentSection() {
    renderAgentGrid('#agent-grid', (agent) => {
        setActiveAgent(agent.id, '#active-widget-container');
        updateAgentGridSelection('#agent-grid');
        
        // Scroll to show widget
        setTimeout(() => {
            const widget = document.getElementById('active-widget-container');
            if (widget && widget.children.length > 0) {
                widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
    });
}

/**
 * Initialize Navigation
 */
function initNavigation() {
    const navContainer = document.getElementById('nav-links');
    if (!navContainer) return;

    // Add Agents link at the top
    const agentNavItem = createNavLink({
        id: 'agents',
        label: 'AI Astro-Agenten',
        icon: 'mic'
    });
    navContainer.appendChild(agentNavItem);

    // Add separator
    const separator = document.createElement('div');
    separator.className = 'h-px bg-white/5 my-4';
    navContainer.appendChild(separator);

    // Add original navigation
    NAVIGATION.forEach(item => {
        const link = createNavLink(item);
        navContainer.appendChild(link);
    });
}

function createNavLink(item) {
    const link = document.createElement('a');
    link.href = `#${item.id}`;
    link.className = 'nav-link group flex items-center gap-4 p-4 rounded-xl border border-transparent text-zinc-400 hover:text-white hover:bg-white/5 hover:border-white/10';
    link.setAttribute('role', 'menuitem');
    link.innerHTML = `
        <div class="icon-box w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center transition-all">
            <i data-lucide="${item.icon}" class="w-5 h-5"></i>
        </div>
        <span class="text-sm tracking-wide">${item.label}</span>
    `;
    
    link.onclick = (e) => {
        e.preventDefault();
        const target = document.getElementById(item.id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        // Close mobile menu
        closeMobileMenu();
    };
    
    return link;
}

/**
 * Mobile Menu Handling
 */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const overlay = document.getElementById('mobile-overlay');
    
    if (toggle) {
        toggle.onclick = () => {
            const sidebar = document.getElementById('sidebar');
            const isOpen = sidebar?.classList.contains('translate-x-0');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        };
    }
    
    if (overlay) {
        overlay.onclick = closeMobileMenu;
    }
}

function openMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    sidebar?.classList.remove('-translate-x-full');
    sidebar?.classList.add('translate-x-0');
    overlay?.classList.remove('opacity-0', 'pointer-events-none');
    overlay?.classList.add('opacity-100');
    toggle?.setAttribute('aria-expanded', 'true');
    
    // Change icon to X
    const icon = toggle?.querySelector('i');
    if (icon) {
        icon.setAttribute('data-lucide', 'x');
        lucide.createIcons();
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    sidebar?.classList.add('-translate-x-full');
    sidebar?.classList.remove('translate-x-0');
    overlay?.classList.add('opacity-0', 'pointer-events-none');
    overlay?.classList.remove('opacity-100');
    toggle?.setAttribute('aria-expanded', 'false');
    
    // Change icon back to menu
    const icon = toggle?.querySelector('i');
    if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
}

/**
 * Render Content Flow
 */
function renderContentFlow() {
    const container = document.getElementById('content-flow');
    if (!container) return;

    Object.values(MODULES).forEach(module => {
        const section = document.createElement('section');
        section.id = module.id;
        section.className = 'min-h-screen p-8 lg:p-16 flex flex-col justify-center';
        
        let sectionHTML = `
            <div class="max-w-5xl mx-auto w-full">
                ${renderModuleHeader(module)}
                <div class="prose-custom mt-12">
                    ${module.content}
                </div>
        `;
        
        // Add stats if available
        if (module.stats) {
            sectionHTML += `
                <div class="grid grid-cols-2 gap-8 mt-16">
                    ${module.stats.map(stat => `
                        <div class="card-glass p-8 text-center">
                            <div class="card-corner tl"></div>
                            <div class="card-corner br"></div>
                            <div class="text-5xl font-bold text-gold mb-2">${stat.value}</div>
                            <div class="text-xs uppercase tracking-widest text-zinc-500">${stat.label}</div>
                            <div class="text-xs text-zinc-600 mt-1">${stat.sub}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Add image if available
        if (module.image) {
            sectionHTML += `
                <div class="mt-16 rounded-2xl overflow-hidden border border-white/5">
                    <img src="${module.image}" alt="${module.title}" class="w-full reveal-img" loading="lazy">
                </div>
            `;
        }
        
        // Add features if available  
        if (module.features) {
            sectionHTML += `
                <div class="grid md:grid-cols-3 gap-6 mt-16">
                    ${module.features.map(feat => `
                        <div class="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                            <h4 class="text-white font-semibold mb-2">${feat.title}</h4>
                            <p class="text-sm text-zinc-500">${feat.desc}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Add case studies if available
        if (module.caseStudies) {
            sectionHTML += `
                <div class="grid md:grid-cols-2 gap-8 mt-16">
                    ${module.caseStudies.map(study => renderCaseStudy(study)).join('')}
                </div>
            `;
        }
        
        sectionHTML += `</div>`;
        section.innerHTML = sectionHTML;
        container.appendChild(section);
    });
}

/**
 * Scroll Logic
 */
function initScrollLogic() {
    const scrollPercentage = document.getElementById('scroll-percentage');
    const scrollBar = document.getElementById('scroll-bar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        // Update scroll progress
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercentage) scrollPercentage.textContent = `${progress}%`;
        if (scrollBar) scrollBar.style.width = `${progress}%`;
        
        // Update active nav link
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
            
            if (isVisible) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    link.classList.toggle('active', href === `#${section.id}`);
                });
            }
        });
    });
    
    // Image reveal on scroll
    const revealImages = document.querySelectorAll('.reveal-img');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.2 });
    
    revealImages.forEach(img => observer.observe(img));
}

/**
 * Audio Management
 */
function initAudioManagement() {
    const audioUI = document.getElementById('audio-ui');
    const muteBtn = document.getElementById('master-mute');
    
    if (muteBtn) {
        muteBtn.onclick = () => {
            isMuted = !isMuted;
            if (currentAudio) {
                currentAudio.muted = isMuted;
            }
            updateMuteIcon();
        };
    }
    
    // Expose audio controls globally
    window.toggleAudio = function(url, title, desc) {
        if (!audioUI) return;
        
        audioUI.classList.remove('hidden');
        
        if (currentAudio && currentAudio.src === url && !currentAudio.paused) {
            currentAudio.pause();
            currentAudio = null;
            updateNowPlaying('Silence', 'Atmosphere Idle');
            muteBtn?.classList.remove('playing');
            return;
        }
        
        if (currentAudio) {
            currentAudio.pause();
        }
        
        currentAudio = new Audio(url);
        currentAudio.muted = isMuted;
        currentAudio.play().catch(console.error);
        
        updateNowPlaying(title, desc);
        muteBtn?.classList.add('playing');
        
        currentAudio.onended = () => {
            updateNowPlaying('Silence', 'Atmosphere Idle');
            muteBtn?.classList.remove('playing');
        };
    };
}

function updateNowPlaying(title, desc) {
    const titleEl = document.getElementById('now-playing-title');
    const descEl = document.getElementById('now-playing-desc');
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
}

function updateMuteIcon() {
    const icon = document.getElementById('mute-icon');
    if (icon) {
        icon.setAttribute('data-lucide', isMuted ? 'volume-x' : 'volume-2');
        lucide.createIcons();
    }
}

/**
 * GSAP Animations
 */
function initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero content animation
    gsap.from('#hero-content > *', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Section animations
    gsap.utils.toArray('section[id]').forEach(section => {
        gsap.from(section.querySelectorAll('.prose-custom > *, .card-glass, .agent-card'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
        });
    });
    
    // Hero image parallax
    gsap.to('#hero-img', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 150,
        scale: 1.1
    });
}
