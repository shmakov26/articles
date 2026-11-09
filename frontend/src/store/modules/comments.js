import commentsService from '../../services/commentsService'

export default {
    namespaced: true,
    state: () => ({
        comments: [],
        loading: false,
        error: null,
    }),
    mutations: {
        SET_COMMENTS: (state, comments) => {
            state.comments = comments;
        },
        SET_LOADING: (state, loading) => {
            state.loading = loading;
        },
        SET_ERROR: (state, error) => {
            state.error = error;
        }
    },
    actions: {
        async fetchComments({ commit }, articleId) {
            commit('SET_LOADING', true)
            try {
                const response = await commentsService.getAll(articleId)
                commit('SET_COMMENTS', response.data)
                commit('SET_ERROR', null)
            } catch (error) {
                commit('SET_ERROR', error.message)
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async createComment({ commit }, { articleId, content }) {
            try {
                const response = await commentsService.create(articleId, { content })
                commit('SET_ERROR', null)
                return response.data
            } catch (error) {
                commit('SET_ERROR', error.message)
                throw error
            }
        },
        async updateComment({ commit }, {articleId, commentId, content }) {
            try {
                const response = await commentsService.update(articleId, commentId, { content })
                commit('SET_ERROR', null)
                return response.data
            } catch (error) {
                commit('SET_ERROR', error.message)
                throw error
            }
        },
        async deleteComment({ commit }, { articleId, commentId }) {
            try {
                await commentsService.delete(articleId, commentId)
                commit('SET_ERROR', null)
            } catch (error) {
                commit('SET_ERROR', error.message)
                throw error
            }
        }
    }
}