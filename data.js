export const NAVIGATION = [
    { id: 'summary', label: 'Executive Summary', icon: 'file-text' },
    { id: 'technologies', label: 'Technical Architectures', icon: 'cpu' },
    { id: 'vibecoding', label: 'Emotional Vibecoding', icon: 'zap' },
    { id: 'market', label: 'The Mysticism Economy', icon: 'bar-chart' },
    { id: 'spirituality', label: 'Digital Spirituality', icon: 'eye' },
    { id: 'synthesis', label: 'Machine Synthesis', icon: 'database' }
];

export const MODULES = {
    summary: {
        id: 'summary',
        title: "The New Digital Spirituality",
        subtitle: "From Pews to Pixels",
        audio: "https://v3b.fal.media/files/b/0a87ace1/oQV_wxyKJf00h2qUI8dnC_output.mp3",
        audioDesc: "Executive Narrative",
        content: `
            <h4>The Rise of Hyper-Individualized Destiny</h4>
            <p>The 21st century has witnessed a tectonic migration of the "sacred" from communal, stone-and-mortar structures to the fluid, high-resolution interfaces of the smartphone. This is not merely a change in medium, but a fundamental transformation of the spiritual object. Where traditional religion offered a *Universal Narrative* (the salvation of the many), Digital Spirituality offers a <strong>Hyper-Individualized Destiny</strong> (the optimization of the self).</p>
            
            <h4>The Post-Religious Vacuum and the Algorithmic Savior</h4>
            <p>As organized religion experiences a decline in the West, the psychological need for *Teleology*—the sense that life has a purpose or direction—remains. For Gen Z and Millennials, the algorithm functions as a secular surrogate for divine providence. Unlike the "judgmental" God of the Old Testament, the Algorithm is perceived as an "Objective Mirror."</p>
            
            <blockquote>"The user is no longer a random biological accident in a cold universe; they are a specific data point in a celestial orchestration."</blockquote>
            
            <p>Astrology apps act as "non-judgmental scripture." They provide a framework for moral and psychological inquiry without the baggage of institutional dogma. Worship has shifted inward. Spiritual practice is now synonymous with "Self-Care" and "Self-Optimization." The natal chart is the new soul-map, and the daily transit is the new liturgy.</p>
        `,
        stats: [
            { label: "SBNR Identification", value: "77%", sub: "Gen Z Population" },
            { label: "App Retention", value: "3.2x", sub: "vs Social Average" }
        ]
    },
    technologies: {
        id: 'technologies',
        title: "Technical Architectures",
        subtitle: "From Ephemeris to Vibecode",
        image: "https://r2-bucket.flowith.net/f/9f39e0e8353fe395/ai_astrology_personalization_pipeline_index_0%401024x1024.jpeg",
        content: `
            <h4>The Data-to-Insight Pipeline</h4>
            <p>The modern astrology app is a high-fidelity data processing engine. The technical challenge lies in bridging the gap between objective astronomical data (where a planet is) and subjective psychological insight (what that means for the user). This transformation occurs through a multi-staged pipeline that integrates precision physics with probabilistic linguistics.</p>
            
            <h4>1. High-Fidelity Data Acquisition</h4>
            <p>At the foundation is the <strong>NASA Jet Propulsion Laboratory (JPL) Development Ephemeris</strong> or the Swiss Ephemeris. These are the gold standards for celestial mechanics, calculating positions with sub-arcsecond accuracy across a 10,000-year range.</p>
            
            <h4>2. The LLM Interpretation Layer</h4>
            <p>The most significant shift is the transition from "Static String Templates" to "Generative Symbolic Intelligence." Modern apps leverage GPT-4 or Claude 3.5 Sonnet to synthesize multiple transits into a singular, cohesive "vibe."</p>
            
            <p>The pipeline logic maps input (Real-time transit data) through contextual injection (User behavior) and prompt engineering (Persona constraints) to inference unique text outputs that bypass the Barnum Effect through hyper-specificity.</p>
        `,
        features: [
            { title: "NASA JPL Precision", desc: "Real-time celestial tracking with gravitational deflection correction." },
            { title: "NLP Symbology", desc: "Large Language Models mapping mathematical transits to narrative prose." },
            { title: "Social Graph Synastry", desc: "High-concurrency compatibility calculations across millions of nodes." }
        ]
    },
    vibecoding: {
        id: 'vibecoding',
        title: "Emotional Vibecoding",
        subtitle: "Aesthetic Crypticism vs. The A.I. Concierge",
        content: `
            <p>Vibecoding is the practice of embedding specific psychological triggers into the code and UI of a digital experience. In the astrology market, this has led to two divergent archetypes of "Algorithmic Intimacy."</p>
        `,
        caseStudies: [
            {
                name: "Co-Star",
                archetype: "The Brutalist Oracle",
                audio: "https://v3b.fal.media/files/b/0a87ace1/ogyv-lvLHdTf4z8MRs5D5_output_20251225044259_0.wav",
                audioTitle: "Industrial Drone",
                desc: "Success lies in Aesthetic Crypticism. Utilizing a high-contrast, black-and-white, minimalist UI, it evokes the feeling of a Gothic Oracle. It uses 'friction' as a marker of authenticity—biting truths that trigger psychological loops of validation seeking.",
                img: "https://r2-bucket.flowith.net/f/16b758d47f796119/co_star_app_emotional_vibecoding_moodboard_index_1%401024x1024.png"
            },
            {
                name: "Sanctuary",
                archetype: "The Emotional Concierge",
                audio: "https://v3b.fal.media/files/b/0a87ace2/c8xIwT-BJCuS8hBjwFbgZ_output_20251225044306_0.wav",
                audioTitle: "Ethereal Celestial",
                desc: "Employs a Low-Friction, High-Support model. UI is saturated, playful, and nature-themed, signaling safety. Positions itself as an 'Emotional Assistant' with human-in-the-loop scalability.",
                img: "https://r2-bucket.flowith.net/f/52675f0c7eb27b90/sanctuary_app_mood_board_index_2%401024x1024.png"
            }
        ]
    },
    market: {
        id: 'market',
        title: "The Mysticism Economy",
        subtitle: "A $22.8 Billion Growth Trajectory",
        content: `
            <h4>Demographic Drivers: The GenZennial Pivot</h4>
            <p>Astrology has transitioned from a fringe belief system to a core pillar of the Global Wellness Market. Valued at $2.28 billion in 2021, the industry is projected to reach $22.8 billion by 2030.</p>
            <p>The primary consumers are not looking for fortune-telling; they are engaged in <strong>Identity Construction</strong>. In an era of polycrisis, astrology provides a therapy-adjacent framework for self-reflection.</p>
        `,
        chartData: {
            labels: ['2021', '2023', '2025', '2027', '2029', '2030'],
            values: [2.2, 4.8, 8.5, 14.2, 19.8, 22.8]
        }
    },
    synthesis: {
        id: 'synthesis',
        title: "The Machine-Age Synthesis",
        subtitle: "Reclaiming Fate in the Code",
        content: `
            <h4>Bridging Ptolemy with Probability</h4>
            <p>The final synthesis requires a reconciliation between ancient determinism and modern statistical science. We are moving from a world of Absolute Fate to a world of <strong>Statistical Propensity</strong>.</p>
            
            <p>Ptolemy’s rigor believed Mars 'heated' the blood. Modern code uses Mars transits as a trigger for high-energy content delivery. The ancient belief in the Music of the Spheres is reborn in the 'Loss Function' of a neural network—a search for perfect mathematical alignment between data and reality.</p>
            
            <blockquote>"Fate is updated. We are no longer passive victims of destiny; we are agents interacting with a cosmic weather report."</blockquote>
        `
    }
};
