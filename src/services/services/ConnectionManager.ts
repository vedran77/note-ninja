import { VoiceConnection, joinVoiceChannel } from "@discordjs/voice";

class ConnectionManager {
	private static _instance: ConnectionManager;
	private _connection: VoiceConnection;

	public static get instance(): ConnectionManager {
		if (!this._instance) {
			this._instance = new ConnectionManager();
		}
		return this._instance;
	}

	public setup(channelId: string, guildId: string, adapterCreator: any): void {
		this._connection = joinVoiceChannel({
			channelId,
			guildId,
			adapterCreator,
		});
	}
}

export { ConnectionManager };
