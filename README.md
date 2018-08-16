# TalkingHeads for Discord

[![Join the chat at https://gitter.im/TalkingHeads-for-Discord/Lobby](https://badges.gitter.im/TalkingHeads-for-Discord/Lobby.svg)](https://gitter.im/TalkingHeads-for-Discord/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Something you can use in your streams to allow the audience see who's talking on your Discord.

![Talking Heads](https://raw.githubusercontent.com/ibito/TalkingHeads-for-Discord/master/img/talkingheads.gif)

## Requirements
* Node.js

* Create a new Discord bot [here](https://discordapp.com/developers/applications/me)
* Make it a bot by clicking on `Create a Bot User`
* Get your bot token
* Clone this repo (`git clone https://github.com/ibito/TalkingHeads-for-Discord.git`)
* Go to the repo's path, and do an `npm install`
* Modify `app/talkingheads_config.js` and paste the bot's token and the channel ID you want the bot to be "listening"

(You can get your channel ID from Discord, go to Settings -> Appearance and enable "Developer Mode", then right click your channel -> Copy ID).

* To invite your new bot to your server, get your bot's CLIENT ID from the bot's discord page ([this one](https://discordapp.com/developers/applications/me)), then go to this URL: `https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0` (don't forget to replace `YOUR_CLIENT_ID_HERE` with your bot's Client ID). Select your server, then click `Authorize`.

* Again in the repo's path, do a `npm start`
* Last step, go to `http://localhost:3000` or add it in your OBS (or whatever streamming app you use).


* OPTIONAL: you can change the animation to `gif` in `custom/config.js`

## Features
- [x] Create a character for each person talking in a voice channel
- [x] Animate character when a person talks
- [x] Character sleeps after a minute without talking (can be changed in `js/config.js`)
- [x] Gif support, you can add different gifs for `talking`, `idle` and `sleeping`
- [ ] Customizable characters (different animation types)
- [ ] New ideas?

## Contributing

* Fork it!
* Create your feature branch: git checkout -b my-new-feature
* Commit your changes: git commit -am 'Add some feature'
* Push to the branch: git push origin my-new-feature
* Submit a pull request :smile:

## Credits
 
* [elrumordelaluz/csshake](https://github.com/elrumordelaluz/csshake) for the CSS shake animations
* [izy521/discord.io](https://github.com/izy521/discord.io) for the Discord API for Javascript
 
## License
 
The MIT License (MIT)

Copyright (c) 2017 Ib Quezada

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
