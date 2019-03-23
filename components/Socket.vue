<template>
    
</template>

<script>
import io from 'socket.io-client'
export default {
    mounted() {
        this.$store.commit('socketConn', io(process.env.WS_URL, {
            query: {
                user: this.$store.state.user
            }
        }))
    }
}
</script>
