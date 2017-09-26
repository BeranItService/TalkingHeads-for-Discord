
var $head = null;
var users = [];
var time = 0;

var timeInterval = setInterval( function () {
    time += 1;
    updateTalkingFaces();
}, 1000);

var client = new Discord.Client({
    token: config.token,
    autorun: true
});

var updateTalkingFaces = function () {
    var shakeClasses = 'shake-chunk shake-constant'; 
    var $talkingHead = $head.clone().show();

    $('.users').empty();
    
    for (id in users) {
        if (id !== client.id) {
            $talkingHead = $head.clone().show();
            $('.users').append($talkingHead);
            //$talkingHead.find()
            $talkingHead.find('.name').append(users[id].username);

            if (users[id].speaking) {
                $talkingHead.find('.top img').attr('src', 'img/t_top.png');
                $talkingHead.find('.top').addClass(shakeClasses);
            } else {
                $talkingHead.find('.top').removeClass(shakeClasses);
                if (!users[id].time_since_last_speak || time - users[id].time_since_last_speak >= config.sleepAfterSeconds) {
                    $talkingHead.find('.top img').attr('src', 'img/t_top_sleeping.png');
                } 
            }
        }
    }
}

var getConnectedUsers = function () {
    return client.channels[config.voiceChannelID].members;
}

$(document).ready(function () {
    $head = $('.terrance');
    $head.hide();

    client.on('ready', function() {

        client.joinVoiceChannel(config.voiceChannelID, function(error, events) {
            if (error) return console.error(error);

            events.on('speaking', function(userID, SSRC, isSpeaking) {
                var speaking = client.users[userID].username;
                users = getConnectedUsers();

                for(id in users) { 
                    if (users[id].user_id === userID) {
                        // adding a custom property 
                        users[id].speaking = isSpeaking;
                        if (!isSpeaking) {
                            users[id].time_since_last_speak = time;
                        }
                    }
                    users[id].username = client.users[id].username;
                }

                updateTalkingFaces();
            });
        });
    });
});
