import { VoiceConnection, joinVoiceChannel } from "@discordjs/voice";
import { AudioManager } from "./AudioManager";

class ConnectionManager {
	private static _instance: ConnectionManager;
	private _connection: VoiceConnection;

	public static get instance(): ConnectionManager {
		if (!this._instance) {
			this._instance = new ConnectionManager();
		}
		return this._instance;
	}

	public exists(): boolean {
		return !!this._connection;
	}

	public setup(channelId: string, guildId: string, adapterCreator: any): void {
		this._connection = joinVoiceChannel({
			channelId,
			guildId,
			adapterCreator,
		});

		this._connection.subscribe(AudioManager.instance.player);
	}

	public disconnect(): void {
		this._connection.disconnect();
		this._connection.destroy();
		this._connection = null;
	}
}

export { ConnectionManager };
