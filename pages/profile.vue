<template>
<div id="main" role="main">
            <h1 class="h1-title req-prev-title">Choose the account type!</h1>
            <p class="sub-header request-dec">Hi {{this.user.firstName}}, here is your list of active events where you are enrolled.</p>

    <!-- <profile-form :value="user" @input="(newUser)=>{user=newUser}"></profile-form> -->
    <div role="navigation" class="view-needs">
                <button class="third-bt primary-bt bt-green" role="button" @click="handleRegister(0)" aria-label="Sign Up as a Beneficiary">Beneficiary</button>
            </div>
            <div role="navigation" class="view-needs">
                    <button class="third-bt" role="button" aria-label="Sign Up as a volunteer" @click="handleRegister(1)">Volunteer</button>
                </div>

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
        // console.log("OK");
      });
    },
    handleRegister(type) {
      let x = this.user;
      x.accountType = type;
      this.$axios.post("/api/users", x).then(res => {
        this.$store.commit("user", res.data);
      });
      this.$router.push("/");
    }
  }
};
</script>

