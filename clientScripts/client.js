var $ = require('jquery');
var createUser = require('./createUser');
var initialConfiguration = require('./initialConfiguration');
var socket = io();
var username = '';

initialConfiguration(socket);
createUser(socket);
