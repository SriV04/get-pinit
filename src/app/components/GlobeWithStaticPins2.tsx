'use client';

import { useEffect, useRef } from 'react';
import createGlobe, { COBEOptions } from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';

type Drop = {
  id: number;
  type: DropType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  size: number;
  rotation: number;
  spin: number;
  mass: number;
  windPhase: number;
};

type Pin = {
  lat: number;
  lon: number;
  createdAt: number;
  name: string;
};

type BlastParticle = {
  angle: number;
  speed: number;
  radius: number;
};

type Blast = {
  lat: number;
  lon: number;
  createdAt: number;
  particles: BlastParticle[];
};

type TextboxHitbox = {
  pin: Pin;
  x: number;
  y: number;
  width: number;
  height: number;
  url: string;
};

type DropType = {
  name: string;
  emoji: string;
  imageSrc?: string;
  weight: number;
};

const DROP_TYPES: DropType[] = [
  { name: 'burger', emoji: '🍔', weight: 0.4 },
  { name: 'disco', emoji: '🪩', weight: 0.2 },
  { name: 'pint', emoji: '🍺', weight: 0.25 },
  { name: 'tiktok', emoji: '🎵', imageSrc: '/tiktok-logo.png', weight: 0.15 },
];

const RESTAURANT_NAMES = [
  'Gymkhana',
  'Crunch',
  'Kiln',
  'Luso',
  'Bottarga',
  'Luso',
  'Caso de frango',
];

const RESTAURANT_URLS: Record<string, string> = {
  'gymkhana': 'https://gymkhanarestaurants.com/',
  'crunch': 'https://www.sandwichuprising.com/',
  'kiln': 'https://kilnsoho.com/',
  'luso': 'https://luso.restaurant/',
  'bottarga': 'https://bottarga.london/',
};

const getRestaurantUrl = (name: string): string | null => {
  const key = name.toLowerCase();
  return RESTAURANT_URLS[key] || null;
};

const MAX_DROPS = 2;
const GRAVITY = 720;
const DRAG = 0.12;
const WIND_STRENGTH = 16;
const ROTATION_SPEED = 0.12;
const BLAST_DURATION = 700;
const MOVEMENT_DAMPING = 1400;
const FIXED_THETA = 0;

const GLOBE_CONFIG: COBEOptions = {
  width: 1000,
  height: 1000,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 1,
  theta: 0,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.1, 0.1, 0.1],
  markerColor: [1, 1, 1],
  glowColor: [0.5, 0.5, 0.5],
  markers: [],
};

export function GlobeStaticPins2() {
  const cobeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const physicsCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const thetaRef = useRef(0.6);
  const phiRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const restaurantIndexRef = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (cobeCanvasRef.current) {
      cobeCanvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const canvas = cobeCanvasRef.current;
    if (!canvas) return;

    let width = 0;
    let phi = 0;

    const onResize = () => {
      width = canvas.offsetWidth;
    };

    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvas, {
      ...GLOBE_CONFIG,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        state.phi = phiRef.current + rs.get();
        state.theta = FIXED_THETA;
        state.width = width * 2;
        state.height = width * 2;
        state.markers = [];
      },
    });

    setTimeout(() => {
      canvas.style.opacity = '1';
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [rs]);

  useEffect(() => {
    const canvas = physicsCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let radius = 0;
    let centerX = 0;
    let centerY = 0;
    let animationFrame = 0;
    let lastTime = performance.now();
    let nextDropAt = 0;
    let isVisible = true;
    let maxPins = width >= 768 ? 4 : 2;

    const drops: Drop[] = [];
    const pins: Pin[] = [];
    const blasts: Blast[] = [];
    const textboxHitboxes: TextboxHitbox[] = [];
    let pointerDownPos: { x: number; y: number } | null = null;
    let hoveredPin: Pin | null = null;
    let hoverStartTime: number = 0;

    const pinImage = new Image();
    pinImage.src = '/Pinit Pin.png';
    pinImage.decoding = 'async';
    const dropImages = new Map<string, HTMLImageElement>();
    DROP_TYPES.forEach((type) => {
      if (!type.imageSrc) return;
      const image = new Image();
      image.src = type.imageSrc;
      image.decoding = 'async';
      dropImages.set(type.name, image);
    });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      if (cobeCanvasRef.current) {
        width = cobeCanvasRef.current.offsetWidth;
        height = cobeCanvasRef.current.offsetHeight;
      }
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = width * 0.5 * 0.84;
      centerX = width / 2;
      centerY = width / 2;

      // Update max pins based on window width
      maxPins = width >= 768 ? 4 : 2;

      // Trim pins array if it exceeds new limit
      while (pins.length > maxPins) {
        pins.shift();
      }
    };

    const pickDropType = () => {
      const total = DROP_TYPES.reduce((sum, type) => sum + type.weight, 0);
      let roll = Math.random() * total;
      for (const type of DROP_TYPES) {
        roll -= type.weight;
        if (roll <= 0) return type;
      }
      return DROP_TYPES[0];
    };

    const spawnDrop = (now: number) => {
      const size = 28 + Math.random() * 18;
      const type = pickDropType();
      drops.push({
        id: now + Math.random(),
        type,
        x: width * (0.2 + Math.random() * 0.2),
        y: -size,
        vx: (Math.random() - 0.5) * 30,
        vy: 20 + Math.random() * 40,
        radius: size * 0.5,
        size,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 2.4,
        mass: 0.8 + Math.random() * 0.6,
        windPhase: Math.random() * Math.PI * 2,
      });
    };

    const spawnBlast = (lat: number, lon: number, now: number) => {
      const particles = Array.from({ length: 8 }).map(() => ({
        angle: Math.random() * Math.PI * 2,
        speed: 40 + Math.random() * 60,
        radius: 2 + Math.random() * 3,
      }));
      blasts.push({ lat, lon, createdAt: now, particles });
    };

    const handleImpact = (drop: Drop, now: number) => {
      // Map the impact point on the sphere into lat/lon coordinates.
      const nx = (drop.x - centerX) / radius;
      const ny = (centerY - drop.y) / radius;
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      const lat = Math.asin(ny);
      const lon = Math.atan2(nx, nz) - phiRef.current;

      const restaurantName = RESTAURANT_NAMES[restaurantIndexRef.current];
      restaurantIndexRef.current = (restaurantIndexRef.current + 1) % RESTAURANT_NAMES.length;

      pins.push({ lat, lon, createdAt: now, name: restaurantName });
      if (pins.length > maxPins) {
        pins.shift();
      }
      spawnBlast(lat, lon, now);
    };

    const updatePhysics = (dt: number, now: number) => {
      // Basic physics integrator: v += a * dt, x += v * dt with drag + wind.
      if (drops.length < MAX_DROPS && now > nextDropAt) {
        spawnDrop(now);
        nextDropAt = now + 3000 + Math.random() * 1800;
      }

      const wind = Math.sin(now * 0.0006) * WIND_STRENGTH;

      for (let i = drops.length - 1; i >= 0; i -= 1) {
        const drop = drops[i];
        const drag = Math.max(0, 1 - DRAG * dt);
        const gust = Math.sin(now * 0.001 + drop.windPhase) * 6;
        drop.vx += ((wind + gust) / drop.mass) * dt;
        drop.vx *= drag;
        drop.vy += GRAVITY * drop.mass * dt;
        drop.x += drop.vx * dt;
        drop.y += drop.vy * dt;
        drop.rotation += drop.spin * dt;

        const dx = drop.x - centerX;
        const dy = drop.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Impact detection: drop center crosses inside the globe surface.
        if (dy < 0 && dist <= radius - drop.radius * 0.4) {
          handleImpact(drop, now);
          drops.splice(i, 1);
          continue;
        }

        if (drop.y - drop.radius > height + radius) {
          drops.splice(i, 1);
        }
      }
    };

    const drawPin = (pin: Pin, now: number) => {
      // Pin positions are stored in globe coordinates and re-projected each frame.
      if (!pinImage.complete) return;
      const lon = pin.lon + phiRef.current;
      const cosLat = Math.cos(pin.lat);
      const x = Math.sin(lon) * cosLat;
      const z = Math.cos(lon) * cosLat;
      const y = Math.sin(pin.lat);

      if (z <= 0) return;

      const screenX = centerX + x * radius;
      const screenY = centerY - y * radius;
      const baseSize = 64 * (0.65 + z * 0.35);
      const age = Math.min(1, (now - pin.createdAt) / 280);
      const pop = 0.85 + 0.2 * Math.sin(age * Math.PI);

      // Add hover pop animation
      let hoverScale = 1;
      if (pin === hoveredPin) {
        const hoverAge = Math.min(1, (now - hoverStartTime) / 250);
        const hoverBounce = 1.08 + 0.08 * Math.sin(hoverAge * Math.PI);
        hoverScale = hoverBounce;
      }

      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.scale(pop * hoverScale, pop * hoverScale);
      ctx.drawImage(pinImage, -baseSize * 0.4, -baseSize, baseSize * 0.8, baseSize);
      ctx.restore();

      // Draw label above the pin
      ctx.save();
      const labelY = screenY - baseSize * 1.2 * pop * hoverScale;
      const fontSize = Math.round(14 * (0.7 + z * 0.3) * hoverScale);
      ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Measure text for background box
      const textMetrics = ctx.measureText(pin.name);
      const textWidth = textMetrics.width;
      const paddingX = 8 * hoverScale;
      const paddingY = 5 * hoverScale;
      const boxWidth = textWidth + paddingX * 2;
      const boxHeight = fontSize + paddingY * 2;
      const borderRadius = 6 * hoverScale;

      // Draw rounded rectangle background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.beginPath();
      ctx.moveTo(screenX - boxWidth / 2 + borderRadius, labelY - boxHeight / 2);
      ctx.lineTo(screenX + boxWidth / 2 - borderRadius, labelY - boxHeight / 2);
      ctx.quadraticCurveTo(screenX + boxWidth / 2, labelY - boxHeight / 2, screenX + boxWidth / 2, labelY - boxHeight / 2 + borderRadius);
      ctx.lineTo(screenX + boxWidth / 2, labelY + boxHeight / 2 - borderRadius);
      ctx.quadraticCurveTo(screenX + boxWidth / 2, labelY + boxHeight / 2, screenX + boxWidth / 2 - borderRadius, labelY + boxHeight / 2);
      ctx.lineTo(screenX - boxWidth / 2 + borderRadius, labelY + boxHeight / 2);
      ctx.quadraticCurveTo(screenX - boxWidth / 2, labelY + boxHeight / 2, screenX - boxWidth / 2, labelY + boxHeight / 2 - borderRadius);
      ctx.lineTo(screenX - boxWidth / 2, labelY - boxHeight / 2 + borderRadius);
      ctx.quadraticCurveTo(screenX - boxWidth / 2, labelY - boxHeight / 2, screenX - boxWidth / 2 + borderRadius, labelY - boxHeight / 2);
      ctx.closePath();
      ctx.fill();

      // Draw text shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillText(pin.name, screenX + hoverScale, labelY + hoverScale);

      // Draw text
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(pin.name, screenX, labelY);

      // Capture hitbox for click detection (only if visible on front of globe)
      if (z > 0) {
        const url = getRestaurantUrl(pin.name);
        if (url) {
          textboxHitboxes.push({
            pin,
            x: screenX,
            y: labelY,
            width: boxWidth,
            height: boxHeight,
            url,
          });
        }
      }

      ctx.restore();
    };

    const drawBlast = (blast: Blast, now: number) => {
      // Blast timing drives ring expansion + particle burst.
      const elapsed = now - blast.createdAt;
      if (elapsed > BLAST_DURATION) return;

      const t = elapsed / BLAST_DURATION;
      const lon = blast.lon + phiRef.current;
      const cosLat = Math.cos(blast.lat);
      const x = Math.sin(lon) * cosLat;
      const z = Math.cos(lon) * cosLat;
      const y = Math.sin(blast.lat);

      if (z <= 0) return;

      const screenX = centerX + x * radius;
      const screenY = centerY - y * radius;
      const ringRadius = 8 + t * 28;

      ctx.save();
      ctx.globalAlpha = 1 - t;
      ctx.strokeStyle = 'rgba(255, 230, 184, 0.9)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(screenX, screenY, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 197, 246, 0.9)';
      blast.particles.forEach((particle) => {
        const px = screenX + Math.cos(particle.angle) * particle.speed * t;
        const py = screenY - Math.sin(particle.angle) * particle.speed * t;
        ctx.beginPath();
        ctx.arc(px, py, particle.radius * (1 - t), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const drawDrop = (drop: Drop) => {
      const image = dropImages.get(drop.type.name);
      if (image && image.complete && image.naturalWidth > 0) {
        ctx.save();
        ctx.translate(drop.x, drop.y);
        ctx.rotate(drop.rotation);
        ctx.drawImage(image, -drop.size * 0.5, -drop.size * 0.5, drop.size, drop.size);
        ctx.restore();
        return;
      }

      ctx.save();
      ctx.translate(drop.x, drop.y);
      ctx.rotate(drop.rotation);
      ctx.font = `${drop.size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(drop.type.emoji, 0, 0);
      ctx.restore();
    };

    const hitTestTextboxes = (clientX: number, clientY: number): TextboxHitbox | null => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      for (let i = textboxHitboxes.length - 1; i >= 0; i--) {
        const box = textboxHitboxes[i];
        const halfWidth = box.width / 2;
        const halfHeight = box.height / 2;

        if (
          x >= box.x - halfWidth &&
          x <= box.x + halfWidth &&
          y >= box.y - halfHeight &&
          y <= box.y + halfHeight
        ) {
          return box;
        }
      }

      return null;
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointerDownPos = { x: event.clientX, y: event.clientY };
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!pointerDownPos) return;

      const dx = event.clientX - pointerDownPos.x;
      const dy = event.clientY - pointerDownPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Click threshold: < 5px movement
      if (distance < 5) {
        const hitbox = hitTestTextboxes(event.clientX, event.clientY);
        if (hitbox?.url) {
          window.open(hitbox.url, '_blank', 'noopener,noreferrer');
        }
      }

      pointerDownPos = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const hitbox = hitTestTextboxes(event.clientX, event.clientY);
      canvas.style.cursor = hitbox ? 'pointer' : 'default';

      // Track hovered pin for animation
      if (hitbox && hitbox.pin !== hoveredPin) {
        hoveredPin = hitbox.pin;
        hoverStartTime = performance.now();
      } else if (!hitbox && hoveredPin !== null) {
        hoveredPin = null;
      }
    };

    const render = (now: number) => {
      if (!isVisible) {
        lastTime = now;
        animationFrame = window.requestAnimationFrame(render);
        return;
      }

      const dt = Math.min(0.04, (now - lastTime) / 1000);
      lastTime = now;

      // Only rotate when not dragging
      if (pointerInteracting.current === null) {
        phiRef.current = (phiRef.current + ROTATION_SPEED * dt) % (Math.PI * 2);
      }
      updatePhysics(dt, now);

      ctx.clearRect(0, 0, width, height);
      textboxHitboxes.length = 0; // Clear hitboxes for this frame

      pins.forEach((pin) => drawPin(pin, now));
      blasts.forEach((blast) => drawBlast(blast, now));
      for (let i = blasts.length - 1; i >= 0; i -= 1) {
        if (now - blasts[i].createdAt > BLAST_DURATION) {
          blasts.splice(i, 1);
        }
      }

      drops.forEach(drawDrop);

      animationFrame = window.requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );

    observer.observe(canvas);
    resize();
    animationFrame = window.requestAnimationFrame(render);
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="hero-canvas">
      <canvas
        ref={cobeCanvasRef}
        className="absolute inset-0 size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        style={{ cursor: 'grab' }}
        onPointerDown={(event) => {
          pointerInteracting.current = event.clientX;
          updatePointerInteraction(event.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(event) => updateMovement(event.clientX)}
        onTouchMove={(event) => event.touches[0] && updateMovement(event.touches[0].clientX)}
      />
      <canvas
        ref={physicsCanvasRef}
        className="absolute inset-0 size-full"
        aria-label="Restaurant locations on globe"
      />
    </div>
  );
}