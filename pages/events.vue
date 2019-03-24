<template>
    <div v-if="events" id="main" role="main">
        <h1 class="h1-title">Dashboard</h1>
            <p class="sub-header">Hi {{$store.state.user.firstName}}, here is your list of active events where you are enrolled.</p>
            <div role="navigation" class="view-needs">
                <nuxt-link to="/" class="third-bt today-needs-bt" role="button" aria-label="Submit new Request">Requests</nuxt-link>
                <nuxt-link to="/events" class="third-bt primary-bt today-needs-bt" role="button" aria-label="Events">Events</nuxt-link>
            </div>
        <nuxt-link :to="`/newrequest`" v-for="r in events" :key="r._id" class="event-card" role="button" :aria-roledescription="`Request with ${r.title}`">
                
                <h2 :aria-label="`${r.title}`" class="event-title">
                    {{r.title}}
                </h2>
                <p aria-label="event description">{{r.description}}</p><br>
                <i class="fas fa-map-marker-alt"></i> <geolocator :lat="r.lat" :lng="r.longit" /><br>
                <i class="fas fa-calendar-alt"></i> <span class="request-date">{{$moment(r.start).format('ddd, hA')}}</span>
                <div class="beneficiary-bts">
                <!-- <div class="volunteers-count" :aria-label="`${r.userRegistrations.length} volunteers applied`">
                    {{r.userRegistrations.length}} volunteers
                </div> -->
                <!-- <div class="volunteers-count" :aria-label="`${r.userRegistrations.length} volunteers applied`" @click="handleEdit(r._id)">
                    Edit
                </div> -->
                <nuxt-link :to="`/newrequest`" class="third-bt ben-end-bt" aria-label="Pick me up">
                    Pick me up
                </nuxt-link>
                
               </div>
            </nuxt-link>

    </div>
</template>

<script>
import Geolocator from "~/components/Geolocator"
export default {
    components: {Geolocator},
    data() {
        return {
            events: null
        }
    },
    created() {
        this.$axios.get(`/api/events/${this.$store.state.user.lat}/${this.$store.state.user.longit}`).then(res=>{
            this.events = res.data
        })
    }
}
</script>

<style>

</style>
