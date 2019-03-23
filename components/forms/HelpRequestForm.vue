<template>
    <div>
        <p>pickup</p>
        <input type="text" v-model="keyword" v-on:input="getList">
        <button>Submit</button>
        <button @click="getCurrentLoc">Get Current Location</button>
        <ul aria-live="polite">
            <li :tabindex="index" v-for="(i,index) in results" v-bind:key="i.id">{{i.name}}</li>
            <li tabindex="0" v-if="results.length==0">No Results Found</li>
        </ul>
    </div>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
    data() {
        return {
            keyword: "",
            results: [],
            loctype: 0,
            item: {
                title: "",
                desc: "",
                count: "",
                start: "",
                duration: ""
            }
        }
    },
    computed: {
        loc() {
            if(this.loctype == 0)
                return "Current Location"
        },
        latlng() {
            return `${this.$store.state.user.lat},${this.$store.state.user.longit}`
        }
    },
    methods: {
        getCurrentLoc() {
            console.log(locString)
        },
        getList:
            debounce(function(){
                if(this.keyboard!="")
                this.$axios.get(`/api/geocode/${this.keyword}/${this.latlng}`).then((res)=>{
                    // console.log(res.data.results)
                    this.results = res.data.json.results
                })
            },500)
    }
}
</script>
