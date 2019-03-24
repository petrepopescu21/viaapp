<template>
    <div id="main" role="main">
            <h1 class="h1-title">Dashboard</h1>
            <p class="sub-header">Hi ${{user.firstName}}, here is your list of active events where you are enrolled.</p>
            <div role="navigation" class="view-needs">
                <nuxt-link to="/newrequest" class="third-bt primary-bt today-needs-bt" role="button" aria-label="New Request">New Request</nuxt-link>
                <button class="third-bt all-needs-bt" role="button" aria-label="Today needs">Events</button>
            </div>

            <!-- <div class="event-date">
                March 27, 2019
            </div> -->
            <nuxt-link :to="`/requests/${r._id}/volunteers`" v-for="r in reqs" :key="r._id" class="event-card" role="button" :aria-roledescription="`View: ${r.title}`">
                
                <h2 class="event-title">
                    {{r.title}}
                </h2>
                <div class="volunteers-count" aria-label="5 volunteers">
                    {{r.userRegistrations.length}} volunteers
                </div>


            </nuxt-link>

            
            
        </div>
</template>

<script>
import HelpForm from '~/components/forms/HelpRequestForm'
export default {
    props: ["reqs"],
    components: {
        HelpForm
    },
    data() {
        return {
            requests: null
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    
}
</script>
