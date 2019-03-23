<template>
    <div style="display:none;"></div>
</template>

<script>
export default {
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
            console.log(position)
            let obj = {
                user: this.$store.state.user._id,
                pos: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            }
          this.$store.state.socketConn.emit("location",obj);
          this.$store.commit('location',obj.pos)
        },
        error => {
          alert(error.message);
        },
        {
            timeout: 50000
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
};
</script>

