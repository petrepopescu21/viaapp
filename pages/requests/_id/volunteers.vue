<template>
    <div id="main" role="main">
            <h1 class="h1-title">Volunteers</h1>
            <p class="sub-header">{{this.$store.state.user.firstName}}, here is your list of active events where you are enrolled.</p>
            <div role="navigation" class="view-needs">
                <button class="third-bt primary-bt all-needs-bt" role="button" aria-label="Today needs">All</button>
                <button class="third-bt today-needs-bt" role="button" aria-label="Today needs">Favorites</button>
                
            </div>
            <div v-if="request">
                <user-card v-for="u in request.userRegistrations" v-bind:key="u._id" :id="u._id" :eventId="request._id" :isConfirmed="u.isConfirmed"/>
            </div>
        </div>
</template>

<script>
import UserCard from '~/components/volunteerCard'
export default {
    components: {UserCard},
    data() {
        return {
            request: null
        }
    },
    created() {
        console.log
        this.$axios.get(`/api/requests/${this.$route.params.id}`).then(res=>{
            this.request = res.data
        }).catch(err=>{
            this.$router.push('/')
        })
    }
};
</script>