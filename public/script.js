document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     GSAP INTRO
  =============================== */
  gsap.from(".hero h1", { y: 80, opacity: 0, duration: 1.6 });
  gsap.from(".hero p", { y: 40, opacity: 0, delay: 0.4 });

  /* ===============================
     VALENTINE TYPEWRITER
  =============================== */
  const firstMemory = document.getElementById("firstMemory");
  const screen = document.getElementById("valentineScreen");
  const textEl = document.getElementById("typeText");
  const slideshow = document.getElementById("slideshowScreen");
  const music = document.getElementById("bgMusic");

  const message = "Happy valentines day Nana💖";
  let index = 0;

  function typeWriter() {
    if (index < message.length) {
      textEl.textContent += message.charAt(index);
      index++;
      setTimeout(typeWriter, 120);
    } else {
      setTimeout(() => {
        screen.classList.add("fade-out");
        textEl.classList.add("to-bottom");
        slideshow.classList.add("active");

        // Smooth music fade-in (user click already happened)
        music.volume = 0;
        music.play().catch(() => {});
        let vol = 0;
        const fade = setInterval(() => {
          if (vol < 0.7) {
            vol += 0.02;
            music.volume = vol;
          } else {
            clearInterval(fade);
          }
        }, 150);
      }, 800);
    }
  }

  firstMemory.addEventListener("click", () => {
    screen.classList.add("active");
    textEl.textContent = "";
    index = 0;
    typeWriter();
  });

  /* ===============================
     THREE.JS PARTICLES
  =============================== */
  const canvas = document.getElementById("bg");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.BufferGeometry();
  const count = 1200;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 40;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xff9ecf,
    size: 0.08,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);
  camera.position.z = 12;

  function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.00015;
    points.rotation.x = Math.sin(Date.now() * 0.0005) * 0.05;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* ===============================
     FADE ON SCROLL
  =============================== */
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".fade-on-scroll").forEach(el => {
    fadeObserver.observe(el);
  });

  /* ===============================
     FEATHER HANDWRITING EFFECT
  =============================== */
  const feather = document.getElementById("feather");
  const inkSound = document.getElementById("inkSound");

  const typeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.typed) {
          entry.target.dataset.typed = "true";
          entry.target.classList.add("writing");

          const text = entry.target.dataset.text || "";
          let i = 0;

          entry.target.textContent = "";
          feather.style.opacity = "1";

          // unlock sound on first interaction
          inkSound.volume = 0.25;
          inkSound.play().catch(() => {});

          function write() {
            if (i < text.length) {
              entry.target.textContent += text.charAt(i);
              if (i === 0) {
              const rect = entry.target.getBoundingClientRect();
              feather.style.left = rect.left + 10 + "px";
              feather.style.top = rect.top + rect.height * 0.6 + "px";
}


             const textNode = entry.target.firstChild;

if (textNode && i > 0) {
  const range = document.createRange();
  range.setStart(textNode, i - 1);
  range.setEnd(textNode, i);

  const rects = range.getClientRects();
  if (rects.length > 0) {
    const rect = rects[0];

    feather.style.left = rect.right + 6 + "px";
    feather.style.top = rect.bottom - 20 + "px";
    feather.style.transform = `rotate(${Math.sin(i * 0.3) * 6}deg)`;
  }
}



              i++;
              setTimeout(write, 55);
            } else {
              feather.style.opacity = "0";
              entry.target.classList.remove("writing");
              inkSound.pause();
              inkSound.currentTime = 0;
            }
          }

          write();
        }
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll(".type-on-scroll").forEach(el => {
    el.textContent = "";
    typeObserver.observe(el);
  });

});
