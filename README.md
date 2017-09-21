# TalkingHeads-for-Discord

Something you can use in your streams to allow the audience see who's talking on your Discord.

![Talking Heads](https://raw.githubusercontent.com/ibito/TalkingHeads-for-Discord/master/img/talkingheads.gif)

* Create a new Discord bot [here](https://discordapp.com/developers/applications/me)
* Get your bot token
* Modify `iboto.js` and paste the bot's token and your channel ID

(You can get your channel ID from Discord, go to Settings -> Appearance and enable "Developer Mode", then right click your channel -> Copy ID).

* To invite your new bot to your server, get your bot's CLIENT ID from the bot's discord page ([this one](https://discordapp.com/developers/applications/me)), then go to this URL: `https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0` (don't forget to replace `YOUR_CLIENT_ID_HERE` with your bot's Client ID). Select your server, then click `Authorize`.

* Last step, open the `index.html` or add it in your OBS (or whatever streamming app you use).

## Credits
 
* [elrumordelaluz/csshake](https://github.com/elrumordelaluz/csshake) for the CSS shake animations
* [izy521/discord.io](https://github.com/izy521/discord.io) for the Discord API for javascript
 
## License
 
The MIT License (MIT)

Copyright (c) 2017 Ib Quezada

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.