const { Article, Comment } = require('../models');

exports.createArticle = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({error: 'title or content is empty'});
        }
        const article = await Article.create({title, content});
        return res.status(201).json(article);
    } catch (error) {
        next(error);
    }
};

exports.getArticles = async (req, res, next) => {
    try {
        const articles = await Article.findAll({
            include: [{
                model: Comment,
                as: 'comments',
                attributes: ['id']
            }]
        });

        const articleWithCommetCount = articles.map((article) => ({
            ...article.toJSON(),
            commentsCount: article.comments ? article.comments.length : 0
        }))
        res.status(200).json(articleWithCommetCount);
    } catch (error) {
        next(error);
    }
};

exports.getArticleById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const article = await Article.findByPk(id, {
            include: [{
                model: Comment,
                as: 'comments',
            }]
        });

        if (!article) {
            return res.status(404).json({error: 'article not found'});
        }

        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
};

exports.updateArticleById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const article = await Article.findByPk(id);

        if (!article) {
            return res.status(404).json({error: 'article not found'});
        }

        if (title !== undefined) {
            article.title = title;
        }

        if (content !== undefined) {
            article.content = content;
        }

        await article.save();

        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
};

exports.deleteArticleById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const article = await Article.findByPk(id);

        if (!article) {
            return res.status(404).json({error: 'article not found'});
        }

        await article.destroy();
        res.status(204).send({ message: 'article deleted' });
    } catch (error) {
        next(error);
    }
};
