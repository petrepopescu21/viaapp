<template>
    <div id="main" role="main">
            <h1 class="h1-title">Dashboard</h1>
            <p class="sub-header">Hi Alex, here is your list of active events where you are enrolled.</p>
            <div role="navigation" class="view-needs">
                <nuxt-link to="/newrequest" class="third-bt primary-bt today-needs-bt" role="button" aria-label="New Request">New Request</nuxt-link>
                <button class="third-bt all-needs-bt" role="button" aria-label="Today needs">Events</button>
            </div>

            <div class="event-date">
                March 27, 2019
            </div>
            <div class="event-card" role="button" aria-roledescription="View: I need help to go to the pharmacy this weekend">
                <h2 class="event-title">
                    I need help to go to the pharmacy this weekend
                </h2>
                <div class="volunteers-count" aria-label="5 volunteers">
                    10 volunteers
                </div>
            </div>

            <div class="event-card" role="button" aria-roledescription="View: I need help to go to the pharmacy this weekend">
                <h2 class="event-title">
                    Monday I want to go to do some shopping.
                </h2>
                <div class="volunteers-count" aria-label="5 volunteers">
                    7 volunteers
                </div>
            </div>

            <div class="event-card" role="button" aria-roledescription="View: I need help to go to the pharmacy this weekend">
                <h2 class="event-title">
                    Friday I like to go to a symphony concert. 
                </h2>
                <div class="volunteers-count" aria-label="5 volunteers">
                    5 volunteers
                </div>
            </div>
            
        </div>
</template>

<script>
import HelpForm from '~/components/forms/HelpRequestForm'
export default {
    components: {
        HelpForm
    }
}
</script>
