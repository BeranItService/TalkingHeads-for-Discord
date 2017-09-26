
var $head = null;
var users = [];

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
            $talkingHead.find('.name').append(users[id].username);

            if (users[id].speaking) {
                $talkingHead.find('.top').addClass(shakeClasses);
            } else {
                $talkingHead.find('.top').removeClass(shakeClasses);
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
                    }
                    users[id].username = client.users[id].username;
                    console.log(users);
                }
                updateTalkingFaces();
            });
        });
    });
});
