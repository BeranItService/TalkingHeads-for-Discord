var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var Discord = require('discord.io');

var server = app.listen(3000, function () {
    console.log('server listening on port ' + server.address().port);
});

var io = require('socket.io')(server);

var discordConfig = require('./talkingheads_config.js');

var discordClient = new Discord.Client({
    token: discordConfig.token,
    autorun: true
});

var getConnectedDiscordUsers = function () {
    return discordClient.channels[discordConfig.voiceChannelID].members;
};

var discordUsers = [];
var time = 0;

var timeInterval = setInterval(function () {
    time += 1;
}, 1000);

app.use('/img', express.static('img'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/custom', express.static('custom'));
app.use('/app', express.static('app'));

app.use(require('express-jquery')('/jquery.js'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

io.on('connection', function(socket){
    io.emit('this', { will: 'be received by everyone'});

    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });
});

app.get('/', function (req, res) {
    console.log('got \'/heads\'');
    res.render('heads');
});

discordClient.on('ready', function() {
    discordClient.joinVoiceChannel(discordConfig.voiceChannelID, function(error, events) {
        if (error) return console.error(error);

        events.on('speaking', function(userID, SSRC, isSpeaking) {
            discordUsers = getConnectedDiscordUsers();

            for(var id in discordUsers) {
                console.log(discordClient.users[id].bot);
                if (discordUsers[id].user_id === userID) {
                    // adding a custom property
                    discordUsers[id].speaking = isSpeaking;

                    if (!isSpeaking) {
                        discordUsers[id].timeSinceLastSpoke = time;
                    }
                }
                discordUsers[id].username = discordClient.users[id].username;
                discordUsers[id].isBot = discordClient.users[id].bot;
            }

            io.emit('users', discordUsers);
            io.emit('sleepTime', discordConfig.sleepAfterSeconds);
            io.emit('time', time);
        });
    });
});
