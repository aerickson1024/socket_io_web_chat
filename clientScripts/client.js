var $ = require('jquery');
var initialConfiguration = require('./initialConfiguration');
var createUser = require('./createUser');
var userMessages = require('./userMessages');
var otherUsersMessages = require('./otherUsersMessages');

var socket = io();
$(document).data('username', '');
$(document).data('activeUser', '');

initialConfiguration(socket);
createUser(socket);
userMessages(socket);
otherUsersMessages(socket);
