<template>
  <section class="container">
    <nuxt-link to="/profile">Profile</nuxt-link>
    <component :is="userSpecificVue" />
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import User from '~/components/pages/user.vue'
import Volunteer from '~/components/pages/volunteer.vue'
export default {
  components: {
    Logo, User, Volunteer
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    userSpecificVue() {
      let type
      if(this.user.accountType == 0)
        type = "user"
      if(this.user.accountType == 1)
        type="volunteer"
      if(this.user.accountType == 2)
        type="promoter"
      return type
    }
  },
  mounted() {
    // this.$axios.get('/api/users/5c96296c78ed615cbc151c2c').then(res=>{
    //   console.log(res.data)
    // })
    if(this.user.accountType==-1)
      this.$router.push('/profile')
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
