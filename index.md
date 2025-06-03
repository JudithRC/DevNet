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
    <img src="{{ site.baseurl }}/assets/img/loginPage.png" alt="Login Page" class="proyecto-img izquierda">
    <img src="{{ site.baseurl }}/assets/img/signupPage.png" alt="Sign Up Page" class="proyecto-img central">
    <img src="{{ site.baseurl }}/assets/img/mapPage.png" alt="Map Page" class="proyecto-img derecha">
  </div>
</section>
<script>
  // Animación de rotación de imágenes en orden cíclico
  setInterval(() => {
    const cont = document.querySelector('.imagenes-proyecto');
    const imgs = cont.querySelectorAll('.proyecto-img');
    if (imgs.length !== 3) return;
    // Elimina todas las clases de posición
    imgs.forEach(img => {
      img.classList.remove('izquierda', 'central', 'derecha');
    });
    // Reordena los nodos: mueve el primero al final
    cont.appendChild(imgs[0]);
    // Asigna las clases según el nuevo orden
    const nuevos = cont.querySelectorAll('.proyecto-img');
    nuevos[0].classList.add('izquierda');
    nuevos[1].classList.add('central');
    nuevos[2].classList.add('derecha');
  }, 5000);
</script>