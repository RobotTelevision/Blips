# Blips - Twitch Chat Interactive Overlay

"Blips" is a delightful web-based application designed to add an interactive, animated overlay to Twitch streams using OBS. It creates unique, animated characters ("Blips") for each user participating in the Twitch chat, bringing a lively and engaging visual element to live streams.

## Features

- **OBS Integration**: Designed to be used as a browser source in Open Broadcaster Software (OBS).
- **Twitch Chat Interaction**: Blips respond to Twitch chat messages with movement and color changes.
- **Customizable Appearance**: Each Blip's color matches the user's Twitch chat color.
- **Animated Responses**: Blips animate differently for walking, idling, and emoting.
- **Inactivity Handling**: Blips disappear after an hour of user inactivity but reappear with new messages.

## Setup

1. **Clone the Repository**:
git clone https://github.com/yourusername/blips.git
2. **Get Twitch Oauth**: Use https://twitchapps.com/tmi/ to get an Oauth code and put it in config.js
3. **Host It**: Upload to a webserver or use Python's webserver "python -m http.server" from the directory.
4. **OBS Configuration**: Add the local or hosted URL as a browser source in OBS.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/blips/issues) if you want to contribute.

## License

Distributed under the GNU General Public License v3.0. See `LICENSE` for more information.

## Contact

Project Link: (https://github.com/RobotTelevision/Blips)https://github.com/RobotTelevision/Blips
