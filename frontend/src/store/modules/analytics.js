import analyticsService from '../../services/analyticsService.js'

export default {
    namespaced: true,
    state: () => ({
        analyticsData: null,
        loading: false,
        error: null
    }),
    mutations: {
        SET_ANALYTICS(state, analyticsData) {
            state.analyticsData = analyticsData
        },
        SET_LOADING(state, loading) {
            state.loading = loading
        },
        SET_ERROR(state, error) {
            state.error = error
        }
    },
    actions: {
        async fetchCommentsByPeriod({ commit }, { dateFrom, dateTo }) {
            commit('SET_LOADING', true)
            try {
                const response = await analyticsService.getCommentsByPeriod(dateFrom, dateTo)
                commit('SET_ANALYTICS', response.data)
                commit('SET_ERROR', null)
            } catch (error)  {
                commit('SET_ERROR', error.message)
            } finally {
                commit('SET_LOADING', false)
            }
        }
    }
}