// Decoración flotante de símbolos software
(function() {
  const SYMBOLS = ['{}', '</>', '#', '@', '[]', '()', ';', '*', '=', '&&', '|', '::', '->', '/* */', '<>', '$'];
  function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'floating-decor-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = 0;
    canvas.style.pointerEvents = 'none';
    canvas.style.userSelect = 'none';
    document.body.appendChild(canvas);
    return canvas;
  }
  function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function getHeaderHeight() {
    const header = document.querySelector('header');
    return header ? header.offsetHeight : 0;
  }
  class Deco {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      this.fontSize = 24 + Math.random() * 24;
      this.x = Math.random() * (canvas.width - this.fontSize);
      this.y = Math.random() * (canvas.height - this.fontSize);
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;
      this.width = this.fontSize * this.symbol.length * 0.6;
      this.height = this.fontSize;
    }
    draw() {
      this.ctx.font = `${this.fontSize}px monospace`;
      this.ctx.globalAlpha = 0.13;
      this.ctx.fillStyle = '#61dafb';
      this.ctx.fillText(this.symbol, this.x, this.y + this.fontSize);
      this.ctx.globalAlpha = 1;
    }
    move(headerHeight) {
      this.x += this.vx;
      this.y += this.vy;
      // Rebote lateral
      if (this.x < 0 || this.x + this.width > this.canvas.width) this.vx *= -1;
      // Rebote con el header
      if (this.y < headerHeight) {
        this.y = headerHeight;
        this.vy *= -1;
      }
      // Rebote con el borde inferior
      if (this.y + this.height > this.canvas.height) {
        this.y = this.canvas.height - this.height;
        this.vy *= -1;
      }
    }
    collideWith(other) {
      return (
        this.x < other.x + other.width &&
        this.x + this.width > other.x &&
        this.y < other.y + other.height &&
        this.y + this.height > other.y
      );
    }
    resolveCollision(other) {
      [this.vx, other.vx] = [other.vx, this.vx];
      [this.vy, other.vy] = [other.vy, this.vy];
    }
  }
  function start() {
    const canvas = createCanvas();
    resizeCanvas(canvas);
    window.addEventListener('resize', () => resizeCanvas(canvas));
    const decos = [];
    for (let i = 0; i < 16; i++) decos.push(new Deco(canvas));
    function animate() {
      const headerHeight = getHeaderHeight();
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < decos.length; i++) {
        for (let j = i + 1; j < decos.length; j++) {
          if (decos[i].collideWith(decos[j])) decos[i].resolveCollision(decos[j]);
        }
      }
      decos.forEach(d => { d.move(headerHeight); d.draw(); });
      requestAnimationFrame(animate);
    }
    animate();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
