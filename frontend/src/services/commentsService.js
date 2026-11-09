import api from './api'

export default {
    getAll(articlesId) {
        return api.get(`/article/${articlesId}/comment/all`)
    },
    getById(articleId, commentId) {
        return api.get(`/article/${articleId}/comment/${commentId}`)
    },
    create(articleId, data) {
        return api.post(`/article/${articleId}/comment`, data)
    },
    update(articleId, commentId, data) {
        return api.patch(`/article/${articleId}/comment/${commentId}`, data)
    },
    delete(articleId, commentId) {
        return api.delete(`/article/${articleId}/comment/${commentId}`)
    }
}