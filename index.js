import express from 'express';
// old syntax is replaced: const express = require('express')
// all that is needed is: "main": "index.js" line inside of package.json
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// newer way, without warnings >4.16 express version
app.use(body.json({ limit: '30mb', extended: true }));
app.use(app.urlencoded({ limit: '30mb', extended: true }));
// older way without bodyParser out of the box
// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const 
