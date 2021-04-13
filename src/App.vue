<template>
  <div id="nav">
    <div class="flex flex-row justify-end ">
      <div class="m-5 rounded-full py-1 px-6 bg-green-300">
        <router-link to="/home">Home</router-link>
      </div>
      <div class="m-5 rounded-full py-1 px-6 bg-green-300">
        <router-link to="/login">Login</router-link>
      </div>
      <div class="m-5 rounded-full py-1 px-6 bg-green-300">
        <router-link to="/">Register</router-link>
      </div>

      <!-- <div class="m-5 rounded-full py-1 px-6 bg-green-300">
        <router-link to="/jjcry">JJCry</router-link>
      </div> -->
    </div>
    <!-- <router-link to="/">Home</router-link> | -->
  </div>
  <router-view />
</template>
