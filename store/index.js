import axios from 'axios'
export const state = () => ({
    counter: 0,
    user: null,
    userid: null,
    socketConn: null
})

export const mutations = {
    user(state, data) {
        state.user = data
    },
    userid(state,data) {
        state.userid = data
    },
    socketConn(state,data) {
        state.socketConn = data
    },
    location(state,data) {
        state.user.lat = data.lat
        state.user.longit = data.lng
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        // console.log(req.user)
        if (req.user) {
            commit('userid',req.user._id)
        }
    }
}

export const strict = false