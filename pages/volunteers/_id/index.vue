<template>
<div>
    <div id="main" role="main" v-if="user">
            <img :src="user.thumb" alt="User name avatar" width="112" height="112" class="user-avatar">
            <h1 class="h1-title">{{user.firstName}} {{user.lastName}}</h1>
            
            <div class="user-rating" >
                <span aria-label="user rating 158"><i class="fas fa-heart"></i> 158</span> | <span aria-label="user badges">5 badges</span>
            </div>
            <p class="sub-header profile-sub-header">Hi Alex, here is your list of active events where you are enrolled.</p>

            <div role="navigation" class="view-needs">
            <button class="third-bt primary-bt add-to-fav-bt" role="button" aria-label="Add to favorites">Add to favorites</button>
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
  created() {
    this.$axios
      .get(`/api/users/${this.$route.params.id}`)
      .then(res => {
        this.user = res.data;
      })
      .catch(err => {
        this.$router.push("/volunteers");
      });
  }
};
</script>
