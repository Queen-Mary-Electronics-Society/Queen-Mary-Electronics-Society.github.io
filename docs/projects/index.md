---
layout: default
title: "Our Projects"
permalink: /projects/
---

<div class="projects-hero">
  <img src="{{ '/assets/bg-projects.jpg' | relative_url }}" alt="Projects Background">
</div>

<main class="projects-page">
  <section class="projects-section">
    <div class="project-title-section">
      <h1>Our Projects</h1>
    </div>

    <div class="projects-list">
      {% for project in site.projects %}
        <div class="project-card">
          <div class="project-info">
            <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
            <p class="project-date">
              {{ project.date | date: "%Y-%m-%d" }}{% unless project.endDate %}{% else %} - <span class="archived">archived</span>{% endunless %}
            </p>
            <p>{{ project.summary }}</p>
            <a href="{{ project.url | relative_url }}" class="learn-more">Learn More</a>
          </div>
          <div class="project-image">
            <a href="{{ project.url | relative_url }}"><img src="{{ project.thumbnail | relative_url }}" alt="{{ project.title }}"></a>
          </div>
        </div>
      {% endfor %}
    </div>
  </section>
</main> 