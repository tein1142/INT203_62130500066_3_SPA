<template>
  <base-navbar />

  <div class="text-center">
    <h1>Change Password</h1>
    <p>Please fill in this form to change password your account.</p>
    <hr />
    <form @submit.prevent="submitForgotPassword">
      <div class="boxregister">
        <label for="email"><b>Email</b></label>
        <base-input
          patternValue="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
          type="text"
          label="Enter Email"
          nameValue="email"
          idValue="email"
          v-model.trim="emailRegister"
        />

        <p v-if="invalidEmailInput" class="text-red-600">
          Please Enter Your Email
        </p>

        <p><b>Answer Your Question</b></p>

        <b v-if="showQuestion()">
          {{ showQuestion() + " ?" }}
        </b>
        



        <base-input
          type="text"
          patternValue=".{3,}"
          label="Enter Your Answer"
          v-model.trim="answerForgotPass"
        />

        
        <div v-if="answerIsCorrect">
          <label for="psw"><b>New Password</b></label>
          <base-input
            patternValue=".{6,}"
            type="password"
            label="Enter Password"
            nameValue="password"
            idValue="password"
            v-model.trim="pswRegister"
          />
          <p v-if="invalidPasswordInput" class="text-red-600">
            Please Enter Your Password
          </p>
          <label for="psw-repeat"><b>Repeat Password</b></label>

          <base-input
            patternValue=".{6,}"
            type="password"
            label="Enter Password"
            nameValue="password"
            idValue="password"
            v-model.trim="rePswRegister"
          />
          <p v-if="invalidRepeatPassword" class="text-red-600">
            Repeat Your Password
          </p>
        </div>

        <hr />

        <button type="submit" class="registerbtn">Summit</button>

        <p v-if="invalidUsernameOrPass" class="text-red-600">
          Username or Password is Wrong
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      urlForgotPassData: "http://localhost:5000/registerData",
      answerIsCorrect: false,
      invalidEmailInput: false,
      invalidQuestionInput: false,
      emailRegister: "",
      questionForgotPass: "",
      answerForgotPass: "",
      pswRegister: "",
      rePswRegister: "",
      registerData: [],
    };
  },

  methods: {
    async fetchDataRegis() {
      const res = await fetch(this.urlForgotPassData);
      const data = await res.json();
      return data;
    },
    submitForgotPassword() {
      this.invalidEmailInput = this.emailRegister === "" ? true : false;

      for (let prop in this.registerData) {
        if (
          this.emailRegister != ""
        ) {   

          this.answerIsCorrect = true;
          axios.patch(this.urlForgotPassData+"/"+this.registerData[prop].id,
          {
              pswRegister: this.pswRegister ,
              rePswRegister: this.rePswRegister
          }
          ).then((response) => {
              console.log(response)
          })
        } else {
          this.answerIsCorrect = false;
        }
      }
       
    },

    showQuestion() {
      if (this.emailRegister === "") {
        this.invalidQuestionInput = true;
      } else {
        this.invalidQuestionInput = false;
      }

      for (let prop in this.registerData) {
        // console.log(this.registerData[prop]);
        if (this.emailRegister === this.registerData[prop].emailRegister) {
          return this.registerData[prop].questionForgotPass;
        }
      }
    },
  },
  async created() {
    this.registerData = await this.fetchDataRegis();
  },
};
</script>
