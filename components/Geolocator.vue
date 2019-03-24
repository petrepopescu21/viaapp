<template>
    <span>{{addr}}</span>
</template>
<script>
export default {
    props: ["lat","lng"],
    data() {
        return {
            addrObj: null
        }
    },
    created() {
        this.$axios.get(`/api/geocode/${this.lat},${this.lng}`).then(res =>{
            this.addrObj = res.data;
        }).catch(err=>{
            console.log(err)
        })
    },
    computed: {
        addr() {
            if(this.addrObj!=null && this.addrObj.json.results.length>0)
                return this.addrObj.json.results[0].formatted_address
            else return null
        }
    }
}
</script>

