window.onload = function () {
    var socket = io.connect('http://localhost:3000');
    var $head = $('.head');
    var $talkingHead = null;
    var users = [];
    var time = 0;
    var sleepTime = 0;

    socket.on('users', function (data) {
        users = data;
        updateTalkingFaces();
    });

    socket.on('botId', function (data) {
        botId = data;
    });

    socket.on('sleepTime', function (data) {
        sleepTime = data;
    }); 

    socket.on('time', function (data) {
        time = data;
    });

    var updateTalkingFaces = function () {
        $(document).find('.users').empty();

        for (var id in users) {
            if (!users[id].isBot && !users[id].ignored) {
                $talkingHead = $head.clone().show().css('display', 'inline-block');

                var customCharacter = window.BJ.custom[users[id].username] || {
                    "animation_type": "gif",
                    "idle": "custom/gifs/steve/idle_blink.gif",
                    "talking": "custom/gifs/steve/talking.gif",
                    "sleeping": "custom/gifs/steve/sleep.gif"
                };
                var nickname = customCharacter.nick || users[id].username;

                $(document).find('.users').append($talkingHead);

                $talkingHead.find('.top img').addClass('gif');
                $talkingHead.find('.bot').remove();
                $talkingHead.find('.name').append(nickname);

                if (users[id].speaking) {
                    $talkingHead.find('.top img').attr('src', customCharacter.talking);
                } else {
                    $talkingHead.find('.top img').attr('src', customCharacter.idle);
                    if (!users[id].timeSinceLastSpoke || time - users[id].timeSinceLastSpoke >= sleepTime) {
                        $talkingHead.find('.top img').attr('src', customCharacter.sleeping);
                    }
                }
           
            }
        }
    };

    updateTalkingFaces();
};