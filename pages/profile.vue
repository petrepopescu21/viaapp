<template>
<div>
    <h1>What are you?</h1>
    <!-- <profile-form :value="user" @input="(newUser)=>{user=newUser}"></profile-form> -->
    <button v-on:click="handleRegister(0)">User</button>
    <button v-on:click="handleRegister(1)">Volunteer</button>
    <button v-on:click="handleRegister(2)">Promoter</button>
</div>
</template>

<script>
import ProfileForm from "@/components/forms/ProfileForm";
export default {
  components: { ProfileForm },
  computed: {
    user: {
      get() {
        return this.$store.state.user;
      },
      set(val) {
        this.$store.commit("user", val);
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$axios.post("/api/users", this.user).then(res => {
        console.log("OK");
      });
    },
    handleRegister(type) {
      let x = this.user;
      x.accountType = type;
      this.$axios.post("/api/users", x).then(res => {
        this.$store.commit("user",res.data)
        
      });
      this.$router.push('/')
    }
  }
};
</script>

