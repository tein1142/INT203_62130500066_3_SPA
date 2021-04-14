<template>
  <div id="nav">
    <div class="flex-justify">
      <div class="shapebtn">
        <router-link to="/">Home</router-link>
      </div>
      <div class="shapebtn">
        <router-link to="/login">Login</router-link>
      </div>
      <div class="shapebtn">
        <router-link to="/register">Register</router-link>
      </div>
      <div class="shapebtn">
        <router-link to="/forgotpass">Forgot Password</router-link>
      </div>
    </div>
  </div>
  <router-view />
</template>
<style>
#nav {
  min-height: 60px;
  box-shadow: inset 0 -1px 0 0 #fff, 0 1px 5px rgb(0 0 0 / 10%);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #ffffff;
}

.flex-justify {
  @apply flex flex-row justify-end;
}

.shapebtn {
  @apply m-5 rounded-full py-1 px-6 bg-green-300;
}
</style>
