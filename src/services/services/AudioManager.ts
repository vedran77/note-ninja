import { AudioPlayer, AudioPlayerState, AudioResource, createAudioResource } from "@discordjs/voice";
import play from "play-dl";
import signale from "signale";
import { QueueManager } from "./QueueManager";

class AudioManager {
	private static _instance: AudioManager;
	private _audioPlayer: AudioPlayer;

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
		this._audioPlayer = new AudioPlayer();
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

				this.play(nextTrack.url);
			}
		});
	}

	public onSongAdd(): void {
		if (this._audioPlayer.state.status === "idle") {
			const nextTrack: QueueItem = QueueManager.instance.playNext();
			if (nextTrack === null) {
				return;
			}

			this.play(nextTrack.url);
		}
	}

	public async play(url: string): Promise<void> {
		const data = await play.stream(url);
		const resource: AudioResource = createAudioResource(data.stream, {
			inputType: data.type,
		});

		this._audioPlayer.play(resource);
	}
}

export { AudioManager };
