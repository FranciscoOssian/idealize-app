const functions = require('firebase-functions');
const admin = require('firebase-admin');

const deleteProject = require('./src/functions/deleteProject.js');

exports.deleteProject = functions.https.onRequest( (req, resp) => deleteProject(req, resp) );
