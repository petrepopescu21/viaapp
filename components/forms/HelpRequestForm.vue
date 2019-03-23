<template>
    <div>
        <p>Title</p>
        <input type="text" name="title">
        <p>Desc</p>
        <input type="text" name="description">
        <p>Loc</p>
        <input type="text" name="location" v-model="loc" disabled>
        <p>Count</p>
        <input type="number" name="peoplecount">
        <p>Start</p>
        <input type="datetime" name="start">
        <p>End</p>
        <input type="datetime" name="end">
        <p>Duration</p>
        <input type="number" name="duration">
        <button>Submit</button>
        <button @click="getCurrentLoc">Get Current Location</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loctype: 0,
            item: {
                title: "",
                desc: "",
                count: "",
                start: "",
                end: "",
                duration: ""
            }
        }
    },
    computed: {
        loc() {
            if(this.loctype == 0)
                return "Current Location"
        }
    },
    methods: {
        getCurrentLoc() {
            console.log(locString)
        }
    }
}
</script>
