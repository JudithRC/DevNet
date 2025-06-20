// Decoración flotante de símbolos software
(function() {
  const SYMBOLS = [
    '{}', '</>', '#', '@', '[]', '()', ';', '*', '=', '&&', '|', '::', '->', '/* */', '<>', '$',
    '¯\\_(ツ)_/¯', // divertido
    '<(“)',        // pajarito ascii
    '/¯¯\\',       // barra superior
    '\\__/ ',      // base
    '<><',         // pez
    '><(((º>',     // pez grande
    '~~',          // olas
    '///',         // líneas
    '\\\\',        // líneas invertidas
    '._.',         // carita
    '(╯°□°）╯︵ ┻━┻', // volcando mesa
    '┬─┬ ノ( ゜-゜ノ)', // levantando mesa
    '⎇',           // símbolo alt
    '⌘',           // símbolo command
    '⎈',           // símbolo control
    '⏎',           // enter
    '␣',           // espacio
    '⎋',           // escape
    '⏻',           // power
    '⏚',           // símbolo alternativo
    '⧉',           // copiar
    '⎙',           // imprimir
    '⎌',           // cancelar
    '⎆',           // insertar
    '⎄',           // símbolo de teclado
    '⎗',           // símbolo de navegación
    '⎜⎜',         // pausa
    '⏏',           // expulsar
    '⏭',           // siguiente
    '⏮',           // anterior
    '⏸',           // pausa
    '⏯',           // reproducir/pausa
    '⏵',           // play
    '⏹',           // stop
    '⏺',           // grabar
    '⏲',           // temporizador
    '⏱',           // cronómetro
    '⏶',           // flecha arriba
    '⏷',           // flecha abajo
    '⏸',           // pausa
    '⏹',           // stop
    '⏺',           // grabar
  ];
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
  function getSymbolCount() {
    // 4 para <=480px, 21 para >=1920px, interpolado linealmente
    const min = 4, max = 21;
    const minW = 480, maxW = 1920;
    const w = window.innerWidth;
    if (w <= minW) return min;
    if (w >= maxW) return max;
    return Math.round(min + ((w - minW) / (maxW - minW)) * (max - min));
  }
  class Deco {
    constructor(canvas, symbol, others = []) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.symbol = symbol !== undefined ? symbol : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      this.fontSize = 24 + Math.random() * 24;
      // Nueva lógica: evitar solapamiento al crear
      let tries = 0;
      do {
        this.x = Math.random() * (canvas.width - this.fontSize);
        this.y = Math.random() * (canvas.height - this.fontSize);
        this.width = this.fontSize * this.symbol.length * 0.6;
        this.height = this.fontSize;
        tries++;
      } while (
        others.some(o => Deco.rectsOverlap(this, o)) && tries < 20
      );
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;
      // Transición de opacidad
      this.opacity = 1;
      this.transitioning = false;
      this.transitionPhase = null; // 'out' o 'in'
      this.transitionStart = 0;
      this.transitionDuration = 700 + Math.random() * 300; // ms
      this.nextSymbol = null;
    }
    static rectsOverlap(a, b) {
      return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
      );
    }
    draw() {
      this.ctx.font = `${this.fontSize}px monospace`;
      this.ctx.globalAlpha = 0.13 * this.opacity;
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
    startTransitionOut(others) {
      if (this.transitioning) return;
      this.transitioning = true;
      this.transitionPhase = 'out';
      this.transitionStart = performance.now();
      this.transitionDuration = 700 + Math.random() * 300;
      // Pasar símbolo nuevo y referencia a los demás para evitar solapamiento
      this.nextSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      this._transitionOthers = others;
    }
    updateTransition(now) {
      if (!this.transitioning) return;
      const elapsed = now - this.transitionStart;
      if (this.transitionPhase === 'out') {
        this.opacity = Math.max(0, 1 - elapsed / this.transitionDuration);
        if (elapsed >= this.transitionDuration) {
          // Cambia símbolo y comienza transición de entrada, evitando solapamiento
          this.symbol = this.nextSymbol;
          this.fontSize = 24 + Math.random() * 24;
          let tries = 0;
          do {
            this.x = Math.random() * (this.canvas.width - this.fontSize);
            this.y = Math.random() * (this.canvas.height - this.fontSize);
            this.width = this.fontSize * this.symbol.length * 0.6;
            this.height = this.fontSize;
            tries++;
          } while (
            this._transitionOthers &&
            this._transitionOthers.some(o => o !== this && Deco.rectsOverlap(this, o)) &&
            tries < 20
          );
          this.vx = (Math.random() - 0.5) * 1.2;
          this.vy = (Math.random() - 0.5) * 1.2;
          this.transitionPhase = 'in';
          this.transitionStart = now;
        }
      } else if (this.transitionPhase === 'in') {
        this.opacity = Math.min(1, elapsed / this.transitionDuration);
        if (elapsed >= this.transitionDuration) {
          this.opacity = 1;
          this.transitioning = false;
          this.transitionPhase = null;
          this.nextSymbol = null;
          this._transitionOthers = null;
        }
      }
    }
  }
  function start() {
    const canvas = createCanvas();
    resizeCanvas(canvas);

    let decos = [];
    function createDecos() {
      const count = getSymbolCount();
      decos = [];
      for (let i = 0; i < count; i++) {
        decos.push(new Deco(canvas, undefined, decos));
      }
    }
    createDecos();

    window.addEventListener('resize', () => {
      resizeCanvas(canvas);
      createDecos();
    });

    // --- Animación de transición de símbolos ---
    function triggerSymbolTransitions() {
      if (!decos.length) return;
      const n = Math.max(1, Math.floor(decos.length / 3));
      // Selecciona n índices únicos al azar
      const indices = [];
      while (indices.length < n) {
        const idx = Math.floor(Math.random() * decos.length);
        if (!indices.includes(idx)) indices.push(idx);
      }
      indices.forEach(i => decos[i].startTransitionOut(decos));
      // Programa el siguiente cambio aleatorio entre 5 y 8 segundos
      setTimeout(triggerSymbolTransitions, 5000 + Math.random() * 3000);
    }
    setTimeout(triggerSymbolTransitions, 5000 + Math.random() * 3000);

    function animate(now) {
      const headerHeight = getHeaderHeight();
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < decos.length; i++) {
        for (let j = i + 1; j < decos.length; j++) {
          if (decos[i].collideWith(decos[j])) decos[i].resolveCollision(decos[j]);
        }
      }
      decos.forEach(d => {
        d.updateTransition(now || performance.now());
        d.move(headerHeight);
        d.draw();
      });
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
