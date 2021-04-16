<template>
  <base-navbar />

  <div class="text-center">
    <h1>Change Password</h1>
    <p>Please fill in this form to change password your account.</p>
    <hr />
    <form @submit.prevent="submitForgotPassword">
      <div class="boxinput">
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
        <p v-if="invalidAnswer" class="text-red-600">
          Answer is wrong
        </p>
        {{ answerIsCorrect }}
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

        <button type="submit" class="btn">Summit</button>

        
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      urlForgotPassData: "http://localhost:5000/registerData",
      answerIsCorrect: false,
      invalidEmailInput: false,
      invalidQuestionInput: false,
      invalidRepeatPassword:false,
      invalidAnswer:false,
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

           if(this.pswRegister != this.rePswRegister){
                this.invalidRepeatPassword = true
           } else{
               this.invalidRepeatPassword = false
           }
        
        for(let prop in this.registerData){
            this.answerIsCorrect = true
            if(this.answerForgotPass === this.registerData[prop].answerForgotPass && this.pswRegister === this.rePswRegister){
            axios.patch(this.urlForgotPassData+"/" +this.registerData[prop].id,{
           pswRegister: this.pswRegister,
           rePswRegister: this.rePswRegister,
      }).then(res => {
          console.log(res)
        //   window.location.href = "/login"
      })
       }else{
           this.answerIsCorrect = false;
           this.invalidAnswer = true;
       }
        }
    },

    showQuestion() {
      for (let prop in this.registerData) {
        if (this.emailRegister === this.registerData[prop].emailRegister) {
          return this.registerData[prop].questionForgotPass;
        }
      }

      if (this.emailRegister === "") {
        this.invalidQuestionInput = true;
      } else {
        this.invalidQuestionInput = false;
      }
    },
  },
  async created() {
    this.registerData = await this.fetchDataRegis();
  },
};
</script>
