<template>
    <h1>Intersection Observer API Example</h1>
    <p> Change the below variables in app.vue and experiment!</p>
    <div class="container">
        <p>totalViewTimeThresholdms = {{ totalViewTimeThresholdms }}ms</p>
        <p>areaThreshold = {{ 100 * areaThreshold }}%</p>
    </div>
    <p>{{ inputValue }}</p>

    <div v-intersect="intersectOptions" v-for="index in 20" :key="index" class="panel">
        <p>{{ index }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// The amount of time a panel has to be in view to "activate" 
const totalViewTimeThresholdms = 0
// The amount of area that has to overlap with the viewport to "activate" (1. -> 100%, 0.5 -> 50%)
const areaThreshold = 1.

const intersectOptions = {
    // onBegin is called once both the view time threshold and the area threshold have been surpassed
    onBegin: (element) => { element.style.backgroundColor = "#f58142" },
    // onEnd is called onece an activated element leaves the viewport i.e. goes below areaTreshold intersection
    onEnd: (element) => { element.style.backgroundColor = "#02bfd4" },
    totalViewTimeThresholdms,
    observerOptions: { threshold: areaThreshold },
}

</script>

<style>
body {
    font-family: sans-serif;
    margin: auto;
    width: 60%;
    max-width: 700px;
}

h1 {
    font-size: 40px;
    text-align: center;
}

.panel {
    background-color: #02bfd4;
    margin: 30px auto;
    padding: 40px;
    font-size: 30px;
    text-align: center;
    border-radius: 15px;
}

.container {
    display: flex;
    gap: 60px;
    justify-content: center;
}

p {
    font-size: 20px;
}
</style>
