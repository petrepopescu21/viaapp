<template>
<div>
    <div v-if="user" class="event-card user-card" role="button" aria-roledescription="View: I need help to go to the pharmacy this weekend">
                <img :src="user.thumb" alt="User name avatar" width="70" height="70" class="card-avatar">
                <div class="card-user-details">
                    <h2 class="event-title">
                        {{user.firstName}} {{user.lastName}}
                    </h2>
                    <div class="card-rating" >
                        <span aria-label="user rating 158"><i class="fas fa-heart"></i> 158</span> | <span aria-label="user badges">5 badges</span>
                    </div>
                    <nuxt-link :to="`/volunteers/${user._id}`" class="third-bt view-vol-bt only-profile" role="button" aria-label="View volunteer profile">View profile</nuxt-link>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    };
  },
  props: ["id"],
  created() {
    this.$axios.get(`/api/users/${this.id}`).then(res => {
      this.user = res.data;
    });
  }
};
</script>

<style>
</style>
