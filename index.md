---
layout: default
#title: DevNest
author_profile: true
---

<div class="container bienvenida" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:40vh;text-align:center;">
  <h1>¡Hola! 👋</h1>
  <h2>Aquí JudithRC</h2>
  <p>Bienvenido a mi espacio personal donde comparto el avance y detalles de mis proyectos. Explora, descubre y sigue el progreso de cada idea en desarrollo.</p>
</div>

<div class="main-central">
  <div class="fila fila-destacados">
    <section class="proyectos-destacados">
      <h2 class="apartado-titulo">Proyectos destacados</h2>
      {% assign proyectos_destacados = site.posts | where_exp: 'post', 'post.destacado == "Si"' %}
      {% if proyectos_destacados.size > 0 %}
        <ul class="proyectos-lista" style="justify-content:center;align-items:center;">
          {% for post in proyectos_destacados %}
            <li class="proyecto-item card-proyecto card-mdn">
              <div class="card-contenido">
                <h2 style="text-align:center;">{{ post.title }}</h2>
                <p style="text-align:center;">{{ post.excerpt | strip_html | truncate: 120 }}</p>
                <a class="btn-proyecto" href="{{ post.url | relative_url }}">Ver avance</a>
              </div>
            </li>
          {% endfor %}
        </ul>
      {% else %}
        <p style="text-align:center;">No hay proyectos destacados publicados aún.</p>
      {% endif %}
    </section>
  </div>
  <div class="fila fila-dos-columnas" style="display:flex;gap:2rem;">
    <section class="proyectos-curso" style="flex:1;">
      <h2 class="apartado-titulo">Proyectos en curso</h2>
      {% assign proyectos_curso = site.posts | where_exp: 'post', 'post.estado == "en_curso"' %}
      {% if proyectos_curso.size > 0 %}
        <ul class="proyectos-lista" style="justify-content:center;align-items:center;">
          {% for post in proyectos_curso %}
            <li class="proyecto-item card-proyecto card-mdn">
              <div class="card-contenido">
                <h2 style="text-align:center;">{{ post.title }}</h2>
                <p style="text-align:center;">{{ post.excerpt | strip_html | truncate: 120 }}</p>
                <a class="btn-proyecto" href="{{ post.url | relative_url }}">Ver avance</a>
              </div>
            </li>
          {% endfor %}
        </ul>
      {% else %}
        <p style="text-align:center;">No hay proyectos en curso publicados aún.</p>
      {% endif %}
    </section>
    <section class="proyectos-previos" style="flex:1;">
      <h2 class="apartado-titulo">Proyectos previos</h2>
      {% assign proyectos_previos = site.posts | where_exp: 'post', 'post.estado == "completado"' %}
      {% if proyectos_previos.size > 0 %}
        <ul class="proyectos-lista" style="justify-content:center;align-items:center;">
          {% for post in proyectos_previos %}
            <li class="proyecto-item card-proyecto card-mdn">
              <div class="card-contenido">
                <h2 style="text-align:center;">{{ post.title }}</h2>
                <p style="text-align:center;">{{ post.excerpt | strip_html | truncate: 120 }}</p>
                <a class="btn-proyecto" href="{{ site.baseurl }}/proyectos/proyecto-prueba/">Ver proyecto</a>
              </div>
            </li>
          {% endfor %}
        </ul>
      {% else %}
        <p style="text-align:center;">No hay proyectos previos publicados aún.</p>
      {% endif %}
    </section>
  </div>
</div>

