const Article = require('../models/article');

exports.postArticle = function(req, res) {
    const article = new Article({
        author: req.user._id,
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags && req.body.tags.split(',')
    });


    article.save(function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Article posted succesfully!' });
    });
};

exports.getArticles = function(req, res, next) {
    Article.find(function(err, articles) {
        if (err)
            res.send(err);

        res.json(articles);
    });
};

exports.getArticle = function(req, res) {
    Article.findById(req.params.uid,function(err, article) {
        if (err){
            res.send(err);
        }
        if(article){
            res.json(article);
        }else {
            res.status(404).json({ message: 'No such article!' });
        }
    });
};

exports.updateArticle = function(req, res) {
    Article.findById(req.params.uid,  function(err, article) {
        if (err){
            res.send(err);
        }
        if(article){
            req.body.title && (article.title = req.body.title);
            req.body.text && (article.text = req.body.text);
            req.body.tags && (article.tags = req.body.tags);
            article.save();
            res.json({ message: 'Article updated sucesfully!' });
        }else {
            res.status(404).json({ message: 'No such article!' });
        }
    });
};


exports.deleteArticle = function(req, res) {
    Article.findById(req.params.uid,function(err, article) {
        if (err){
            res.send(err);
        }
        if(article){
            article.remove();
            res.json({ message: 'Article deleted sucesfully!' });
        }else {
            res.status(404).json({ message: 'No such article!' });
        }
    });
};
