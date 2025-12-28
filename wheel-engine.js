/**
 * p5.js WEBGL Astrowheel Engine
 * 3D Zodiac Wheel with Particles, Starfield, and Drift Animation
 * Extracted from astro.ai Sanctuary Blueprint
 */

export const WheelConfig = {
  seed: 12345,
  
  // Colors (Sanctuary palette)
  ink: '#06070A',
  gold: '#D4AF37',
  gold2: '#B89A4A',
  ivory: '#E8E1D6',
  
  // Wheel geometry
  wheelRadius: 260,
  wheelTube: 12,
  innerScale: 0.85,
  
  // Animation
  rotSpeed: 0.0008,
  driftAmp: 0.22,
  driftFreqs: [0.11, 0.23, 0.13, 0.29],
  
  // Starfield
  starfieldCount: 4500,
  depth: 1200,
  
  // Orbit stars
  orbitCount: 60,
  orbitSize: 2.1,
  orbitSpeedMin: 0.0007,
  orbitSpeedMax: 0.0022,
  
  // Swarm particles
  swarmCount: 100,
  swarmSize: 5,
  swarmNoiseScale: 0.006,
  swarmOpacity: 0.6,
  
  // Zodiac glyphs
  glyphs: ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓']
};

/**
 * Convert hex color to RGB object
 */
function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return { r: 255, g: 255, b: 255 };
  return { 
    r: parseInt(m[1], 16), 
    g: parseInt(m[2], 16), 
    b: parseInt(m[3], 16) 
  };
}

/**
 * Map value from one range to another
 */
function mapRange(v, inMin, inMax, outMin, outMax) {
  return outMin + (outMax - outMin) * ((v - inMin) / (inMax - inMin));
}

/**
 * Compute drift rotation based on time
 */
function computeDrift(t, P) {
  const f = P.driftFreqs;
  const a = P.driftAmp;
  return {
    rx: a * (Math.sin(t * f[0]) * 0.6 + Math.cos(t * f[1]) * 0.4),
    ry: a * (Math.sin(t * f[2]) * 0.6 + Math.cos(t * f[3]) * 0.4),
    rz: a * (Math.sin(t * (f[0] + f[2]) * 0.5) * 0.25)
  };
}

/**
 * OrbitStar class - stars orbiting the wheel
 */
class OrbitStar {
  constructor(p, P) {
    this.p = p;
    this.P = P;
    this.axis = p5.Vector.random3D();
    this.angle = p.random(p.TWO_PI);
    this.speed = p.random(P.orbitSpeedMin, P.orbitSpeedMax);
    this.radius = P.wheelRadius * p.random(1.05, 1.35);
    this.phase = p.random(1000);
  }
  
  update() {
    this.angle += this.speed;
  }
  
  display() {
    const p = this.p;
    const P = this.P;
    const px = Math.cos(this.angle) * this.radius;
    const py = Math.sin(this.angle) * this.radius;
    
    p.push();
    p.rotateX(this.axis.x * Math.PI);
    p.rotateY(this.axis.y * Math.PI);
    p.rotateZ(this.axis.z * Math.PI);
    p.translate(px, py, Math.sin((p.frameCount + this.phase) * 0.01) * 18);
    
    const g = hexToRgb(P.gold);
    p.noStroke();
    p.fill(g.r, g.g, g.b, 180);
    p.sphere(P.orbitSize, 6, 6);
    p.pop();
  }
}

/**
 * SwarmParticle class - ambient floating particles
 */
class SwarmParticle {
  constructor(p, P) {
    this.p = p;
    this.P = P;
    this.base = p5.Vector.random3D().mult(p.random(120, 520));
    this.offset = p.random(1000);
    this.size = p.random(P.swarmSize * 0.7, P.swarmSize * 1.3);
    this.pos = p.createVector(0, 0, 0);
  }
  
  update() {
    const p = this.p;
    const P = this.P;
    const tt = (p.frameCount * 0.01) + this.offset;
    const ns = P.swarmNoiseScale;
    
    this.pos = p.createVector(
      (p.noise(this.base.x * ns, tt) - 0.5) * 900,
      (p.noise(this.base.y * ns, tt + 50) - 0.5) * 900,
      (p.noise(this.base.z * ns, tt + 100) - 0.5) * 900
    );
  }
  
  display() {
    const p = this.p;
    const P = this.P;
    const m = hexToRgb(P.gold2);
    
    p.push();
    p.translate(this.pos.x, this.pos.y, this.pos.z);
    p.noStroke();
    p.fill(m.r, m.g, m.b, 255 * P.swarmOpacity);
    p.sphere(this.size, 6, 6);
    p.pop();
  }
}

/**
 * Mount the Astrowheel to a container
 * @param {string} containerId - ID of the container element
 * @param {object} customConfig - Optional config overrides
 */
export function mountAstrowheel(containerId, customConfig = {}) {
  const container = document.getElementById(containerId);
  if (!container || !window.p5) {
    console.error('Astrowheel: Container or p5.js not found');
    return null;
  }
  
  const P = { ...WheelConfig, ...customConfig };
  
  const getW = () => container.clientWidth || window.innerWidth;
  const getH = () => Math.floor(window.innerHeight * 0.60);
  
  const sketch = (p) => {
    let orbitStars = [];
    let swarm = [];
    let starfield = [];
    
    // Initialize starfield
    function initStarfield() {
      starfield = [];
      for (let i = 0; i < P.starfieldCount; i++) {
        starfield.push({
          x: p.random(-1000, 1000),
          y: p.random(-1000, 1000),
          z: p.random(-P.depth, P.depth),
          tw: p.random(0.2, 1.0)
        });
      }
    }
    
    // Initialize orbit stars
    function initOrbit() {
      orbitStars = [];
      for (let i = 0; i < P.orbitCount; i++) {
        orbitStars.push(new OrbitStar(p, P));
      }
    }
    
    // Initialize swarm
    function initSwarm() {
      swarm = [];
      for (let i = 0; i < P.swarmCount; i++) {
        swarm.push(new SwarmParticle(p, P));
      }
    }
    
    // Render starfield
    function renderStarfield() {
      const iv = hexToRgb(P.ivory);
      p.noStroke();
      
      for (const s of starfield) {
        const dz = Math.abs(s.z);
        const a = mapRange(dz, 200, P.depth, 220, 0);
        
        p.push();
        p.translate(s.x, s.y, s.z);
        p.fill(iv.r, iv.g, iv.b, Math.max(0, a) * s.tw);
        p.sphere(0.9, 4, 4);
        p.pop();
      }
    }
    
    // Render main wheel
    function renderWheel() {
      const g = hexToRgb(P.gold);
      const m = hexToRgb(P.gold2);
      
      // Glow layer
      p.push();
      p.noStroke();
      p.fill(g.r, g.g, g.b, 40);
      p.torus(P.wheelRadius, P.wheelTube * 1.9, 40, 18);
      p.pop();
      
      // Main ring
      p.push();
      p.noStroke();
      p.fill(g.r, g.g, g.b, 160);
      p.torus(P.wheelRadius, P.wheelTube, 48, 22);
      p.pop();
      
      // Inner ring
      p.push();
      p.noStroke();
      p.fill(m.r, m.g, m.b, 90);
      p.torus(P.wheelRadius * P.innerScale, Math.max(4, P.wheelTube * 0.35), 36, 16);
      p.pop();
      
      // Glyphs
      p.push();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(22);
      p.fill(g.r, g.g, g.b, 205);
      
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * p.TWO_PI;
        const x = Math.cos(ang) * P.wheelRadius;
        const y = Math.sin(ang) * P.wheelRadius;
        const z = Math.sin(ang * 3.0 + p.frameCount * 0.005) * 14;
        
        p.push();
        p.translate(x, y, z);
        p.rotateZ(ang + p.HALF_PI);
        p.rotateY(-0.25);
        p.text(P.glyphs[i], 0, 0);
        p.pop();
      }
      p.pop();
    }
    
    // Resize handler
    function resize() {
      const w = getW();
      const h = getH();
      p.resizeCanvas(w, h);
      P.wheelRadius = Math.min(w, h) * 0.36;
      P.wheelTube = Math.max(9, Math.min(w, h) * 0.018);
    }
    
    // p5.js setup
    p.setup = () => {
      p.createCanvas(getW(), getH(), p.WEBGL);
      p.pixelDensity(1);
      p.randomSeed(P.seed);
      p.noiseSeed(P.seed);
      
      P.wheelRadius = Math.min(getW(), getH()) * 0.36;
      P.wheelTube = Math.max(9, Math.min(getW(), getH()) * 0.018);
      
      initStarfield();
      initOrbit();
      initSwarm();
      
      window.addEventListener('resize', resize);
    };
    
    // p5.js draw loop
    p.draw = () => {
      // Ink overlay for motion blur trails
      p.push();
      p.resetMatrix();
      p.translate(-p.width / 2, -p.height / 2);
      const bg = hexToRgb(P.ink);
      p.noStroke();
      p.fill(bg.r, bg.g, bg.b, 18);
      p.rect(0, 0, p.width, p.height);
      p.pop();
      
      // Render starfield (static)
      renderStarfield();
      
      // Apply drift rotation
      const t = p.frameCount;
      const d = computeDrift(t, P);
      
      p.push();
      p.rotateX(d.rx);
      p.rotateY(d.ry);
      p.rotateZ(d.rz);
      
      // Wheel rotation
      p.rotateZ(t * P.rotSpeed);
      renderWheel();
      
      // Update and render orbit stars
      for (const s of orbitStars) {
        s.update();
        s.display();
      }
      
      // Update and render swarm
      for (const sp of swarm) {
        sp.update();
        sp.display();
      }
      
      p.pop();
    };
  };
  
  // Create p5 instance
  return new p5(sketch, container);
}
