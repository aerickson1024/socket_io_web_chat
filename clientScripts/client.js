var $ = require('jquery');
var createUser = require('./createUser');
var initialConfiguration = require('./initialConfiguration');
var userMessages = require('./userMessages');
var otherUsersMessages = require('./otherUsersMessages');

var socket = io();
var username = '';

initialConfiguration(socket);
createUser(socket);
userMessages(socket);
otherUsersMessages(socket);
