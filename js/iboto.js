
var voiceChannelID = cfgVoiceChannelID;
var users = [];
var fullUsersInfo = [];
var talkingIds = [];
var $head = null;

var client = new Discord.Client({
    token: cfgToken,
    autorun: true
});

var addUsersToHTML = function (fullUsers) {
    var shakeClasses = 'shake-chunk shake-constant'; 
    var $talkingHead = $head.clone().show();

    $('.users').empty();

    for (var i = 0; i < fullUsers.length; i++) {
        $talkingHead = $head.clone().show();
        $('.users').append($talkingHead);
        $talkingHead.find('.name').append(fullUsers[i].username);

        if (talkingIds.indexOf(fullUsers[i].id) > -1) {
            $talkingHead.find('.top').addClass(shakeClasses);
        } else {
            $talkingHead.find('.top').removeClass(shakeClasses);
        }
    }
}

$(document).ready(function () {
    $head = $('.terrance');
    $head.hide();
    client.on('ready', function() {
        console.log("%s (%s)... in the browser!", client.username, client.id);

        client.joinVoiceChannel(voiceChannelID, function(error, events) {
            //Check to see if any errors happen while joining.
            if (error) return console.error(error);

            //This can be done on both Node and the Browser using the same code
            events.on('speaking', function(userID, SSRC, speakingBool) {
                var username = client.users[userID].username;
                //console.log("%s is %s", username, (speakingBool ? "speaking" : "done speaking") );

                // put users talking in talkingIds array
                if (speakingBool && talkingIds.indexOf(userID) === -1) {
                    talkingIds.push(userID);
                } 

                // remove any user it's not talking
                for (var i = 0; i < talkingIds.length; i++) {
                    if (!speakingBool && talkingIds.indexOf(userID) > -1) {
                        talkingIds.splice(talkingIds.indexOf(userID));                    

                        // add any user to the array if it's not in there
                        if (users.indexOf(userID) === -1) {
                            users.push(userID);
                        }
                    }
                }

                fullUsersInfo = [];
                for (var i = 0; i < users.length; i++) {
                    // remove any user it's not on the voice channel
                    if (!client.channels[voiceChannelID].members[users[i]]) {
                        users.splice(i);
                    }

                    if(client.users[users[i]]) {
                        fullUsersInfo.push({'username': client.users[users[i]].username, 'id': users[i], 'speaking': false});
                    }
                }
                
                addUsersToHTML(fullUsersInfo);
            });
        });
    });

    client.on('message', function(user, userID, channelID, message, event) {
        if (message === 'ping') {
            client.sendMessage({
                to: userID,
                message: "pong"
            });
        }
    });

});