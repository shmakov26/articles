const { Article, Comment } = require('../models');

exports.createComment = async (req, res, next) => {
    try {
        const { articleId } = req.params;
        const { content } = req.body;

        const article = await Article.findByPk(articleId);

        if (!article) {
            return res.status(404).json({error: 'article not found'});
        }

        if (!content) {
            return res.status(400).json({error: 'content is empty'});
        }

        const comment = await Comment.create({
            content: content,
            articleId: articleId,
        });

        return res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

exports.getComments = async (req, res, next) => {
    try {
        const { articleId } = req.params;

        const article = await Article.findByPk(articleId);

        if (!article) {
            return res.status(404).json({error: 'article not found'});
        }

        const comments = await Comment.findAll({
            where: {articleId: articleId},
        });

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

exports.getCommentById = async (req, res, next) => {
    try {
        const { articleId, commentId } = req.params;

        const article = await Article.findByPk(articleId);

        if (!article) {
            return res.status(404).json({error: 'article not found'});
        }

        const comment = await Comment.findOne({
            where: {
                id: commentId,
                articleId: articleId,
            }
        })

        if (!comment) {
            return res.status(404).json({error: 'comment not found'});
        }

        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

exports.updateCommentById = async (req, res, next) => {
    try {
        const { articleId, commentId } = req.params;
        const { content } = req.body;

        const article = await Article.findByPk(articleId);

        if (!article) {
            return res.status(404).json({error: 'article not found'});
        }

        const comment = await Comment.findOne({
            where: {
                id: commentId,
                articleId: articleId,
            }
        })

        if (!comment) {
            return res.status(404).json({error: 'comment not found'});
        }

        if (content !== undefined) {
            comment.content = content;
        }

        await comment.save();

        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
};

exports.deleteCommentById = async (req, res, next) => {
    try {
        const { articleId, commentId } = req.params;

        const article = await Article.findByPk(articleId);

        if (!article) {
            return res.status(404).json({error: 'article not found'});
        }

        const comment = await Comment.findOne({
            where: {
                id: commentId,
                articleId: articleId,
            }
        })

        if (!comment) {
            return res.status(404).json({error: 'comment not found'});
        }

        await comment.destroy();
        res.status(204).send({ message: 'article deleted' });
    } catch (error) {
        next(error);
    }
};
