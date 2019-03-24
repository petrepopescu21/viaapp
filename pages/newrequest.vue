<template>
<div>
    <h1 class="h1-title">New Request</h1>
    <!-- <p class="sub-header">Hi {{$store.state.user.firstName}}, here is your list of active events where you are enrolled.</p> -->
    <help-form />
</div>
</template>

<script>
import HelpForm from "~/components/forms/HelpRequestForm";
export default {
  components: { HelpForm }
};
</script>

<style>
</style>
