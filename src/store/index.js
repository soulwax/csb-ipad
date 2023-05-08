import Vue from "vue";
import Vuex from "vuex";
import sharedMutations from 'vuex-shared-mutations';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        permission: { 0: true, 1: true, 2: true },
        snack: { text: "", show: false }
    },
    mutations: {
        pane(state) {
            state.paneles[0].permission = true
        },
        showsnack(state, text) {
            state.snack.show = false
            state.snack.text = text
            state.snack.show = true
        },
        hidesnack(state) {
            state.snack.show = false
        },
    },
    actions: {},
    modules: {},
    plugins: [sharedMutations({ predicate: ['increment', 'decrement'] }), createPersistedState()],
});