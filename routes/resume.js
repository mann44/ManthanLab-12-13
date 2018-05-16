var express = require('express');
var router = express.Router();
var resume_dal = require('../dal/resume_dal');
var account_dal = require('../dal/account_dal');

/* GET USERS LISTING */
router.get ('/all', function(req, res, next) {
    resume_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/resume_view_all', {resume: result});
        }
    });
});

router.get('/add', function(req, res) {
    account_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/resume_add', {account_result:
                    result[0]});
        }
    });
});

router.get('/add/selectuser', function(req, res) {
    account_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/selectuser', {account_result:
                    result});
        }
    });
});

router.get('/insert', function(req,res) {

    resume_dal.insert(req.query, function(err,result) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302,'/resume/all');
        }
    });
});

router.get('/edit', function(req, res) {
    resume_dal.getinfo(req.query.resume_id, function(err,result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(result);
            res.render('resume/resumeUpdate', {resume:
                    result[0][0], account_result: result[1]});
        }
    });
});

router.get('/update', function(req, res) {
    resume_dal.update(req.query, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(result);
            res.redirect(302, '/resume/all');
        }
    });
});


module.exports = router;