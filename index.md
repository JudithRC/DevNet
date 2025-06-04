---
layout: default
#title: DevNest
author_profile: true
---

<div class="container bienvenida" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:40vh;text-align:center;">
  <h1>¡Hola! 👋</h1>
  <h2>Soy JudithRC</h2>
  <p>Bienvenido a mi espacio personal donde comparto el avance y detalles de mis proyectos. Explora, descubre y sigue el progreso de cada idea en desarrollo.</p>
</div>

<section class="proyectos-curso">
  <h2 class="apartado-titulo">Proyectos en curso</h2>
  <ul class="proyectos-lista">
    <!-- Proyecto destacado en curso -->
    <li class="proyecto-item">
      <h2>Proyecto de Prueba destacado <span style="color:#a1ffce;font-size:0.9em;">★ Destacado</span></h2>
      <p>Este es el proyecto destacado.</p>
      <a class="btn-proyecto" href="{{ site.baseurl }}/proyectos/proyecto-destacado/">Ver avance</a>
    </li>
    <!-- Añade más proyectos en curso aquí -->
  </ul>
</section>

<section class="proyectos-previos">
  <h2 class="apartado-titulo">Proyectos previos</h2>
  {% assign proyectos_previos = site.posts | where_exp: 'post', 'post.estado == "completado"' %}
  {% if proyectos_previos.size > 0 %}
    <ul class="proyectos-lista">
      {% for post in proyectos_previos %}
        <li class="proyecto-item">
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
          <a class="btn-proyecto" href="{{ post.url | relative_url }}">Ver proyecto</a>
        </li>
      {% endfor %}
    </ul>
  {% else %}
    <p>No hay proyectos previos publicados aún.</p>
  {% endif %}
</section>

