---
layout: default
#title: DevNest
author_profile: true
---

<div class="container bienvenida" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:40vh;text-align:center;">
  <h1>¡Hola! 👋</h1>
  <h2>Soy JudithRC 😀</h2>
  <p>Bienvenido a mi espacio personal donde comparto el avance y detalles de mis proyectos. Explora, descubre y sigue el progreso de cada idea en desarrollo.</p>
</div>

<div class="main-central">
<section class="proyectos-curso">
  <h2 class="apartado-titulo">Proyectos en curso</h2>
  <ul class="proyectos-lista" style="justify-content:center;align-items:center;">
    <!-- Proyecto destacado en curso -->
    <li class="proyecto-item card-proyecto card-mdn">
      <div class="card-contenido">
        <h2 style="text-align:center;">Proyecto de Prueba destacado <span style="color:#a1ffce;font-size:0.9em;">★ Destacado</span></h2>
        <p style="text-align:center;">Este es el proyecto destacado.</p>
        <a class="btn-proyecto" href="{{ site.baseurl }}/proyectos/proyecto-destacado/">Ver avance</a>
      </div>
    </li>
    <!-- Añade más proyectos en curso aquí -->
  </ul>
</section>
<hr class="divisor" />
<section class="proyectos-previos">
  <h2 class="apartado-titulo">Proyectos previos</h2>
  {% assign proyectos_previos = site.posts | where_exp: 'post', 'post.estado == "completado"' %}
  {% if proyectos_previos.size > 0 %}
    <ul class="proyectos-lista" style="justify-content:center;align-items:center;">
      {% for post in proyectos_previos %}
        <li class="proyecto-item card-proyecto card-mdn">
          <div class="card-contenido">
            <h2 style="text-align:center;">{{ post.title }}</h2>
            <p style="text-align:center;">{{ post.excerpt | strip_html | truncate: 120 }}</p>
            <a class="btn-proyecto" href="{{ post.url | relative_url }}">Ver proyecto</a>
          </div>
        </li>
      {% endfor %}
    </ul>
  {% else %}
    <p style="text-align:center;">No hay proyectos previos publicados aún.</p>
  {% endif %}
</section>
</div>

