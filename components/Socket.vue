<template>
    <div style="display:none;"></div>
</template>

<script>
import io from 'socket.io-client'
export default {
    mounted() {
        this.$store.commit('socketConn', io({
            query: {
                user: this.$store.state.user
            }
        }))
    }
}
</script>
