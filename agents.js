/**
 * AI Agents Configuration
 * ElevenLabs Voice AI Integration for Algorhythmic Firmament
 */

export const AGENTS = [
  {
    id: 'li-wei',
    name: 'Li Wei',
    title: 'Der Astrologe',
    subtitle: 'BaZi & Westliche Synthese',
    specialty: 'Verbindet die Weisheit des chinesischen BaZi mit der westlichen Astrologie. Präzise Berechnungen, nüchterne Analyse, strategische Klarheit.',
    elevenLabsId: 'agent_7201kdfx0mm1f8v9gfkn22txr0cw',
    widgetSrc: 'https://unpkg.com/@elevenlabs/convai-widget-embed',
    // Portrait will be generated
    portrait: null,
    color: '#4A90A4', // Teal accent
    icon: '陰陽'
  },
  {
    id: 'levi',
    name: 'Levi',
    title: 'Der Navigator',
    subtitle: 'Präzise Guidance & klare Handlungsschritte',
    specialty: 'Verbindet taktisches Denken mit astrologischem Überblick. Liefert klare, handlungsorientierte Antworten.',
    elevenLabsId: 'agent_9001kdhah7vrfh3rd05pakg8vppk',
    widgetSrc: 'https://unpkg.com/@elevenlabs/convai-widget-embed',
    portrait: null,
    color: '#9B59B6', // Purple accent
    icon: '✧'
  }
];

/**
 * Agent Selection State
 */
let activeAgentId = null;
let widgetLoaded = false;

/**
 * Get agent by ID
 */
export function getAgent(id) {
  return AGENTS.find(a => a.id === id);
}

/**
 * Get currently active agent
 */
export function getActiveAgent() {
  return activeAgentId ? getAgent(activeAgentId) : null;
}

/**
 * Set active agent and load widget
 */
export function setActiveAgent(id, containerSelector = '#active-widget-container') {
  const agent = getAgent(id);
  if (!agent) {
    console.error(`Agent not found: ${id}`);
    return false;
  }
  
  activeAgentId = id;
  loadAgentWidget(agent, containerSelector);
  return true;
}

/**
 * Load ElevenLabs widget for agent
 */
function loadAgentWidget(agent, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container not found: ${containerSelector}`);
    return;
  }
  
  // Clear previous widget
  container.innerHTML = '';
  
  // Create widget element
  const widget = document.createElement('elevenlabs-convai');
  widget.setAttribute('agent-id', agent.elevenLabsId);
  
  // Add widget to container
  container.appendChild(widget);
  
  // Load script if not already loaded
  if (!document.querySelector(`script[src="${agent.widgetSrc}"]`)) {
    const script = document.createElement('script');
    script.src = agent.widgetSrc;
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }
  
  widgetLoaded = true;
  
  // Dispatch event for UI updates
  window.dispatchEvent(new CustomEvent('agent-loaded', { detail: agent }));
}

/**
 * Render agent selection grid
 */
export function renderAgentGrid(containerSelector, onSelect) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  container.innerHTML = '';
  
  for (const agent of AGENTS) {
    const card = document.createElement('div');
    card.className = `agent-card ${agent.id === activeAgentId ? 'active' : ''}`;
    card.tabIndex = 0;
    card.dataset.agentId = agent.id;
    card.style.setProperty('--agent-accent', agent.color);
    
    card.innerHTML = `
      <div class="agent-icon">${agent.icon}</div>
      <div class="agent-info">
        <h3 class="agent-name">${agent.name}</h3>
        <p class="agent-title">${agent.title}</p>
        <p class="agent-subtitle">${agent.subtitle}</p>
      </div>
      <div class="agent-specialty">${agent.specialty}</div>
      <div class="agent-badge">
        <span class="badge-ai">AI Voice</span>
      </div>
    `;
    
    // Click handler
    card.addEventListener('click', () => {
      if (onSelect) onSelect(agent);
    });
    
    // Keyboard handler
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onSelect) onSelect(agent);
      }
    });
    
    container.appendChild(card);
  }
}

/**
 * Update grid selection state
 */
export function updateAgentGridSelection(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  container.querySelectorAll('.agent-card').forEach(card => {
    card.classList.toggle('active', card.dataset.agentId === activeAgentId);
  });
}
