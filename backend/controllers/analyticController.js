const { Article, Comment } = require("../models");
const { Op } = require("sequelize");

exports.getCommentsByPeriod = async (req, res, next) => {
    try {
        const { dateFrom, dateTo } = req.query;

        if (!dateFrom || !dateTo) {
            return res.status(400).json({
                error: "dateFrom and dateTo is required",
            });
        }

        const fromTimestamp = parseInt(dateFrom);
        const toTimestamp = parseInt(dateTo);

        if (isNaN(fromTimestamp) || isNaN(toTimestamp)) {
            return res.status(400).json({
                error: "Invalid timestamp format",
            });
        }

        const fromDate = fromTimestamp < 1e12
            ? new Date(fromTimestamp * 1000)
            : new Date(fromTimestamp * 1000);

        const toDate = toTimestamp < 1e12
            ? new Date(toTimestamp * 1000)
            : new Date(toTimestamp * 1000);

        if (fromDate > toDate) {
            return res.status(400).json({
                error: "dateFrom more than dateTo",
            })
        }

        const comments = await Comment.findAll({
            where: {
                createdAt: {
                    [Op.between]: [fromDate, toDate],
                }
            },
            include: [{
                model: Article,
                as: "article",
                attributes: ['id', 'title'],
            }],
            order: [["createdAt", "ASC"]],
        });

        const groupedByArticle = {};

        comments.forEach((comment) => {
            const articleId = comment.articleId;

            if (!groupedByArticle[articleId]) {
                groupedByArticle[articleId] = {
                    article: comment.article,
                    comments: []
                };
            }

            groupedByArticle[articleId].comments.push({
                id: comment.id,
                content: comment.content,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
            });
        });

        const result = Object.values(groupedByArticle);

        res.status(200).json({
            dateFrom: fromDate.toISOString(),
            dateTo: toDate.toISOString(),
            totalComments: comments.length,
            articles: result
        });
    } catch (error) {
        next(error);
    }
}