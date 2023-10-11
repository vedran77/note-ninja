# Note Ninja

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Discord](https://img.shields.io/badge/discord-join-7289DA.svg)](https://discord.gg/YOUR_DISCORD_INVITE_LINK)

A simple and powerful Discord music bot built with TypeScript and Discord.js.

## Features

- **Play Music**: Play music from YouTube, Spotify, SoundCloud, or any other audio source.
- **Queue Management**: Manage a queue of songs to play.
- **Skip and Pause**: Skip to the next song or pause the currently playing song.
- **Volume Control**: Adjust the volume of the bot in the voice channel.
- **Playlist Support**: Save and play playlists.
- **Easy to Use**: User-friendly commands to control the bot.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vedran77/note-ninja.git
   cd note-ninja
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the bot:**
   - Create a new application and bot on the [Discord Developer Portal](https://discord.com/developers/applications).
   - Copy your bot token.
   - Create a `.env` file in the project root and add the following:
     ```env
     DISCORD_TOKEN=YOUR_BOT_TOKEN
     ```

4. **Run the bot:**
   ```bash
   npm start
   ```

## Commands

- `!play <song>`: Play a song.
- `!skip`: Skip the current song.
- `!pause`: Pause the current song.
- `!resume`: Resume the paused song.
- `!queue`: Display the current queue.
- `!volume <level>`: Adjust the volume (0-100).
- `!playlist <playlist_name>`: Play a saved playlist.
- `!save <playlist_name>`: Save the current queue as a playlist.
- `!help`: Display the list of available commands.

## Contributing

Contributions are welcome! Please follow these guidelines:

- Fork the repository.
- Create a new branch: `git checkout -b feature/your-feature-name`.
- Commit your changes: `git commit -m 'Add some feature'`.
- Push to the branch: `git push origin feature/your-feature-name`.
- Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
