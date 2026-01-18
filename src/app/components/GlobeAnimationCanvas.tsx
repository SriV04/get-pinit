'use client';

import { useEffect, useRef } from 'react';

type Drop = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  spin: number;
  mass: number;
  windPhase: number;
};

type Pin = {
  lat: number;
  lon: number;
  createdAt: number;
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

const MAX_DROPS = 8;
const GRAVITY = 720;
const DRAG = 0.12;
const WIND_STRENGTH = 16;
const ROTATION_SPEED = 0.12;
const BLAST_DURATION = 700;

export function GlobeAnimationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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
    let rotation = 0;
    let nextDropAt = 0;

    const drops: Drop[] = [];
    const pins: Pin[] = [];
    const blasts: Blast[] = [];

    const earthTexture = createEarthTexture();
    const pinImage = new Image();
    pinImage.src = '/Pinit Pin.png';
    pinImage.decoding = 'async';

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = width * 0.75;
      centerX = width / 2;
      centerY = height + radius * 0.38;
    };

    const spawnDrop = (now: number) => {
      const size = 28 + Math.random() * 18;
      drops.push({
        id: now + Math.random(),
        x: width * (0.15 + Math.random() * 0.7),
        y: -size,
        vx: (Math.random() - 0.5) * 30,
        vy: 20 + Math.random() * 40,
        radius: size * 0.5,
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
      const lon = Math.atan2(nx, nz) - rotation;

      pins.push({ lat, lon, createdAt: now });
      if (pins.length > 14) {
        pins.shift();
      }
      spawnBlast(lat, lon, now);
    };

    const updatePhysics = (dt: number, now: number) => {
      // Basic physics integrator: v += a * dt, x += v * dt with drag + wind.
      if (drops.length < MAX_DROPS && now > nextDropAt) {
        spawnDrop(now);
        nextDropAt = now + 700 + Math.random() * 800;
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

    const drawGlobe = () => {
      ctx.save();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#2d0f44';
      ctx.fill();

      const step = Math.max(1.5, radius / 320);
      for (let x = -radius; x <= radius; x += step) {
        const nx = x / radius;
        const sliceHeight = Math.sqrt(1 - nx * nx) * radius;
        const lon = Math.asin(nx) + rotation;
        const u = ((lon / (Math.PI * 2) + 0.5) * earthTexture.width) % earthTexture.width;
        const sx = (u + earthTexture.width) % earthTexture.width;
        ctx.drawImage(
          earthTexture,
          Math.floor(sx),
          0,
          1,
          earthTexture.height,
          centerX + x,
          centerY - sliceHeight,
          step + 0.5,
          sliceHeight * 2
        );
      }

      const highlight = ctx.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.45,
        radius * 0.2,
        centerX - radius * 0.2,
        centerY - radius * 0.2,
        radius
      );
      highlight.addColorStop(0, 'rgba(245, 221, 255, 0.55)');
      highlight.addColorStop(0.5, 'rgba(165, 92, 213, 0.15)');
      highlight.addColorStop(1, 'rgba(50, 10, 72, 0.7)');
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      const shade = ctx.createRadialGradient(
        centerX + radius * 0.35,
        centerY + radius * 0.1,
        radius * 0.3,
        centerX + radius * 0.65,
        centerY + radius * 0.25,
        radius
      );
      shade.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shade.addColorStop(0.6, 'rgba(20, 0, 40, 0.35)');
      shade.addColorStop(1, 'rgba(10, 0, 25, 0.8)');
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'rgba(214, 169, 255, 0.35)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    const drawPin = (pin: Pin, now: number) => {
      // Pin positions are stored in globe coordinates and re-projected each frame.
      if (!pinImage.complete) return;
      const lon = pin.lon + rotation;
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

      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.scale(pop, pop);
      ctx.drawImage(pinImage, -baseSize * 0.4, -baseSize, baseSize * 0.8, baseSize);
      ctx.restore();
    };

    const drawBlast = (blast: Blast, now: number) => {
      // Blast timing drives ring expansion + particle burst.
      const elapsed = now - blast.createdAt;
      if (elapsed > BLAST_DURATION) return;

      const t = elapsed / BLAST_DURATION;
      const lon = blast.lon + rotation;
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

    const drawBurger = (drop: Drop) => {
      ctx.save();
      ctx.translate(drop.x, drop.y);
      ctx.rotate(drop.rotation);
      const scale = drop.radius / 32;
      ctx.scale(scale, scale);
      ctx.fillStyle = '#f7c76a';
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.quadraticCurveTo(0, -18, 20, 0);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#db6b4b';
      ctx.fillRect(-22, 2, 44, 6);

      ctx.fillStyle = '#f4a460';
      ctx.fillRect(-24, 10, 48, 14);

      ctx.strokeStyle = '#6b3b2a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-16, 12);
      ctx.lineTo(16, 12);
      ctx.stroke();

      ctx.strokeStyle = '#7abf5a';
      ctx.beginPath();
      ctx.moveTo(-18, 18);
      ctx.lineTo(18, 18);
      ctx.stroke();
      ctx.restore();
    };

    const render = (now: number) => {
      const dt = Math.min(0.04, (now - lastTime) / 1000);
      lastTime = now;

      rotation = (rotation + ROTATION_SPEED * dt) % (Math.PI * 2);
      updatePhysics(dt, now);

      ctx.clearRect(0, 0, width, height);
      drawGlobe();

      pins.forEach((pin) => drawPin(pin, now));
      blasts.forEach((blast) => drawBlast(blast, now));
      for (let i = blasts.length - 1; i >= 0; i -= 1) {
        if (now - blasts[i].createdAt > BLAST_DURATION) {
          blasts.splice(i, 1);
        }
      }

      drops.forEach(drawBurger);

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    animationFrame = window.requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />;
}

function createEarthTexture() {
  const texture = document.createElement('canvas');
  texture.width = 1024;
  texture.height = 512;
  const ctx = texture.getContext('2d');
  if (!ctx) return texture;

  const oceanGradient = ctx.createLinearGradient(0, 0, 0, texture.height);
  oceanGradient.addColorStop(0, '#1b5fd1');
  oceanGradient.addColorStop(1, '#0b2e6f');
  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, 0, texture.width, texture.height);

  drawContinent(ctx, 170, 210, 240, 140, '#4ddc7a');
  drawContinent(ctx, 380, 260, 180, 120, '#3fbf6e');
  drawContinent(ctx, 620, 190, 220, 120, '#61e08b');
  drawContinent(ctx, 780, 280, 180, 120, '#3fbf6e');
  drawContinent(ctx, 900, 200, 120, 90, '#55d982');
  drawContinent(ctx, 540, 360, 200, 110, '#d5a86a');

  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = 'rgba(128, 64, 168, 0.2)';
  ctx.fillRect(0, 0, texture.width, texture.height);
  ctx.globalCompositeOperation = 'source-over';

  return texture;
}

function drawContinent(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  height: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(cx, cy, width * 0.4, height * 0.35, 0, 0, Math.PI * 2);
  ctx.ellipse(cx - width * 0.2, cy + height * 0.15, width * 0.3, height * 0.25, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + width * 0.2, cy - height * 0.1, width * 0.28, height * 0.22, 0, 0, Math.PI * 2);
  ctx.ellipse(cx - width * 0.15, cy - height * 0.2, width * 0.2, height * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
