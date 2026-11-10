import api from './api'

export default {
    getAll() {
        return api.get('article/all')
    },
    getById(id) {
        return api.get('article/' + id)
    },
    create(data) {
        return api.post('article/', data)
    },
    update(id, data) {
        return api.patch('/article/' + id, data)
    },
    delete(id) {
        return api.delete('/article/' + id)
    }
}