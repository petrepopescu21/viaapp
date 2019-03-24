<template>
  <div class="container">
    <template v-if="user">
      <socket v-if="user.accountType>=0" />
      <locator v-if="sock" />
      <notifier />
    </template>
    <navigator v-if="nav" />
    <header v-if="!nav" class="pages-menu">
            <button @click="toggleNav" role="button" aria-label="Open navigation menu" class="main-menu-bt"><i class="fas fa-bars"></i></button>
            <button role="button" aria-label="About this application" class="main-menu-bt"><i class="fas fa-question"></i></button>
    </header>
    <nuxt v-if="user&&!nav" />
  </div>
</template>


<script>
import Navigator from "~/components/Navigator";
import Notifier from "~/components/Notifier";
import Socket from "~/components/Socket";
import Locator from "~/components/Locator";
export default {
  components: { Socket, Locator, Navigator, Notifier },
  mounted() {
    this.initUser();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    sock() {
      return this.$store.state.socketConn;
    },
    nav() {
      return this.$store.state.nav;
    }
  },
  methods: {
    initUser() {
      this.$axios
        .get(`/api/users/${this.$store.state.userid}`)
        .then(res => {
          this.$store.commit("user", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggleNav() {
      this.$store.commit('toggleNav')
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/app.scss";
</style>
