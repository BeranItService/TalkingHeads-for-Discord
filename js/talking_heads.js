window.onload = function () {
    var nw = require('nw.gui');
    var $ = require('jQuery');
    var Discord = require('discord.io');
    
    var win = nw.Window.get();
    var $head = null;
    var $talkingHead = null;
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
        $(document).find('.users').empty();

        for (var id in users) {
            if (id !== client.id) {
                $talkingHead = $head.clone().show().css('display', 'inline-block');
                
                var customCharacter = window.BJ.custom[users[id].username] || {};
                var topImg = customCharacter.image_top || 'img/t_top.png';
                var topImgSleeping = customCharacter.image_bottom || 'img/t_top_sleeping.png';
                var bottomImg = customCharacter.image_bottom || 'img/t_bot.png';
                var shakeStyle = 'shake-constant ' + (customCharacter.shake_style || 'shake-chunk');
                var nickname = customCharacter.nick || users[id].username;
                var animationType = customCharacter.animation_type || "shake";

                $(document).find('.users').append($talkingHead);
                if (animationType === "shake") {
                    $talkingHead.find('.top img').attr('src', topImg);
                    $talkingHead.find('.bot img').attr('src', bottomImg);
                    $talkingHead.find('.name').append(nickname);

                    if (users[id].speaking) {
                        $talkingHead.find('.top img').attr('src', topImg);
                        $talkingHead.find('.top').addClass(shakeStyle);
                    } else {
                        $talkingHead.find('.top').removeClass(shakeStyle);
                        if (!users[id].timeSinceLastSpoke || time - users[id].timeSinceLastSpoke >= config.sleepAfterSeconds) {
                            $talkingHead.find('.top img').attr('src', topImgSleeping);
                        } 
                    }
                }

                if (animationType === "gif") {
                    $talkingHead.find('.top img').addClass('gif');
                    $talkingHead.find('.bot').remove();
                    $talkingHead.find('.name').append(nickname);

                    if (users[id].speaking) {
                        $talkingHead.find('.top img').attr('src', customCharacter.talking);
                    } else {
                        $talkingHead.find('.top img').attr('src', customCharacter.idle);
                        if (!users[id].timeSinceLastSpoke || time - users[id].timeSinceLastSpoke >= config.sleepAfterSeconds) {
                            $talkingHead.find('.top img').attr('src', customCharacter.sleeping);
                        } 
                    }
                }
            }
        }
    };

    var getConnectedUsers = function () {
        return client.channels[config.voiceChannelID].members;
    };

    $(document).ready(function () {
        $head = $(document).find('.head');
        $head.hide();

        client.on('ready', function() {

            client.joinVoiceChannel(config.voiceChannelID, function(error, events) {
                if (error) return console.error(error);

                events.on('speaking', function(userID, SSRC, isSpeaking) {
                    var speaking = client.users[userID].username;
                    users = getConnectedUsers();

                    for(var id in users) {
                        if (users[id].user_id === userID) {
                            // adding a custom property 
                            users[id].speaking = isSpeaking;
                            if (!isSpeaking) {
                                users[id].timeSinceLastSpoke = time;
                            }
                        }
                        users[id].username = client.users[id].username;
                    }

                    updateTalkingFaces();
                });
            });
        });
    });
};