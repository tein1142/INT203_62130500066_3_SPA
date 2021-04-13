<template>
   
  <input
    :pattern="patternValue"
    :value="modelValue"
    :placeholder="label"
    :name="nameValue"
    :id="idValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="inputField"
  />
</template>
<script>
export default {
    props: {
    label:{
        type: String,
        default: ''
        },
    modelValue: {
        type: [String,Number],
        default: ''
    },
    patternValue:{
        type: [String,Number],
        default: ''
    },
    nameValue:{
        type: String,      
        default: ''
    },
    idValue:{
        type: String,
        default: ''
    }

    }
}
</script>
<style>
.inputField{
    width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
.inputField:focus{
    background-color: #ddd;
  outline: none;
}
</style>
