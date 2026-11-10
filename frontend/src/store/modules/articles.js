import articlesService from '../../services/articlesService'

export default {
    namespaced: true,
    state: () => ({
        articles: [],
        currentArticle: null,
        loading: false,
        error: null,
    }),
    mutations: {
        SET_ARTICLES: (state, articles) => {
            state.articles = articles;
        },
        SET_CURRENT_ARTICLE: (state, article) => {
            state.currentArticle = article;
        },
        SET_LOADING: (state, loading) => {
            state.loading = loading;
        },
        SET_ERROR: (state, error) => {
            state.error = error;
        }
    },
    actions: {
        async fetchArticles({ commit }) {
            commit('SET_LOADING', true)
            try {
                const response = await articlesService.getAll()
                commit('SET_ARTICLES', response.data)
                commit('SET_ERROR', null)
            } catch (error) {
                commit('SET_ERROR', error.message)
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async fetchArticle({ commit }, id) {
            commit('SET_LOADING', true)
            try {
                const response = await articlesService.getById(id)
                commit('SET_CURRENT_ARTICLE', response.data)
                commit('SET_ERROR', null)
            } catch (error) {
                commit('SET_ERROR', error.message)
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async createArticle({ commit }, article) {
            try {
                const response = await articlesService.create(article)
                commit('SET_ERROR', null)
                return response.data
            } catch (error) {
                commit('SET_ERROR', error.message)
                throw error
            }
        },
        async updateArticle({ commit }, {id, article}) {
            try {
                const response = await articlesService.update(id, article)
                commit('SET_ERROR', null)
                return response.data
            } catch (error) {
                commit('SET_ERROR', error.message)
                throw error
            }
        },
        async deleteArticle({ commit }, id) {
            try {
                await articlesService.delete(id)
                commit('SET_ERROR', null)
            } catch (error) {
                commit('SET_ERROR', error.message)
                throw error
            }
        }
    }
}