"use client";

import React, { useEffect, useRef } from "react";

type BlobConfig = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
  color: string;
  phase: number;
  stretchX: number;
  stretchY: number;
};

type WalletEntry = {
  name: string;
  icon: React.ReactNode;
};

const icons = {
  navLogo: (
    <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="52" height="52" rx="11.375" fill="white" />
      <path d="M39.3125 40.7598H36.252L31.9082 29.3018L31.2578 27.5986C25.4431 26.6699 21.1536 29.4247 19.2139 31.4248L19.0439 31.8662L15.6523 40.7598H12.6328L24.1729 11.1836H27.7725L39.3125 40.7598ZM20.6768 27.6133C23.0969 26.1481 26.4121 25.0072 30.4043 25.3643L25.9521 13.707L20.6768 27.6133Z" fill="#F35233" />
    </svg>
  ),
  heroLogo: (
    <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="52" height="52" rx="14" fill="#f35233" />
      <path d="M39.3125 40.7598H36.252L31.9082 29.3018L31.2578 27.5986C25.4431 26.6699 21.1536 29.4247 19.2139 31.4248L19.0439 31.8662L15.6523 40.7598H12.6328L24.1729 11.1836H27.7725L39.3125 40.7598ZM20.6768 27.6133C23.0969 26.1481 26.4121 25.0072 30.4043 25.3643L25.9521 13.707L20.6768 27.6133Z" fill="white" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5.4 18.6L18 6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M7.8 6H18V16.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  eternl: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="url(#eternlBg)" />
      <path d="M12.6 12.8H27.4V27.2H12.6V12.8Z" stroke="#FF6B45" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M15.8 16.2H23.9" stroke="#2EE6FF" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M15.8 20H22.4" stroke="#FFBA59" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M15.8 23.8H23.9" stroke="#C267FF" strokeWidth="2.1" strokeLinecap="round" />
      <defs>
        <linearGradient id="eternlBg" x1="3.5" y1="2.5" x2="36" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7725E7" />
          <stop offset="0.5" stopColor="#42209B" />
          <stop offset="1" stopColor="#0D0B1F" />
        </linearGradient>
      </defs>
    </svg>
  ),
  lace: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#4A1389" />
      <circle cx="20" cy="20" r="9.6" stroke="#FFC454" strokeWidth="2" />
      <path d="M25 26C22.1 22.8 20.4 20 20.4 16.8C20.4 14.5 21.2 12.5 22.8 10.7" stroke="#FFC454" strokeWidth="2" strokeLinecap="round" />
      <path d="M13.8 24.2C13.8 18.6 17.8 14 23 14" stroke="#A45DFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  vespr: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#2A66C6" />
      <path d="M10.5 14L20 25.5L29.5 14" stroke="#D9ECFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  metamask: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 10C0 4.47715 4.47715 0 10 0H22C27.5228 0 32 4.47715 32 10V22C32 27.5228 27.5228 32 22 32H10C4.47715 32 0 27.5228 0 22V10Z" fill="#FF6518" fillOpacity="0.67" />
      <path d="M23.5573 23.7318L19.8094 22.6274L16.9829 24.2994L15.0109 24.2986L12.1828 22.6274L8.43645 23.7318L7.29688 19.9249L8.43645 15.6997L7.29688 12.1275L8.43645 7.7002L14.2904 11.1612H17.7034L23.5573 7.7002L24.6969 12.1275L23.5573 15.6997L24.6969 19.9249L23.5573 23.7318Z" fill="#FF5C16" />
      <path d="M8.4375 7.7002L14.2914 11.1636L14.0586 13.5405L8.4375 7.7002Z" fill="#FF5C16" />
      <path d="M12.1797 19.9268L14.7554 21.8684L12.1797 22.6277V19.9268Z" fill="#FF5C16" />
      <path d="M14.5561 16.7163L14.061 13.542L10.8922 15.7004L10.8906 15.6996V15.7012L10.9004 17.923L12.1854 16.7163H12.1862H14.5561Z" fill="#FF5C16" />
      <path d="M23.557 7.7002L17.7031 11.1636L17.9351 13.5405L23.557 7.7002Z" fill="#FF5C16" />
      <path d="M19.8101 19.9268L17.2344 21.8684L19.8101 22.6277V19.9268Z" fill="#FF5C16" />
      <path d="M21.1021 15.7012V15.6996L21.1013 15.7004L17.9325 13.542L17.4375 16.7163H19.8073L21.0931 17.923L21.1021 15.7012Z" fill="#FF5C16" />
      <path d="M12.1828 22.6267L8.43645 23.7311L7.29688 19.9258H12.1828V22.6267Z" fill="#E34807" />
      <path d="M14.5549 16.7158L15.2705 21.3047L14.2788 18.7533L10.8984 17.9233L12.1843 16.7158H14.5541H14.5549Z" fill="#E34807" />
      <path d="M19.8125 22.6267L23.5588 23.7311L24.6984 19.9258H19.8125V22.6267Z" fill="#E34807" />
      <path d="M17.4422 16.7158L16.7266 21.3047L17.7183 18.7533L21.0986 17.9233L19.812 16.7158H17.4422Z" fill="#E34807" />
      <path d="M7.29688 19.9243L8.43645 15.6992H10.8872L10.8961 17.9218L14.2765 18.7517L15.2682 21.3032L14.7585 21.8651L12.1828 19.9235H7.29688V19.9243Z" fill="#FF8D5D" />
      <path d="M24.6979 19.9243L23.5583 15.6992H21.1076L21.0986 17.9218L17.7183 18.7517L16.7266 21.3032L17.2363 21.8651L19.812 19.9235H24.6979V19.9243Z" fill="#FF8D5D" />
      <path d="M17.7075 11.1611H16.001H14.2945L14.0625 13.538L15.2723 21.3013H16.7297L17.9403 13.538L17.7075 11.1611Z" fill="#FF8D5D" />
      <path d="M8.43645 7.7002L7.29688 12.1275L8.43645 15.6997H10.8872L14.0576 13.5405L8.43645 7.7002Z" fill="#661800" />
      <path d="M13.8475 17.6375H12.7373L12.1328 18.2238L14.2805 18.7509L13.8475 17.6367V17.6375Z" fill="#661800" />
      <path d="M23.5586 7.7002L24.6982 12.1275L23.5586 15.6997H21.1079L17.9375 13.5405L23.5586 7.7002Z" fill="#661800" />
      <path d="M18.1525 17.6375H19.2643L19.8688 18.2247L17.7188 18.7525L18.1525 17.6367V17.6375Z" fill="#661800" />
      <path d="M16.9822 22.7842L17.2355 21.8666L16.7257 21.3047H15.2676L14.7578 21.8666L15.0111 22.7842" fill="#661800" />
      <path d="M16.9868 22.7852V24.3005H15.0156V22.7852H16.9868Z" fill="#C0C4CD" />
      <path d="M12.1875 22.6255L15.0164 24.2991V22.7839L14.7632 21.8662L12.1875 22.6255Z" fill="#E7EBF6" />
      <path d="M19.8133 22.6255L16.9844 24.2991V22.7839L17.2376 21.8662L19.8133 22.6255Z" fill="#E7EBF6" />
    </svg>
  ),
  phantom: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#B4A9F3" />
      <path d="M11.7 24.2C11.7 18.3 15.5 14.2 20.1 14.2C24.6 14.2 28.4 18.3 28.4 24.2C28.4 25.1 27.7 25.8 26.8 25.8C25.8 25.8 25 25.1 24.9 24.1C24.3 25.1 22.8 25.8 21.3 25.8C20.1 25.8 19 25.3 18.3 24.5C17.6 25.3 16.5 25.8 15.3 25.8C13.8 25.8 12.4 25.1 11.8 24.1C11.8 24.1 11.7 24.1 11.7 24.2Z" fill="white" />
      <circle cx="16.1" cy="20.3" r="1.25" fill="#7B69D6" />
      <circle cx="24" cy="20.3" r="1.25" fill="#7B69D6" />
      <path d="M15.3 22.8C16.4 23.6 17.9 24 19.8 24C21.5 24 23 23.6 24.2 22.8" stroke="#7B69D6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4">
      <path d="M12.182 8.635c.017 1.882 1.634 2.513 1.65 2.522-.012.041-.26 0.884-.856 1.76-.515.748-1.053 1.492-1.892 1.508-.825.015-1.09-.485-2.036-.485-.945 0-1.24.47-2.02.5-.811.03-1.428-.809-1.946-1.558-1.058-1.53-1.868-4.32-1.39-6.398.238-1.03.82-1.743 1.486-2.04.59-.264 1.15-.45 1.73-.45.626 0 1.217.432 1.603.432.384 0 1.08-.535 1.84-.458.318.013 1.212.128 1.787.97-.046.03-.896.522-.896 1.56.015 1.258 1.077 1.69 1.1 1.7zM10.15 2.92c.348-.423.584-1.01.52-1.597-.504.02-1.116.335-1.478.758-.324.378-.607.97-.53 1.54.56.044 1.14-.277 1.488-.7z" />
    </svg>
  ),
};

const cardanoWallets: WalletEntry[] = [
  { name: "Eternl", icon: icons.eternl },
  { name: "Lace", icon: icons.lace },
  { name: "Vespr", icon: icons.vespr },
];

const swapWallets: WalletEntry[] = [
  { name: "Metamask", icon: icons.metamask },
  { name: "Phantom", icon: icons.phantom },
];

const blobs: BlobConfig[] = [
  {
    x: 1.02,
    y: 1.02,
    radius: 0.7,
    speed: 0.04,
    alpha: 1.0,
    color: "#FF1200",
    phase: 0.8,
    stretchX: 1.35,
    stretchY: 1.2,
  },
  {
    x: 0.9,
    y: 0.9,
    radius: 0.5,
    speed: 0.055,
    alpha: 0.68,
    color: "#E01000",
    phase: 1.6,
    stretchX: 1.3,
    stretchY: 1.15,
  },
  {
    x: 0.68,
    y: 0.72,
    radius: 0.48,
    speed: 0.06,
    alpha: 0.22,
    color: "#880606",
    phase: 3.2,
    stretchX: 1.5,
    stretchY: 1.2,
  },
];

export default function AscendLanding() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const noiseCanvas = noiseCanvasRef.current;
    if (!canvas || !noiseCanvas) return;

    const context = canvas.getContext("2d");
    const noiseContext = noiseCanvas.getContext("2d");
    if (!context || !noiseContext) return;

    const radialInfluence = (
      x: number,
      y: number,
      cx: number,
      cy: number,
      r: number
    ): number => Math.max(0, 1 - Math.hypot(x - cx, y - cy) / r);

    const renderNoise = () => {
      // Use a smaller buffer for noise and let image-rendering: pixelated handle the look
      // This is MUCH faster than rendering every pixel at native resolution
      const scale = 0.5;
      const w = Math.ceil(noiseCanvas.width * scale);
      const h = Math.ceil(noiseCanvas.height * scale);
      if (w <= 0 || h <= 0) return;

      const offscreen = document.createElement("canvas");
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      const imageData = offCtx.createImageData(w, h);
      const data = imageData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const nx = x / w;
          const ny = y / h;

          const corner = radialInfluence(nx, ny, 1.0, 1.0, 0.8);
          const midWarm = radialInfluence(nx, ny, 0.65, 0.7, 0.72) * 0.22;
          const ambient = radialInfluence(nx, ny, 0.5, 0.5, 1.2) * 0.06;

          const brightness = corner * 1.4 + midWarm * 0.6 + ambient;

          const s = Math.random();
          let r = 0, g = 0, b = 0, a = 0;

          if (s < 0.5) {
            r = 3 + brightness * 36 + Math.random() * 12;
            g = 0 + brightness * 2 + Math.random() * 2;
            b = 0 + brightness * 2 + Math.random() * 2;
            a = 155 + brightness * 48 + Math.random() * 28;
          } else if (s < 0.91) {
            r = 120 + brightness * 135 + Math.random() * 50;
            g = 10 + brightness * 45 + Math.random() * 18;
            b = 0 + brightness * 8 + Math.random() * 6;
            a = 100 + brightness * 82 + Math.random() * 26;
          } else {
            r = 170 + brightness * 82 + Math.random() * 22;
            g = 7 + brightness * 14 + Math.random() * 7;
            b = 4 + brightness * 9 + Math.random() * 5;
            a = 115 + brightness * 95 + Math.random() * 26;
          }

          data[idx] = Math.min(255, r);
          data[idx + 1] = Math.min(255, g);
          data[idx + 2] = Math.min(255, b);
          data[idx + 3] = Math.min(255, a);
        }
      }
      offCtx.putImageData(imageData, 0, 0);

      noiseContext.clearRect(0, 0, noiseCanvas.width, noiseCanvas.height);
      noiseContext.drawImage(offscreen, 0, 0, noiseCanvas.width, noiseCanvas.height);
    };

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      noiseCanvas.width = Math.floor(w * (window.devicePixelRatio || 1));
      noiseCanvas.height = Math.floor(h * (window.devicePixelRatio || 1));
      noiseCanvas.style.width = `${w}px`;
      noiseCanvas.style.height = `${h}px`;

      renderNoise();
    };

    const withAlpha = (hex: string, alpha: number): string => {
      const a = Math.max(0, Math.min(alpha, 1));
      const n = hex.replace("#", "");
      if (n.length !== 6) return `rgba(255,255,255,${a})`;
      return `rgba(${parseInt(n.slice(0, 2), 16)},${parseInt(n.slice(2, 4), 16)},${parseInt(n.slice(4, 6), 16)},${a})`;
    };

    let animationFrameId: number;
    const drawBackground = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const t = time * 0.001;

      context.clearRect(0, 0, w, h);

      context.fillStyle = "#010000";
      context.fillRect(0, 0, w, h);

      const midField = context.createRadialGradient(
        w * 0.5, h * 0.58, 0,
        w * 0.5, h * 0.5, Math.max(w, h) * 1.15
      );
      midField.addColorStop(0, "rgba(65, 5, 2, 0.58)");
      midField.addColorStop(0.4, "rgba(44, 3, 1, 0.32)");
      midField.addColorStop(0.7, "rgba(22, 1, 0, 0.14)");
      midField.addColorStop(1, "rgba(0,  0, 0, 0)");
      context.fillStyle = midField;
      context.fillRect(0, 0, w, h);

      const cornerGlow = context.createRadialGradient(
        w * 1.0, h * 1.0, 0,
        w * 0.84, h * 0.84, Math.max(w, h) * 0.6
      );
      cornerGlow.addColorStop(0, "rgba(255, 80, 20, 1.0)");
      cornerGlow.addColorStop(0.1, "rgba(255, 60, 10, 0.95)");
      cornerGlow.addColorStop(0.08, "rgba(255, 30, 8, 0.95)");
      cornerGlow.addColorStop(0.1, "rgba(245, 10, 0, 0.90)");
      cornerGlow.addColorStop(0.25, "rgba(205,  7, 0, 0.60)");
      cornerGlow.addColorStop(0.45, "rgba(135,  4, 0, 0.28)");
      cornerGlow.addColorStop(0.65, "rgba( 65,  2, 0, 0.10)");
      cornerGlow.addColorStop(1, "rgba(  0,  0, 0, 0)");
      context.fillStyle = cornerGlow;
      context.fillRect(0, 0, w, h);

      const extraGlow = context.createRadialGradient(
        w * 1.05, h * 1.05, 0,
        w * 0.92, h * 0.92, Math.max(w, h) * 0.35
      );
      extraGlow.addColorStop(0, "rgba(255, 220, 140, 0.95)");
      extraGlow.addColorStop(0.2, "rgba(255, 120, 50, 0.42)");
      extraGlow.addColorStop(0.4, "rgba(255, 60, 20, 0.22)");
      extraGlow.addColorStop(0.65, "rgba(255, 20, 5, 0.08)");
      extraGlow.addColorStop(1, "rgba(  0,  0, 0, 0)");
      context.fillStyle = extraGlow;
      context.fillRect(0, 0, w, h);

      context.save();
      context.globalCompositeOperation = "screen";
      context.filter = "blur(125px)";

      blobs.forEach((blob) => {
        const ox = Math.sin(t * blob.speed + blob.phase) * w * 0.025;
        const oy = Math.cos(t * (blob.speed + 0.03) + blob.phase) * h * 0.028;
        const cx = blob.x * w + ox;
        const cy = blob.y * h + oy;
        const radius = blob.radius * Math.max(w, h);

        context.save();
        context.translate(cx, cy);
        context.scale(blob.stretchX, blob.stretchY);

        const g = context.createRadialGradient(0, 0, radius * 0.04, 0, 0, radius);
        g.addColorStop(0, withAlpha(blob.color, blob.alpha));
        g.addColorStop(0.4, withAlpha(blob.color, blob.alpha * 0.55));
        g.addColorStop(1, withAlpha(blob.color, 0));

        context.fillStyle = g;
        context.beginPath();
        context.arc(0, 0, radius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });

      context.restore();

      const topBlackout = context.createLinearGradient(0, 0, 0, h * 0.32);
      topBlackout.addColorStop(0, "rgba(0, 0, 0, 0.88)");
      topBlackout.addColorStop(0.55, "rgba(0, 0, 0, 0.45)");
      topBlackout.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = topBlackout;
      context.fillRect(0, 0, w, h);

      const leftBlackout = context.createLinearGradient(0, 0, w * 0.52, 0);
      leftBlackout.addColorStop(0, "rgba(0, 0, 0, 0.82)");
      leftBlackout.addColorStop(0.45, "rgba(0, 0, 0, 0.40)");
      leftBlackout.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = leftBlackout;
      context.fillRect(0, 0, w, h);

      const topRightBlackout = context.createRadialGradient(
        w * 1.0, 0, 0,
        w * 0.85, h * 0.08, Math.max(w, h) * 0.55
      );
      topRightBlackout.addColorStop(0, "rgba(0, 0, 0, 0.35)");
      topRightBlackout.addColorStop(0.5, "rgba(0, 0, 0, 0.15)");
      topRightBlackout.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = topRightBlackout;
      context.fillRect(0, 0, w, h);

      const vignette = context.createRadialGradient(
        w * 0.6, h * 0.62, 0,
        w * 0.5, h * 0.5, Math.max(w, h) * 0.88
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(0.4, "rgba(0, 0, 0, 0.15)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.85)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, w, h);

      animationFrameId = window.requestAnimationFrame(drawBackground);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationFrameId = window.requestAnimationFrame(drawBackground);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030101] text-white">
      <canvas ref={canvasRef} id="gradient-canvas" className="fixed inset-0 h-full w-full"></canvas>
      <canvas ref={noiseCanvasRef} id="noise-canvas" className="noise-canvas fixed inset-0 h-full w-full pointer-events-none"></canvas>

      {/* ── GUIDE FRAME: full-screen border treatment ── */}
      <div className="guide-frame pointer-events-none fixed inset-0 z-20">
        {/* Top edge line & center dot */}
        <span className="gf-line gf-top"></span>
        <span className="gf-dot gf-dot-top-center"></span>

        {/* Bottom edge line & center dot */}
        <span className="gf-line gf-bottom"></span>
        <span className="gf-dot gf-dot-bottom-center"></span>

        {/* Left & right vertical edges */}
        <span className="gf-line gf-left"></span>
        <span className="gf-line gf-right"></span>

        {/* Four corner diamonds */}
        <GuideDiamond className="top-[var(--gf)] left-[var(--gf)]" />
        <GuideDiamond className="top-[var(--gf)] right-[var(--gf)] translate-x-1/2" />
        <GuideDiamond className="bottom-[var(--gf)] left-[var(--gf)]" />
        <GuideDiamond className="bottom-[var(--gf)] right-[var(--gf)] translate-x-1/2" />

        {/* Desktop only: vertical center divider */}
        <span className="gf-line gf-center-divider"></span>
      </div>

      <main className="page-shell relative z-10 mx-auto flex min-h-screen w-full flex-col">
        <header className="page-header flex items-center gap-3 text-white/95 sm:gap-3.5 mt-4 translate-x-[4%]">
          <div className="nav-brand-shell h-7 w-7 shrink-0 sm:h-8 sm:w-8">{icons.navLogo}</div>
          <span className="page-brand-text text-[20px] font-medium tracking-[-0.055em] text-white/92 hero-type-glow sm:text-[22px]">Ascend</span>
        </header>

        <section className="desktop-stage grid flex-1 grid-cols-1 gap-8 pt-8 sm:gap-10 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(388px,428px)] lg:items-stretch lg:gap-9 xl:grid-cols-[minmax(0,1fr)_minmax(408px,449px)] xl:pt-10 2xl:grid-cols-[minmax(0,1fr)_minmax(428px,469px)]">
          <div className="order-1 flex h-full items-center lg:items-end lg:pl-8 lg:translate-x-[14%] xl:pl-12 xl:translate-x-[16%] 2xl:pl-14 2xl:translate-x-[18%]">
            <div className="hero-copy relative mx-0 w-full max-w-[352px] pb-2 pt-4 lg:mx-0 lg:max-w-[34rem] lg:pb-8 lg:pt-6 xl:max-w-[36rem] xl:pb-10 xl:pt-8 2xl:max-w-[38rem]">
              <div className="mb-6 text-left sm:mb-8 lg:mb-10 lg:text-left">
                <div className="hero-mark-row mb-4 flex flex-col items-start justify-start gap-3 sm:mb-5 lg:mb-4 lg:block">
                  <div className="hero-coin-shell h-16 w-16 shrink-0 sm:h-20 sm:w-20 lg:mb-4 lg:h-[118px] lg:w-[118px] xl:h-[132px] xl:w-[132px]">
                    <img src="/assets/image.png" alt="Ascend Coin" className="hero-coin-image h-full w-full object-contain" />
                  </div>
                  <div className="hero-badge-wrap inline-block bg-[#f7663f] leading-none">
                    <span className="hero-badge-text block hero-display font-semibold text-[clamp(3.5rem,6vw,4rem)] uppercase tracking-[-0.04em] text-white leading-none m-0 p-0">
                      $ASCEND
                    </span>
                  </div>
                </div>
                <h1 className="hero-display hero-title mb-6 font-semibold text-[clamp(4.5rem,9vw,7.5rem)] leading-[1.1] tracking-[-0.05em] text-white hero-type-glow sm:mb-8 lg:mb-10">
                  <span className="block">Liquid</span>
                  <span className="block mt-3 sm:mt-4 lg:mt-6">Staking</span>
                </h1>
                <div className="hero-summary-row mt-1 flex flex-col items-center gap-4 sm:mt-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6 lg:mt-3 lg:items-end lg:gap-8">
                  <p className="hero-summary mb-4 mx-0 max-w-[800px] text-left text-[16px] sm:mb-6 sm:text-[20px] lg:mb-10 lg:text-[28.28px] font-normal leading-[1.3] tracking-[-0.02em] text-white sm:text-left translate-y-[0.5%]">
                    First crosschain compatible Liquid staking<span className="hero-summary-break"></span>
                    protocol. Earn 100% of protocol revenue.
                  </p>
                  <div className="hero-cta-wrap relative hidden lg:flex lg:w-full lg:flex-1 lg:justify-start">
                    <button
                      type="button"
                      className="arrow-tile relative mx-auto flex items-center justify-center text-[#F35233] transition-transform hover:scale-105 active:scale-95 lg:ml-auto lg:translate-x-[35%] lg:-translate-y-[50%] xl:translate-x-[55%] 2xl:translate-x-[65%]"
                      aria-label="Open staking flow"
                    >
                      <span className="flex h-[46px] w-[46px] items-center justify-center translate-x-[1px]">
                        {icons.arrow}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-column order-2 w-full lg:ml-auto lg:max-w-[367px] lg:translate-x-[-5.5rem] lg:translate-y-6 xl:max-w-[388px] xl:translate-x-[-10rem] xl:translate-y-8 2xl:max-w-[408px] 2xl:translate-x-[-11rem] 2xl:translate-y-9">
            <div className="panel-shell relative rounded-[28px] p-1.5 sm:p-2">
              <div className="panel-card relative rounded-[24px] bg-[radial-gradient(circle_at_50%_0%,rgba(100,20,20,0.35),rgba(40,10,10,0.88)_35%,rgba(15,5,5,0.96)_60%,rgba(8,3,3,1)_100%)] px-4 pb-1 pt-1.5 shadow-[0_24px_48px_rgba(0,0,0,0.5)] sm:px-5 sm:pb-1 md:px-6 md:pb-1.5">
                <div className="panel-header mb-1 flex flex-col items-center text-center">
                  <div className="panel-brand-shell mb-1 h-[28px] w-[28px] shrink-0 sm:h-[30px] sm:w-[30px]">{icons.heroLogo}</div>
                  <h2 className="panel-title text-[clamp(1.12rem,2.58vw,1.62rem)] font-medium tracking-[-0.05em] text-white hero-type-glow">$Ascend Liquid Staking</h2>
                  <p className="panel-subtitle mt-0 text-[9px] tracking-[-0.03em] sm:text-[10px]">Stake to earn a part of 100% of Ascend protocol revenue</p>
                </div>
                <div className="panel-sections space-y-4">
                  <WalletSection title="CHOOSE CARDANO WALLET" wallets={cardanoWallets} />
                  <WalletSection title="OR SWAP TOKENS TO $ASCEND" wallets={swapWallets} />

                  <section className="buy-card wallet-block rounded-[18px] bg-[linear-gradient(180deg,#15141A_0%,#0E0D12_100%)] p-0 overflow-hidden">
                    <div className="flex min-h-[46px] items-stretch">
                      <div className="buy-thumb w-[54px] shrink-0 sm:w-[65px] md:w-[75px] relative overflow-hidden rounded-l-[14px] rounded-tr-[18px] rounded-br-[6px] bg-[linear-gradient(180deg,#5A5A60_0%,#2A2A2F_40%,#141417_75%,#0B0B0D_100%)]">
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.12)_25%,rgba(255,255,255,0.04)_45%,rgba(255,255,255,0)_65%)]"></div>
                        <div className="absolute top-[42%] left-0 right-0 h-[8px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] blur-md opacity-60"></div>
                      </div>
                      <div className="buy-content flex min-h-[46px] flex-1 items-center justify-between gap-2 px-3 py-0.5">
                        <div>
                          <div className="buy-title text-[12px] font-semibold tracking-[-0.04em] text-white hero-type-glow sm:text-[13px] -mt-0.5 sm:-mt-2 lg:-mt-3">
                            Buy $Ascend with card
                          </div>
                          <div className="buy-payments mt-0 flex items-center gap-1.5">
                            <span className="rounded-[3px] bg-white px-1 py-0.5 text-[6.5px] font-black tracking-tighter text-[#253b9a] leading-none">VISA</span>
                            <div className="flex items-center -space-x-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#eb001b]"></span>
                              <span className="h-1.5 w-1.5 rounded-full bg-[#f79e1b] opacity-90"></span>
                            </div>
                            <div className="flex items-center gap-[2px] text-white/90">
                              <span className="flex items-center justify-center h-3 w-3">
                                {icons.apple}
                              </span>
                              <span className="text-[10px] font-medium leading-none tracking-tight">Pay</span>
                            </div>
                          </div>
                        </div>
                        <button type="button" className="wallet-arrow shrink-0 h-5 w-5 bg-white/5" aria-label="Buy with card">
                          <span className="h-3.5 w-3.5">{icons.chevron}</span>
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function GuideDiamond({ className }: { className: string }) {
  return (
    <span className={`absolute ${className} h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-white/90 bg-transparent shadow-[0_0_4px_rgba(255,255,255,0.3)]`}></span>
  );
}

function WalletSection({ title, wallets }: { title: string; wallets: WalletEntry[] }) {
  const isSwapSection = title.startsWith("OR ");
  return (
    <section className="wallet-block rounded-[16px] bg-[#19181D] px-4 py-1 sm:px-5">
      <div className="wallet-section-title mb-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] sm:text-[9px]">
        {isSwapSection ? (
          <>
            <span className="text-white/20 font-normal">OR</span>{" "}
            <span className="text-[#FF5C33] opacity-90 font-medium">{title.slice(3)}</span>
          </>
        ) : (
          <span className="text-[#FF5C33] opacity-90 font-medium">{title}</span>
        )}
      </div>
      <div className="space-y-1">
        {wallets.map((wallet, i) => (
          <WalletRow key={i} wallet={wallet} />
        ))}
      </div>
    </section>
  );
}

function WalletRow({ wallet }: { wallet: WalletEntry }) {
  return (
    <button
      type="button"
      className="wallet-row flex w-full items-center justify-between gap-2 rounded-[12px] bg-transparent px-3 py-1 text-left text-white transition sm:px-4"
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="h-5.5 w-5.5 shrink-0 overflow-hidden rounded-[7px] sm:h-6 sm:w-6">{wallet.icon}</div>
        <span className="wallet-name truncate text-[12px] font-medium tracking-[-0.03em] hero-type-glow sm:text-[13px]">
          {wallet.name}
        </span>
      </div>
      <span className="wallet-arrow shrink-0" aria-hidden="true">
        <span className="h-4 w-4">{icons.chevron}</span>
      </span>
    </button>
  );
}
