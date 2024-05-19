import {
	AudioPlayer,
	AudioPlayerState,
	AudioResource,
	NoSubscriberBehavior,
	createAudioResource,
} from "@discordjs/voice";
import { Message } from "discord.js";
import play from "play-dl";
import signale from "signale";
import { QueueManager } from "./QueueManager";
import { QueueItem } from "./Types";
import { MessageManager } from "./MessageManager";
import { nothingIsPlaying, playEmbedMessage, seekTimeGreaterThanSong } from "../constants/errorMessages";

class AudioManager {
	private static _instance: AudioManager;
	private _audioPlayer: AudioPlayer;

	public nowPlaying: QueueItem = null;
	public isStopped: boolean = false;

	public static get instance(): AudioManager {
		if (!this._instance) {
			this._instance = new AudioManager();
		}
		return this._instance;
	}

	public get player(): AudioPlayer {
		return this._audioPlayer;
	}

	constructor() {
		this._audioPlayer = new AudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Play,
			},
		});

		this._audioPlayer.on("error", (error) => {
			signale.error("Audio Player Error: ", error);
		});

		this._audioPlayer.on("stateChange", (oldState: AudioPlayerState, newState: AudioPlayerState) => {
			if (newState.status === "idle") {
				this._audioPlayer.stop();

				const nextTrack: QueueItem = QueueManager.instance.playNext();

				if (nextTrack === null) {
					return;
				}

				this.play(nextTrack);
			}
		});
	}

	public onSongAdd(): void {
		if (this._audioPlayer.state.status === "idle") {
			const nextTrack: QueueItem = QueueManager.instance.playNext();
			if (nextTrack === null) {
				return;
			}

			this.play(nextTrack);
		}
	}

	public skip(): void {
		this._audioPlayer.stop();
	}

	public pause(): void {
		this.isStopped = true;
		this._audioPlayer.pause();
	}

	public resume(): void {
		this.isStopped = false;
		this._audioPlayer.unpause();
	}

	public seek(time: number, message: Message): void {
		if (this._audioPlayer.state.status === "idle") {
			message.reply({ embeds: [nothingIsPlaying] });
			message.react("❌");

			return;
		}

		const resourceTimeInSeconds: number = +this.nowPlaying.duration
			.split(":")
			.reduce((acc, seekTime) => String(60 * Number(acc) + +Number(seekTime)));

		// For some odd reason discord cannot seek to last 2 seconds of the audio resource
		if (time > resourceTimeInSeconds - 2) {
			message.reply({ embeds: [seekTimeGreaterThanSong(resourceTimeInSeconds)] });
			message.react("❌");
			return;
		}

		this.play(this.nowPlaying, time);
	}

	public async play(item: QueueItem, seek?: number): Promise<void> {
		const data = await play.stream(item.url, { seek });
		const resource: AudioResource = createAudioResource(data.stream, {
			inputType: data.type,
		});

		this._audioPlayer.play(resource);
		this.nowPlaying = item;

		if (seek) {
			return;
		}

		MessageManager.instance.sendEmbed(playEmbedMessage(item));
	}
}

export { AudioManager };
