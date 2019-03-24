<template>
    <div style="display:none;"></div>
</template>

<script>
export default {
  mounted() {
    this.$store.state.socketConn.on("newrequestreceived", this.notifyMe);
  },
  methods: {
    sendSock() {
      this.$store.state.socketConn.to("volunteers").emit("yo");
    },
    notifyMe(data) {
        var options={
            body: data.description,
            onclick: function(event) {
                event.preventDefault();
                window.open(`/requests/${data._id}`)
            }
        }
      if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
      } else if (Notification.permission === "granted") {
        var notification = new Notification(`New request: ${data.title}`, options);
        notification.onclick=function() {window.location.href=`/requests/${data._id}`}
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function(permission) {
          if (permission === "granted") {
            var notification = new Notification(`New request: ${data.title}`, options);
            notification.onclick=function() {window.location.href=`/requests/${data._id}`}
          }
        });
      }
    }
  }
};
</script>

