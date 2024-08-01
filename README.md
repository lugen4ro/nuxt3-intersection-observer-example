
# Intersection Observer Example for Nuxt3

This is an implementation of a custom directive for Nuxt3 that utilizes the intersection observer API.
The custom directive "v-intersect" allows you to execute custom callback functions when a component enter or leaves the viewport.
In addition, you can customize this behaviour by setting a view time threshold and an area threshold to configure how long a component has to be in the viewport / how much area has to overlap with the viewport.

Files of concern are
- app.vue --> Main page where you can see how the custom v-intersetct directive is used
- plugins/intersectionDirective.ts --> Implemenation of the custom directive

# Showcase
|time threshold = 0|time threshold = 1s|
|-|-|
|![Kapture 2024-08-01 at 22 15 55](https://github.com/user-attachments/assets/860064fc-f34c-4e4a-b802-85d910f6a1c0)|![Kapture 2024-08-01 at 22 32 11](https://github.com/user-attachments/assets/fc314a54-d742-42e8-9302-f6cb3bd004cf)|




# How to Use
Clone this repo and execute the following to install packages and start the dev server
```bash
yarn install # install dependences
yarn dev # start dev server
```
Then access http://localhost:3000
