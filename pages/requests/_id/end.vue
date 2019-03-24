<template>
    <div id="main" role="main">
            <h1 class="h1-title">Rate your experience</h1>
        
   
            <div v-if="users">
            <div class="event-card user-card" role="button" aria-roledescription="View: Volunteers which helped you" v-for="(u,index) in users" v-bind:key="u._id">
                <img :src="u.thumb" :alt="u.firstName" width="70" height="70" class="card-avatar">
                <div class="card-user-details">
                    <h2 class="event-title">
                        {{u.firstName}} {{u.lastName}}
                    </h2>
                    <div class="user-rtg">
                            <label for="rating">Rating :</label>
                            <select name="rating" :id="`rate-${u._id}`" v-model="rate[index]" role="option">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    <!-- <button class="third-bt view-vol-bt only-profile" role="button" aria-label="View volunteer profile">View profile</button> -->
                </div>
                
            </div>

            <div role="navigation" class="view-needs">
                    <button class="third-bt primary-bt" role="button" aria-label="Submit" @click="handleEnd">Submit</button>
 
                </div>
            </div>
        </div>
</template>

<script>
import UserCard from '~/components/volunteerCard'
export default {
    components: {UserCard},
    data() {
        return {
            request: null,
            users: [],
            rate: []
        }
    },
    methods: {
        handleEnd() {
            this.users.forEach((u,i)=>{
                if(this.rate[i]!==undefined)
                    u.ratingMean = ((u.ratingMean*u.ratingCount)+parseInt(this.rate[i]))/(u.ratingCount+1)
                    u.ratingCount+=1
                    this.$axios.post(`/api/users`,u).then(res=>{
                        
                    })
            })
            this.request.isUrgent = true
            // this.$axios.post(`/api/requests`,this.request).then(res=>{
                this.$router.push('/')
            // })
            
        }
    },
    created() {
        console.log
        this.$axios.get(`/api/requests/${this.$route.params.id}`).then(res=>{
            this.request = res.data
            res.data.userRegistrations.forEach(x=>{
                this.$axios.get(`/api/users/${x._id}`).then(r=>{
                    console.log(r)
                    this.users.push(r.data)
                })
            })
        }).catch(err=>{
            this.$router.push('/')
        })
    }
};
</script>

<style scoped>

.h1-title {
  padding-bottom: 1em;
}
</style>
