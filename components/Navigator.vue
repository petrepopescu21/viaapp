<template>
    <nav aria-label="Main Navigation" class="nav">
            <button tabindex="0" @click="closeNav" class="close-menu" aria-label="Close menu button" role="button" ><i class="fas fa-times"></i></button>
            <ul role="menubar" id="appmenu">
                <li tabindex="1" role="menuitem"><nuxt-link to="/">Dashboard</nuxt-link></li>
                <!-- <li role="menuitem">Add Need</li>
                <li role="menuitem">Add Event</li>
                <li role="menuitem">Volunteers</li>
                <li role="menuitem">Favorite volunteers</li>
                <li role="menuitem">Favorite Needs</li> -->
                <li tabindex="2" role="menuitem"><nuxt-link to="/profile">Profile</nuxt-link></li>
            </ul>
        </nav>
</template>

<script>
export default {
  methods: {
    closeNav() {
      this.$store.commit("toggleNav");
    }
  },
  mounted() {
    document.body.addEventListener("keyup", e => {
      if (e.keyCode === 27) {
        this.closeNav();
      }
    });
  },
  watch: {
      '$route'(){
          this.closeNav()
      }
  }
};
</script>
