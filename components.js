export const renderERT = (text) => {
    const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `
        <div class="ert-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            <i data-lucide="clock" class="w-3 h-3"></i>
            Reading Time: ${minutes} min
        </div>
    `;
};

export const renderAudioToggle = (id, audioUrl, title, desc) => {
    return `
        <button class="audio-trigger group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all" 
                data-audio="${audioUrl}" 
                data-title="${title}" 
                data-desc="${desc}"
                aria-label="Play ${title} audio"
                role="button">
            <div class="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <i data-lucide="play" class="w-4 h-4 play-icon"></i>
            </div>
            <div class="text-left">
                <p class="text-[10px] uppercase tracking-widest text-zinc-500 leading-none mb-1">Atmosphere</p>
                <p class="text-xs font-bold text-white leading-none">${title}</p>
            </div>
        </button>
    `;
};

export const renderModuleHeader = (module) => {
    return `
        <div class="mb-12">
            ${renderERT(module.content)}
            <p class="text-[10px] font-bold tracking-[0.4em] uppercase text-indigo-400 mb-4">Module / ${module.id.toUpperCase()}</p>
            <h3 class="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">${module.title}</h3>
            <p class="text-xl md:text-2xl font-serif text-zinc-500 italic">${module.subtitle}</p>
        </div>
    `;
};

export const renderCaseStudy = (study) => {
    return `
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-32 group">
            <div class="${study.name === 'Sanctuary' ? 'lg:order-last' : ''}">
                <div class="relative rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
                    <img data-src="${study.img}" 
                         class="lazy-img reveal-img w-full h-auto loading" 
                         alt="${study.name} app emotional vibecoding moodboard"
                         loading="lazy"
                         onerror="this.src='https://placehold.co/1024x1024/0a0a0a/6366f1?text=Image+Unavailable'">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
            </div>
            <div class="p-8">
                <span class="text-[10px] font-bold tracking-[0.3em] uppercase text-indigo-500 mb-4 block">${study.archetype}</span>
                <h4 class="text-4xl font-bold text-white mb-6">${study.name} Audit</h4>
                <p class="text-zinc-400 text-lg leading-relaxed mb-8">${study.desc}</p>
                ${renderAudioToggle(study.name, study.audio, study.audioTitle, study.name + " Soundscape")}
            </div>
        </div>
    `;
};
