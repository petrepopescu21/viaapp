<template>
    <div id="main" role="main">
            <h1 class="h1-title">Dashboard</h1>
            <p class="sub-header">Hi {{user.firstName}}, here is your list of active events where you are enrolled.</p>
            <div role="navigation" class="view-needs">
                <nuxt-link to="/newrequest" class="third-bt primary-bt today-needs-bt" role="button" aria-label="Submit new Request">New Request</nuxt-link>
                <nuxt-link to="/events" class="third-bt today-needs-bt" role="button" aria-label="Events">Events</nuxt-link>
            </div>

            <!-- <div class="event-date">
                March 27, 2019
            </div> -->
            <nuxt-link :to="`/requests/${r._id}/volunteers`" v-for="r in reqs" :key="r._id" class="event-card" role="button" :aria-roledescription="`Request with ${r.title}`">
                
                <h2 :aria-label="`${r.title}`" class="event-title">
                    {{r.title}}
                </h2>
                <span class="request-date">{{$moment(r.starts).format('ddd, hA')}}</span>
                <div class="beneficiary-bts">
                <div class="volunteers-count" :aria-label="`${r.userRegistrations.length} volunteers applied`">
                    {{r.userRegistrations.length}} volunteers
                </div>
                <!-- <div class="volunteers-count" :aria-label="`${r.userRegistrations.length} volunteers applied`" @click="handleEdit(r._id)">
                    Edit
                </div> -->
                <nuxt-link :to="`/requests/${r._id}/end`" class="third-bt ben-end-bt" aria-label="End request">
                    End Request
                </nuxt-link>
                
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
            requests: null,
            edit_id: null
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    methods: {
        handleEnd() {
            return true
        },
        handleEdit(x) {
            this.edit_id = x
        }
    }
}
</script>
