<script setup>
  import photo from '../assets/images/photo1.jpeg'
</script>

<template>

  <!-- Slogan block  -->
  <section class="slogan section section--hidden-x">
    <div class="slogan__body container">
      <div class="slogan__quote">
        <blockquote class="slogan__quote-quote">
          {{ $t('slogan.quote') }}
<!--          <cite class="slogan__quote-cite">{{ $t('slogan.cite') }}</cite>-->
          <cite class="slogan__quote-cite" v-html="$t('slogan.cite')" />
        </blockquote>
      </div>
      <div class="slogan__icon">
        <i class="icon-pot_411151" />
      </div>

    </div>
  </section>

  <section class="home section section--hidden-x container">

      <div class="home__hello hello">
        <div class="hello__text">
          <h2 class="hello__text-title">{{ $t('home.title') }}</h2>
          <div class="hello__text-text">
            <p class="multiline">{{ $t('home.text') }}</p>
<!--            <i class="icon-mushroom_411156"></i>-->
          </div>
        </div>
        <div class="hello__photo">
          <img :src="photo" alt="Photo" />
        </div>
      </div>

      <div class="home__favorites favorites">
        <h3 class="favorites__title">{{ $t('favorites.title') }} <i class="icon-heart_465323"></i></h3>
        <ul class="favorites__list">
          <li class="favorites__item">
            <i class="icon-java-svgrepo-com"></i>
            <h3>Java</h3>
          </li>
          <li class="favorites__item">
            <i class="icon-php01-svgrepo-com"></i>
            <h3>PHP</h3>
          </li>
          <li class="favorites__item">
            <i class="icon-symfony-svgrepo-com"></i>
            <h3>Symfony</h3>
          </li>
          <li class="favorites__item">
            <i class="icon-spring-boot-svgrepo-com"></i>
            <h3>Spring</h3>
          </li>
          <li class="favorites__item">
            <i class="icon-faucet-svgrepo-com"></i>
            <h3>Spigot</h3>
          </li>
          <li class="favorites__item">
            <i class="icon-vue-16-svgrepo-com"></i>
            <h3>Vue.js</h3>
          </li>
          <li class="favorites__item">
            <i class="icon-bash02-svgrepo-com"></i>
            <h3>Bash</h3>
          </li>
        </ul>


      </div>
  </section>

</template>

<script setup lang="ts">
</script>