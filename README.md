
# Intersection Observer Example for Nuxt3

This is an implementation of a custom directive for Nuxt3 that utilizes the intersection observer API.
The custom directive "v-intersect" allows you to execute custom callback functions when a component enter or leaves the viewport.
In addition, you can customize this behaviour by setting a view time threshold and an area threshold to configure how long a component has to be in the viewport / how much area has to overlap with the viewport.

Files of concern are
- app.vue --> Main page where you can see how the custom v-intersetct directive is used
- plugins/intersectionDirective.ts --> Implemenation of the custom directive

The custom directive "v-intsersect" can be used like this. 
```javascript
<template>
    <div v-intersect="intersectOptions" v-for="index in 20" :key="index" class="panel">
        <p>{{ index }}</p>
    </div>
</template>

<script setup>
  const intersectOptions = {
      onBegin: (element) => { element.style.backgroundColor = "#f58142" }, // callback to execute when view time and area threshold are surpassed
      onEnd: (element) => { element.style.backgroundColor = "#02bfd4" }, // callback to execute when element leaves viewport
      totalViewTimeThresholdms: 1000, // must intersect 1000ms with the viewport 
      observerOptions: { threshold: 0.5 }, // must intsersect at least 50% with the viewport 
  }
</script>
```

# Showcase
|time threshold = 0|time threshold = 1s|
|-|-|
|![Kapture 2024-08-01 at 22 15 55](https://github.com/user-attachments/assets/860064fc-f34c-4e4a-b802-85d910f6a1c0)|![Kapture 2024-08-01 at 22 32 11](https://github.com/user-attachments/assets/fc314a54-d742-42e8-9302-f6cb3bd004cf)|



# How to use
Clone this repo and execute the following to install packages and start the dev server
```bash
yarn install # install dependences
yarn dev # start dev server
```
Then access http://localhost:3000
