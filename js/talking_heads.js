
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
    var $talkingHead = $head.clone().show();

    $('.users').empty();

    for (id in users) {
        if (id !== client.id) {
            $talkingHead = $head.clone().show();

            var customCharacter = window.BJ.custom[users[id].username] || {};
            var topImg = customCharacter.image_top || 'img/t_top.png';
            var topImgSleeping = customCharacter.image_bottom || 'img/t_top_sleeping.png';
            var bottomImg = customCharacter.image_bottom || 'img/t_bot.png';
            var shakeStyle = 'shake-constant ' + (customCharacter.shake_style || 'shake-chunk');
            var nickname = customCharacter.nick || users[id].username;

            $('.users').append($talkingHead);
            $talkingHead.find('.top img').attr('src', topImg);
            $talkingHead.find('.bot img').attr('src', bottomImg);
            $talkingHead.find('.name').append(nickname);

            if (users[id].speaking) {
                $talkingHead.find('.top img').attr('src', topImg);
                $talkingHead.find('.top').addClass(shakeStyle);
            } else {
                $talkingHead.find('.top').removeClass(shakeStyle);
                if (!users[id].time_since_last_speak || time - users[id].time_since_last_speak >= config.sleepAfterSeconds) {
                    $talkingHead.find('.top img').attr('src', topImgSleeping);
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
