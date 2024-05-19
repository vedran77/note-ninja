import {
	AudioPlayer,
	AudioPlayerState,
	AudioResource,
	NoSubscriberBehavior,
	createAudioResource,
} from "@discordjs/voice";
import play from "play-dl";
import signale from "signale";
import { QueueManager } from "./QueueManager";
import { QueueItem } from "./Types";
import { ConnectionManager } from "./ConnectionManager";
import { MessageManager } from "./MessageManager";

class AudioManager {
	private static _instance: AudioManager;
	private _audioPlayer: AudioPlayer;

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

	public async play(item: QueueItem): Promise<void> {
		const data = await play.stream(item.url);
		const resource: AudioResource = createAudioResource(data.stream, {
			inputType: data.type,
		});

		this._audioPlayer.play(resource);

		MessageManager.instance.sendEmbed({
			color: 0x206694,
			thumbnail: { url: item.channel.iconURL({ size: 64 }) },
			image: { url: item.thumbnail },
			title: item.title,
			fields: [
				{
					name: "** Now playing 🎧 **",
					value: `🎸 [${item.title}](${item.url})`,
				},
				{
					name: "** Channel 🎷 **",
					value: `[${item.channel.name}](${item.channel.url})`,
					inline: true,
				},
				{
					name: "** Views 👀 **",
					value: `${item.views}`,
					inline: true,
				},
				{
					name: "** Duration ⏱ **",
					value: `${item.duration}`,
					inline: true,
				},
			],
		});
	}
}

export { AudioManager };
