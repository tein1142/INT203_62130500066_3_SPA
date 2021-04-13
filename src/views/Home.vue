<template>
  <div>
      <div class="text-center">
    <h1>TieN-KKBANK</h1>
    <p>Please fill in this form to Login your account.</p>
    <hr />
    <form @submit.prevent="submitLogin">
      <div class="boxregister">
        <label for="email"><b>Email</b></label>
        <input
        pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          v-model.trim="emailRegister"
        />
        <p v-if="invalidEmailInput" class="text-red-600">
          Please Enter Your Email
        </p>

        <label for="psw"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          v-model.trim="pswRegister"
        />
        <p v-if="invalidPasswordInput" class="text-red-600">
          Please Enter Your Password
        </p>
        <hr />

        <button type="submit" class="registerbtn">Login</button>

        <p v-if="invalidUsernameOrPass" class="text-red-600">
          Username or Password is Wrong
        </p>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    
  }
}
</script>
