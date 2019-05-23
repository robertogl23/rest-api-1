const express = require('express');
const { verbs } = require('./verbs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Record = require('../models/modelo');
const User = require('../models/model-user');



router.get('/', async (req,res) => {
    
    res.json(verbs);
});
router.get('/:verb', async (req,res) => {
    let verbi = req.params.verb
    let resp = verbs.find(verb => verb.i === verbi);
    if(!resp){
        
        return res.json('Error');
    }
    res.json(resp);
});


router.post('/record',(req,res) => {
    let body = req.body;

    let record = new Record({
        record: body.record
    });
    record.save((err,recordDB) => {
        if(err){
            return res.status(400).json({
                status: false,
                err

            });
        }
        res.json({
            status:true,
            record: recordDB
        })
    });
    
});

router.post('/usuario',(req,res) => {
    
    let use = new User( {
        user: req.body.user,
        email: req.body.email,
        pass: bcrypt.hashSync(req.body.pass,10)

    });

    use.save((err,userDB) => {
        if(err){
            return res.status(400).json({
                status: false,
                err

            });
        }   
        res.json({
            status: true,
            
            use: userDB
        });
    });
});

router.post('/login',(req,res) => {
    User.findOne({ email: req.body.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                status: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }
        if (!bcrypt.compareSync(req.body.pass, userDB.pass)) {
            return res.status(400).json({
                status: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: userDB
        }, 'este-ese-el-seed-desarrollo',{expiresIn: 60 *60 * 24 * 30});

        res.json({
            status: true,
            usuario: userDB,
            token
            
            
        });
    });




});

module.exports = router;
