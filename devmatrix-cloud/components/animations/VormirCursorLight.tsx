'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function VormirCursorLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isMobile, setIsMobile] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Hide instructions after 5 seconds
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleInteraction = useCallback((x: number, y: number) => {
    setMousePos({ x, y });
    setShowInstructions(false);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    handleInteraction(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleInteraction(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    // Keep last position on touch end for mobile
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Enhanced Vormir planet with more detail
    const planet = {
      x: canvas.width * 0.15,
      y: canvas.height * 0.2,
      radius: Math.min(canvas.width * 0.1, 100),
    };

    // Soul Stone altar cliff - more dramatic
    const cliff = {
      x: canvas.width * 0.5,
      y: canvas.height * 0.65,
      width: Math.min(canvas.width * 0.3, 300),
      height: Math.min(canvas.height * 0.4, 400),
    };

    // Red Skull/Stonekeeper position
    const stonekeeper = {
      x: canvas.width * 0.5,
      y: cliff.y - 80,
      visible: false,
    };

    // Soul Stone with enhanced glow
    const soulStone = {
      x: cliff.x,
      y: cliff.y - 150,
      baseRadius: 10,
    };

    // Enhanced mountains with more jagged peaks
    const mountains = [
      { x: 0.05, height: 0.6, width: 0.12, peaks: 4 },
      { x: 0.2, height: 0.75, width: 0.1, peaks: 5 },
      { x: 0.35, height: 0.55, width: 0.16, peaks: 3 },
      { x: 0.55, height: 0.8, width: 0.13, peaks: 6 },
      { x: 0.72, height: 0.65, width: 0.15, peaks: 4 },
      { x: 0.9, height: 0.7, width: 0.11, peaks: 5 },
    ];

    // Enhanced particles system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      type: 'snow' | 'ash';
    }> = [];

    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 0.3 + 0.1,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        type: Math.random() > 0.3 ? 'snow' : 'ash',
      });
    }

    // Calculate light intensity with falloff
    const calculateLightIntensity = (targetX: number, targetY: number, lightX: number, lightY: number, maxDistance: number = 400) => {
      const dx = lightX - targetX;
      const dy = lightY - targetY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return Math.max(0, 1 - distance / maxDistance);
    };

    // Draw enhanced Vormir planet with craters
    const drawVormirPlanet = (ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) => {
      const lightIntensity = calculateLightIntensity(planet.x, planet.y, mouseX, mouseY, 600);

      // Planet with dark purple/orange gradient
      const gradient = ctx.createRadialGradient(
        planet.x - 30, planet.y - 30, planet.radius * 0.1,
        planet.x, planet.y, planet.radius
      );

      if (lightIntensity > 0.1) {
        gradient.addColorStop(0, `rgba(160, 100, 70, ${0.6 + lightIntensity * 0.4})`);
        gradient.addColorStop(0.3, `rgba(120, 60, 90, ${0.7 + lightIntensity * 0.3})`);
        gradient.addColorStop(0.7, `rgba(80, 40, 60, ${0.8 + lightIntensity * 0.2})`);
        gradient.addColorStop(1, `rgba(40, 20, 30, ${0.9})`);
      } else {
        gradient.addColorStop(0, 'rgba(80, 50, 60, 0.4)');
        gradient.addColorStop(1, 'rgba(30, 15, 25, 0.8)');
      }

      ctx.beginPath();
      ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Detailed craters (only visible with light)
      if (lightIntensity > 0.2) {
        const craters = [
          { angle: 0.3, distance: 0.4, size: 0.18 },
          { angle: 1.2, distance: 0.6, size: 0.12 },
          { angle: 2.1, distance: 0.3, size: 0.15 },
          { angle: 3.0, distance: 0.5, size: 0.2 },
          { angle: 4.2, distance: 0.7, size: 0.1 },
          { angle: 5.1, distance: 0.4, size: 0.16 },
        ];

        craters.forEach(crater => {
          const craterX = planet.x + Math.cos(crater.angle) * planet.radius * crater.distance;
          const craterY = planet.y + Math.sin(crater.angle) * planet.radius * crater.distance;
          const craterSize = planet.radius * crater.size;

          // Crater shadow
          ctx.beginPath();
          ctx.arc(craterX, craterY, craterSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(20, 10, 15, ${lightIntensity * 0.8})`;
          ctx.fill();

          // Crater rim highlight
          if (lightIntensity > 0.5) {
            ctx.beginPath();
            ctx.arc(
              craterX - craterSize * 0.3,
              craterY - craterSize * 0.3,
              craterSize * 0.2,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = `rgba(180, 120, 100, ${lightIntensity * 0.3})`;
            ctx.fill();
          }
        });
      }

      // Atmospheric glow when illuminated
      if (lightIntensity > 0.3) {
        const glowGradient = ctx.createRadialGradient(
          planet.x, planet.y, planet.radius * 0.8,
          planet.x, planet.y, planet.radius * 1.8
        );
        glowGradient.addColorStop(0, `rgba(120, 70, 90, ${lightIntensity * 0.3})`);
        glowGradient.addColorStop(0.7, `rgba(80, 40, 60, ${lightIntensity * 0.1})`);
        glowGradient.addColorStop(1, 'rgba(80, 40, 60, 0)');

        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }
    };

    // Draw jagged mountains with snow caps
    const drawMountains = (ctx: CanvasRenderingContext2D, w: number, h: number, mouseX: number, mouseY: number) => {
      mountains.forEach(mountain => {
        const x = mountain.x * w;
        const peakY = h - (h * mountain.height);
        const baseWidth = w * mountain.width;

        const lightIntensity = calculateLightIntensity(x, peakY, mouseX, mouseY, 500);

        // Generate jagged peak
        ctx.beginPath();
        ctx.moveTo(x - baseWidth, h);

        // Create jagged path
        const peakPoints = [];
        const segments = mountain.peaks * 2 + 1;
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const pointX = x - baseWidth + (baseWidth * 2) * t;
          const variance = (Math.sin(t * Math.PI * mountain.peaks) * baseWidth * 0.2);
          const pointY = peakY + (h - peakY) * (1 - Math.sin(t * Math.PI)) + variance;

          if (i === 0) {
            ctx.moveTo(pointX, pointY);
          } else {
            ctx.lineTo(pointX, pointY);
          }
          peakPoints.push({ x: pointX, y: pointY });
        }

        ctx.lineTo(x + baseWidth, h);
        ctx.closePath();

        // Mountain coloring with lighting
        if (lightIntensity > 0) {
          const baseColor = { r: 35, g: 25, b: 40 };
          const litR = Math.min(255, baseColor.r + lightIntensity * 100);
          const litG = Math.min(255, baseColor.g + lightIntensity * 90);
          const litB = Math.min(255, baseColor.b + lightIntensity * 80);

          const gradient = ctx.createLinearGradient(x, peakY, x, h);
          gradient.addColorStop(0, `rgb(${litR}, ${litG}, ${litB})`);
          gradient.addColorStop(1, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);

          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = '#1a1525';
        }
        ctx.fill();

        // Snow caps (only visible with sufficient light)
        if (lightIntensity > 0.4) {
          // Find the main peaks for snow
          for (let i = 1; i < peakPoints.length - 1; i++) {
            if (peakPoints[i].y < peakY + 80) { // Only high peaks get snow
              ctx.beginPath();
              ctx.moveTo(peakPoints[i-1].x, peakPoints[i-1].y);
              ctx.lineTo(peakPoints[i].x, peakPoints[i].y);
              ctx.lineTo(peakPoints[i+1].x, peakPoints[i+1].y);
              ctx.closePath();

              const snowGradient = ctx.createLinearGradient(
                peakPoints[i].x, peakPoints[i].y,
                peakPoints[i].x, peakPoints[i].y + 30
              );
              snowGradient.addColorStop(0, `rgba(240, 240, 255, ${lightIntensity * 0.9})`);
              snowGradient.addColorStop(1, `rgba(200, 210, 230, ${lightIntensity * 0.6})`);

              ctx.fillStyle = snowGradient;
              ctx.fill();
            }
          }
        }

        // Dark outline for definition
        ctx.strokeStyle = `rgba(0, 0, 0, ${0.5 + lightIntensity * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    // Draw dramatic Soul Stone altar cliff
    const drawCliff = (ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) => {
      const lightIntensity = calculateLightIntensity(cliff.x, cliff.y, mouseX, mouseY, 550);

      // Main cliff structure - more dramatic and jagged
      ctx.beginPath();
      ctx.moveTo(cliff.x - cliff.width / 2, cliff.y + cliff.height);

      // Cliff edge - jagged and uneven
      const edgePoints = 8;
      for (let i = 0; i <= edgePoints; i++) {
        const t = i / edgePoints;
        const x = cliff.x - cliff.width / 2 + cliff.width * t;
        const variance = Math.sin(t * Math.PI * 3) * 15;
        const y = cliff.y - 50 + variance;

        if (i === 0) ctx.lineTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineTo(cliff.x + cliff.width / 2, cliff.y + cliff.height);
      ctx.closePath();

      // Cliff face with lighting
      if (lightIntensity > 0) {
        const gradient = ctx.createLinearGradient(cliff.x, cliff.y - 50, cliff.x, cliff.y + cliff.height);
        gradient.addColorStop(0, `rgba(70, 55, 75, ${0.7 + lightIntensity * 0.3})`);
        gradient.addColorStop(0.6, `rgba(50, 40, 55, ${0.8 + lightIntensity * 0.2})`);
        gradient.addColorStop(1, `rgba(35, 25, 40, ${0.9})`);
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = '#1a1520';
      }
      ctx.fill();

      // Cliff texture and cracks
      if (lightIntensity > 0.3) {
        // Add some rock texture
        for (let i = 0; i < 12; i++) {
          const crackX = cliff.x - cliff.width / 2 + Math.random() * cliff.width;
          const crackY = cliff.y - 30 + Math.random() * (cliff.height - 50);
          const crackLength = 20 + Math.random() * 40;

          ctx.beginPath();
          ctx.moveTo(crackX, crackY);
          ctx.lineTo(crackX + (Math.random() - 0.5) * 10, crackY + crackLength);
          ctx.strokeStyle = `rgba(20, 15, 25, ${lightIntensity * 0.8})`;
          ctx.lineWidth = 1 + Math.random() * 2;
          ctx.stroke();
        }
      }

      // Altar platform
      if (lightIntensity > 0.15) {
        ctx.fillStyle = `rgba(60, 50, 65, ${lightIntensity})`;
        ctx.fillRect(cliff.x - 90, cliff.y - 65, 180, 12);

        // Platform details
        ctx.strokeStyle = `rgba(40, 30, 45, ${lightIntensity})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(cliff.x - 90, cliff.y - 65, 180, 12);

        // Ancient markings on altar
        if (lightIntensity > 0.5) {
          ctx.strokeStyle = `rgba(100, 80, 110, ${lightIntensity * 0.6})`;
          ctx.lineWidth = 1;
          // Simple circular pattern around where stone will be
          ctx.beginPath();
          ctx.arc(cliff.x, cliff.y - 60, 25, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    // Draw pulsing Soul Stone with enhanced glow
    const drawSoulStone = (ctx: CanvasRenderingContext2D, time: number, mouseX: number, mouseY: number) => {
      const lightIntensity = calculateLightIntensity(soulStone.x, soulStone.y, mouseX, mouseY, 450);

      if (lightIntensity > 0.1) {
        const pulse = (Math.sin(time * 0.002) + 1) * 2; // Slower, more dramatic pulse
        const innerPulse = Math.sin(time * 0.005) * 1.5;

        // Outer glow (larger and more atmospheric)
        const outerGlow = ctx.createRadialGradient(
          soulStone.x, soulStone.y, soulStone.baseRadius,
          soulStone.x, soulStone.y, 40 + pulse * 2
        );
        outerGlow.addColorStop(0, `rgba(255, 160, 40, ${lightIntensity * 0.6})`);
        outerGlow.addColorStop(0.4, `rgba(255, 120, 30, ${lightIntensity * 0.3})`);
        outerGlow.addColorStop(1, `rgba(255, 80, 20, 0)`);

        ctx.beginPath();
        ctx.arc(soulStone.x, soulStone.y, 40 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Inner glow
        const innerGlow = ctx.createRadialGradient(
          soulStone.x, soulStone.y, soulStone.baseRadius * 0.5,
          soulStone.x, soulStone.y, soulStone.baseRadius * 2 + innerPulse
        );
        innerGlow.addColorStop(0, `rgba(255, 200, 100, ${lightIntensity * 0.9})`);
        innerGlow.addColorStop(0.7, `rgba(255, 140, 50, ${lightIntensity * 0.5})`);
        innerGlow.addColorStop(1, `rgba(255, 100, 30, 0)`);

        ctx.beginPath();
        ctx.arc(soulStone.x, soulStone.y, soulStone.baseRadius * 2 + innerPulse, 0, Math.PI * 2);
        ctx.fillStyle = innerGlow;
        ctx.fill();

        // Soul Stone core
        ctx.beginPath();
        ctx.arc(soulStone.x, soulStone.y, soulStone.baseRadius + innerPulse * 0.5, 0, Math.PI * 2);
        const coreGradient = ctx.createRadialGradient(
          soulStone.x - 3, soulStone.y - 3, 0,
          soulStone.x, soulStone.y, soulStone.baseRadius + innerPulse * 0.5
        );
        coreGradient.addColorStop(0, `rgba(255, 255, 200, ${lightIntensity})`);
        coreGradient.addColorStop(0.7, `rgba(255, 180, 60, ${lightIntensity * 0.8})`);
        coreGradient.addColorStop(1, `rgba(255, 100, 20, ${lightIntensity * 0.6})`);
        ctx.fillStyle = coreGradient;
        ctx.fill();

        // Stone energy tendrils (occasional)
        if (lightIntensity > 0.7 && Math.sin(time * 0.01) > 0.8) {
          for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2 + time * 0.001;
            const length = 15 + Math.sin(time * 0.02 + i) * 10;

            ctx.beginPath();
            ctx.moveTo(soulStone.x, soulStone.y);
            ctx.lineTo(
              soulStone.x + Math.cos(angle) * length,
              soulStone.y + Math.sin(angle) * length
            );
            ctx.strokeStyle = `rgba(255, 160, 60, ${lightIntensity * 0.4})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }
    };

    // Draw Red Skull/Stonekeeper that appears when cursor is near
    const drawStonekeeper = (ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) => {
      const lightIntensity = calculateLightIntensity(stonekeeper.x, stonekeeper.y, mouseX, mouseY, 350);
      stonekeeper.visible = lightIntensity > 0.2;

      if (stonekeeper.visible) {
        ctx.save();

        // Floating/hovering effect
        const floatOffset = Math.sin(Date.now() * 0.003) * 3;

        // Hooded cloak with tattered edges
        ctx.fillStyle = `rgba(25, 20, 30, ${lightIntensity * 0.9})`;
        ctx.beginPath();
        ctx.ellipse(stonekeeper.x, stonekeeper.y + 35 + floatOffset, 28, 45, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hood with more detail
        ctx.beginPath();
        ctx.moveTo(stonekeeper.x - 35, stonekeeper.y + 5);
        ctx.quadraticCurveTo(stonekeeper.x, stonekeeper.y - 25, stonekeeper.x + 35, stonekeeper.y + 5);
        ctx.lineTo(stonekeeper.x + 30, stonekeeper.y + 20);
        ctx.lineTo(stonekeeper.x - 30, stonekeeper.y + 20);
        ctx.closePath();
        ctx.fillStyle = `rgba(20, 15, 25, ${lightIntensity})`;
        ctx.fill();

        // Tattered cloak bottom
        if (lightIntensity > 0.4) {
          ctx.beginPath();
          ctx.moveTo(stonekeeper.x - 25, stonekeeper.y + 75);
          for (let i = 0; i < 5; i++) {
            const x = stonekeeper.x - 25 + (i * 12);
            const y = stonekeeper.y + 75 + (Math.sin(i) * 8);
            ctx.lineTo(x, y);
          }
          ctx.lineTo(stonekeeper.x + 25, stonekeeper.y + 75);
          ctx.strokeStyle = `rgba(15, 10, 20, ${lightIntensity * 0.8})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        // Red Skull face - appears when very close
        if (lightIntensity > 0.6) {
          // Skull face glow
          ctx.beginPath();
          ctx.arc(stonekeeper.x, stonekeeper.y + 8 + floatOffset, 14, 0, Math.PI * 2);
          const faceGlow = ctx.createRadialGradient(
            stonekeeper.x, stonekeeper.y + 8, 0,
            stonekeeper.x, stonekeeper.y + 8, 14
          );
          faceGlow.addColorStop(0, `rgba(200, 50, 50, ${lightIntensity * 0.8})`);
          faceGlow.addColorStop(1, `rgba(120, 30, 30, ${lightIntensity * 0.4})`);
          ctx.fillStyle = faceGlow;
          ctx.fill();

          // Skull features
          ctx.fillStyle = `rgba(255, 255, 220, ${lightIntensity * 0.9})`;

          // Eye sockets
          ctx.fillRect(stonekeeper.x - 8, stonekeeper.y + 6, 4, 6);
          ctx.fillRect(stonekeeper.x + 4, stonekeeper.y + 6, 4, 6);

          // Nasal cavity
          ctx.beginPath();
          ctx.moveTo(stonekeeper.x - 2, stonekeeper.y + 12);
          ctx.lineTo(stonekeeper.x, stonekeeper.y + 18);
          ctx.lineTo(stonekeeper.x + 2, stonekeeper.y + 12);
          ctx.closePath();
          ctx.fill();
        } else if (lightIntensity > 0.3) {
          // Just the hooded figure without face details
          ctx.fillStyle = `rgba(150, 150, 180, ${lightIntensity * 0.3})`;
          ctx.fillRect(stonekeeper.x - 6, stonekeeper.y + 8, 3, 4);
          ctx.fillRect(stonekeeper.x + 3, stonekeeper.y + 8, 3, 4);
        }

        // Stonekeeper's staff (only visible when very close)
        if (lightIntensity > 0.8) {
          ctx.strokeStyle = `rgba(100, 80, 60, ${lightIntensity})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(stonekeeper.x + 40, stonekeeper.y + 10);
          ctx.lineTo(stonekeeper.x + 60, stonekeeper.y - 20);
          ctx.stroke();
        }

        ctx.restore();
      }
    };

    // Draw enhanced atmospheric particles
    const drawParticles = (ctx: CanvasRenderingContext2D, w: number, h: number, mouseX: number, mouseY: number) => {
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = w;
        if (particle.x > w) particle.x = 0;
        if (particle.y > h) {
          particle.y = 0;
          particle.x = Math.random() * w;
        }

        const lightIntensity = calculateLightIntensity(particle.x, particle.y, mouseX, mouseY, 350);

        ctx.beginPath();

        if (particle.type === 'snow') {
          // Snow particles - brighter and more visible
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          if (lightIntensity > 0) {
            ctx.fillStyle = `rgba(240, 240, 255, ${lightIntensity * particle.alpha})`;
          } else {
            ctx.fillStyle = `rgba(150, 150, 180, ${particle.alpha * 0.2})`;
          }
        } else {
          // Ash particles - darker and smaller
          ctx.arc(particle.x, particle.y, particle.size * 0.7, 0, Math.PI * 2);
          if (lightIntensity > 0) {
            ctx.fillStyle = `rgba(100, 80, 90, ${lightIntensity * particle.alpha * 0.8})`;
          } else {
            ctx.fillStyle = `rgba(60, 50, 70, ${particle.alpha * 0.1})`;
          }
        }

        ctx.fill();
      });
    };

    // Enhanced cursor light with better falloff
    const drawCursorLight = (ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) => {
      const gradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 350
      );
      gradient.addColorStop(0, 'rgba(200, 220, 240, 0.15)');
      gradient.addColorStop(0.3, 'rgba(180, 200, 220, 0.08)');
      gradient.addColorStop(0.7, 'rgba(160, 180, 200, 0.02)');
      gradient.addColorStop(1, 'rgba(150, 170, 190, 0)');

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 350, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add a subtle central highlight
      const highlight = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 80
      );
      highlight.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 80, 0, Math.PI * 2);
      ctx.fillStyle = highlight;
      ctx.fill();
    };

    let animationFrameId: number;
    let time = 0;

    function animate() {
      const currentCanvas = canvasRef.current;
      if (!ctx || !currentCanvas) return;

      // Pure black background for space
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, currentCanvas.width, currentCanvas.height);

      // Draw scene layers with enhanced visuals
      drawVormirPlanet(ctx, mousePos.x, mousePos.y);
      drawMountains(ctx, currentCanvas.width, currentCanvas.height, mousePos.x, mousePos.y);
      drawCliff(ctx, mousePos.x, mousePos.y);
      drawSoulStone(ctx, time, mousePos.x, mousePos.y);
      drawStonekeeper(ctx, mousePos.x, mousePos.y);
      drawParticles(ctx, currentCanvas.width, currentCanvas.height, mousePos.x, mousePos.y);
      drawCursorLight(ctx, mousePos.x, mousePos.y);

      time++;
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      const currentCanvas = canvasRef.current;
      if (currentCanvas) {
        currentCanvas.width = window.innerWidth;
        currentCanvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div
        className="absolute inset-0 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />

        {/* Mobile controls hint */}
        {isMobile && !showInstructions && (
          <div className="absolute bottom-4 left-4 pointer-events-none">
            <p className="text-gray-500 text-sm bg-black bg-opacity-30 px-3 py-1 rounded">
              Touch to explore
            </p>
          </div>
        )}

        {/* Stonekeeper appearance hint */}
        <div className="absolute top-4 right-4 pointer-events-none">
          <p className="text-gray-400 text-xs bg-black bg-opacity-30 px-2 py-1 rounded">
            Find the Stonekeeper near the altar
          </p>
        </div>
      </div>
    </div>
  );
}