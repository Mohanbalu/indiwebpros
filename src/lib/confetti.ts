// Lightweight, pure DOM/Canvas confetti utility with zero external dependencies
export function triggerConfetti() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "99999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = ["#0284c7", "#06b6d4", "#10b981", "#6366f1", "#f59e0b", "#ec4899", "#3b82f6"];
  const piecesCount = 65;
  const pieces: {
    x: number;
    y: number;
    r: number;
    d: number;
    color: string;
    tilt: number;
    tiltAngleIncremental: number;
    tiltAngle: number;
    vx: number;
    vy: number;
  }[] = [];

  for (let i = 0; i < piecesCount; i++) {
    pieces.push({
      x: width * 0.5 + (Math.random() - 0.5) * 100,
      y: height * 0.45,
      r: Math.floor(Math.random() * 6) + 4,
      d: Math.random() * piecesCount,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.75) * 14,
    });
  }

  let animationFrameId: number;
  let startTime = Date.now();
  const duration = 2500; // 2.5 seconds

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
      return;
    }

    const gravity = 0.25;

    for (let i = 0; i < pieces.length; i++) {
      const p = pieces[i];
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += p.vy;
      p.x += p.vx;
      p.vy += gravity;

      ctx.beginPath();
      ctx.lineWidth = p.r / 2;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
      ctx.stroke();
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}
