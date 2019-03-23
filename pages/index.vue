<template>
    <component :is="userSpecificVue" />
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
