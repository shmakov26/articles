import api from './api'

export default {
    getCommentsByPeriod(dateFrom, dateTo) {
        return api.get('analytic/comments', {
            params: { dateFrom, dateTo }
        })
    }
}