<template>
    <div>
        <input type="text" v-model="value.firstName">
        <input type="text" v-model="value.lastName">
        <input type="text" v-model="value.email">
        <input type="text" v-model="value.phoneNumber">
    </div>   
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    }
  }
};
</script>
