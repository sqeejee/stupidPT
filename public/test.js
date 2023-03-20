(function emojiCursor() {
    var possibleEmoji = [
      "🤬", "🤯", "😵", "💩", "⭐", "👣", "🥝", "📘", "-_-", "🕙", "🏴‍☠️", "😮‍💨",
      "♕", "🏳️‍⚧️", "👊🏻", "✿", "ツ", "", "☯", ":)", "☠", "☣", "☢", "✌", "☎", "ℛ"
    ];
  
    var particles = [];
    var container = createContainer();


    function init() {
      bindEvents();
      loop();
    }
  
    function bindEvents() {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchstart', onTouchMove);
    }
  
    function onTouchMove(e) {
      if (e.touches.length > 0) {
        for (var i = 0; i < e.touches.length; i++) {
          addParticle(e.touches[i].clientX, e.touches[i].clientY, possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]);
        }
      }
    }
  
    function onMouseMove(e) {
      addParticle(e.clientX, e.clientY, possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]);
    }
  
    function addParticle(x, y, character) {
      var particle = new Particle();
      particle.init(x, y, character);
      particles.push(particle);
    }
  
    function updateParticles() {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
  
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].lifeSpan < 0) {
          particles[i].die();
          particles.splice(i, 1);
        }
      }
    }
  
    function loop() {
      requestAnimationFrame(loop);
      updateParticles();
    }
  
    function Particle() {
      this.lifeSpan = 120;
      this.initialStyles = {
        "position": "absolute",
        "display": "block",
        "pointerEvents": "none",
        "z-index": "1000",
        "fontSize": "16px",
        "will-change": "transform"
      };
  
      this.init = function(x, y, character) {
        this.velocity = {
          x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
          y: 1
        };
  
        this.position = {
          x: x - 10,
          y: y - 20
        };
  
        this.element = document.createElement('span');
        this.element.innerHTML = character;
        applyProperties(this.element, this.initialStyles);
        this.update();
  
        container.appendChild(this.element);
      };
  
      this.update = function() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.lifeSpan--;
  
        this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
      }
  
      this.die = function() {
        this.element.parentNode.removeChild(this.element);
      }
    }
  
    function applyProperties(target, properties) {
      for (var key in properties) {
        target.style[key] = properties[key];
      }
    }

    function createContainer() {
        var container = document.createElement('div');
        container.id = 'emoji-container';
        document.body.appendChild(container);
        return container;
      }
  
    init();
  })();
  

