<template>
    <div>
        <h1 v-if="!item">Looking for user...</h1>
        <ul v-if="item" >
            <!-- <user-card :id="v._id" v-for="v in item.userRegistrations" :key="v._id"></user-card> -->
            <nuxt-link :to="`${$route.path}/volunteers`"><h1 v-if="item.userRegistrations.length>0" v-html="`${item.userRegistrations.length} volunteers applied`"></h1></nuxt-link>
            <h1 v-if="item.userRegistrations.length==0">No volunteers applied yet</h1>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
import UserCard from "~/components/volunteerCard"
export default {
    components: {UserCard},
    data() {
        return {
            item: null
        }
    },
    created() {
        console.log
        this.$axios.get(`/api/requests/${this.$route.params.id}`).then(res=>{
            this.item = res.data
        }).catch(err=>{
            this.$router.push('/')
        })
    }
};
</script>

<style>
</style>
