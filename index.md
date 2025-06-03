---
layout: home
title: DevNest - Inicio
css: /assets/css/style.css
---



## ¡Hola! 👋 
### Aquí JudithRC. 
En esta zona comparto información sobre mis proyectos y repositorios. ¿Tienes curiosidad? ¡Adelante, échales un vistazo!

<section id="proyecto-reciente">
  <h2>Proyecto Reciente</h2>
  <h3><a href="{{ site.baseurl }}/2025/06/03/proyecto1.html">Proyecto 1</a></h3>
  <p>Breve descripción del proyecto aquí.</p>
  <div class="imagenes-proyecto">
    <img src="{{ site.baseurl }}/assets/img/loginPage.png" alt="Login Page" class="proyecto-img central">
    <img src="{{ site.baseurl }}/assets/img/signUpPage.png" alt="Sign Up Page" class="proyecto-img izquierda">
    <img src="{{ site.baseurl }}/assets/img/mapPage.png" alt="Map Page" class="proyecto-img derecha">
  </div>
</section>

<script>
  // Animación de rotación de imágenes
  setInterval(() => {
    const imgs = document.querySelectorAll('.imagenes-proyecto .proyecto-img');
    if (imgs.length !== 3) return;
    imgs[0].classList.toggle('izquierda');
    imgs[0].classList.toggle('central');
    imgs[1].classList.toggle('central');
    imgs[1].classList.toggle('derecha');
    imgs[2].classList.toggle('derecha');
    imgs[2].classList.toggle('izquierda');
    // Reordenar nodos para mantener el orden visual
    const cont = document.querySelector('.imagenes-proyecto');
    cont.appendChild(imgs[0]);
  }, 5000);
</script>