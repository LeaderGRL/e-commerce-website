//const express = require('express');
import express, { response } from 'express';
import bodyParser from 'body-parser';
//import { Express } from 'express';
//const { load } = require('mime');
//const products = require('./src/scripts/product/product.js');
import {expProd} from './src/scripts/product/product.js';
import { expUser } from './src/scripts/product/connexion.js';
import { expRegister } from './src/scripts/product/Inscription.js';
import session from 'express-session';
import phpExpress from 'php-express';
import path from 'path';
import axios from 'axios';

const app = express();
const oneDay = 1000 * 60 * 60 * 24;
const port = 5000;
let pseudo = "connexion"
let idIncorrect = null
let __dirname = path.resolve();
let divProd

app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'pug')

app.use(session({
    secret: (Math.random() + 1).toString(36),
    saveUninitialized:false,
    cookie: { maxAge: oneDay },
    resave: false 
}));

//---------------IMAGE---------------//
let imageForm = function(req, res) {
    res.render('images', {
        title: 'Upload Images'
    });
}

// app.use("/images", express.static("/img"));
app.use(express.static(path.join(__dirname))); 
app.get('/images', imageForm);

//---------------PAGES---------------//

app.get('/', (req, res) => {
    res.render(path.join(__dirname, "/src/frontend/index"), {
                                                                title : 'E-Commerce !',
                                                                imgUser : '/img/user.png',
                                                                imgCart : '/img/cart.png',
                                                                imgMannequin : '/img/mannequin2.png',
                                                                imgArrow : '/img/arrow_down.png',
                                                                pseudo : pseudo
                                                            })
})

app.get('/index', (req, res) => {
    res.render(path.join(__dirname, "/src/frontend/index"), {
                                                                title : 'E-Commerce !',
                                                                imgUser : '/img/user.png',
                                                                imgCart : '/img/cart.png',
                                                                imgMannequin : '/img/mannequin2.png',
                                                                imgArrow : '/img/arrow_down.png',
                                                                pseudo : pseudo
                                                            })
})

app.get('/produit/:uid', (req, res) => {
    let prod = new expProd()
    //console.log(req.params.uid)
    prod.load(req.params.uid).then(response => {
        divProd = response.data
        //console.log(response.data)
        console.log(response.data);
        //Render the page when the data are loaded
        res.render(path.join(__dirname, "/src/frontend/product/product"), {
                                                                            title : 'produit !',
                                                                            pseudo : pseudo,
                                                                            products : divProd,
                                                                            id : req.params.uid,
                                                                            link : '../'
                                                                        })
    })
    .catch(function(error){
        console.log(error);
    });
})

app.get('/produit', (req, res) => {
    let prod = new expProd()
    prod.load().then(response => {
        divProd = response.data
        //console.log(response.data)
        console.log(response.data);
        //Render the page when the data are loaded
        res.render(path.join(__dirname, "/src/frontend/product/product"), {
                                                                            title : 'produit !',
                                                                            pseudo : pseudo,
                                                                            products : divProd,
                                                                            id: null,
                                                                            link : ''
                                                                        })
    })
    .catch(function(error){
        console.log(error);
    });
})

app.get('/connexion', (req, res) => {
    res.render(path.join(__dirname, "/src/frontend/connexion/connexion"), {
                                                                            title : 'produit !',
                                                                            idIncorrect : idIncorrect
                                                                          })
})

app.get('/inscription', (req, res) => {
    // let reg = new expRegister()
    // reg.load().then(response => {
        res.render(path.join(__dirname, "/src/frontend/inscription/inscription"), {
            title : 'Inscription !'
         })
    // })
})
    
app.post('/conn', (req, res) => {
    let user = new expUser()
    user.load(req.body.email, req.body.password).then(response => {
        console.log('test : ' + response.data)
        if(response.data != "connexion"){
            pseudo = response.data
            idIncorrect = null
            req.session.userid = pseudo
            res.redirect("index")
        } else {
            idIncorrect = 'Utilisateur ou mot de passe incorrecte !'
            res.redirect('connexion')
        }
    })
})

app.post('/inscr', (req, res) => {
    let reg = new expRegister()
    reg.load(req.body.pseudo, req.body.lastname, req.body.firstname, req.body.age, req.body.country, req.body.city, req.body.address, req.body.address2, req.body.phone, req.body.mail, req.body.password).then(response => {
        console.log('test : ' + response.data)
        // if(response.data != "connexion"){
        //     pseudo = response.data
        //     idIncorrect = null
        //     req.session.userid = pseudo
        //     res.redirect("index")
        // } else {
        //     idIncorrect = 'Utilisateur ou mot de passe incorrecte !'
        //     res.redirect('connexion')
        // }
        res.redirect('connexion')
    })
})

app.use(express.static(__dirname + '/css'))

app.listen(port, () => {
    console.log('now listening on the port ' + port);
})