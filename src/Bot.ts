import _ from "lodash";
import { Client } from "discord.js";

import { IEvent } from "./services/event/IEvent";
import * as discordEvents from "./services/event/discord-events";
import { Command } from "./services/commands/Command";

class Bot {
	private static _instance: Bot;
	private _client: Client;

	public static get instance(): Bot {
		if (!this._instance) {
			this._instance = new Bot();
		}
		return this._instance;
	}

	public static get client(): Client {
		return this.instance._client;
	}

	public start() {
		this._client = new Client({
			intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates"],
		});

		this._client.login(process.env.BOT_TOKEN);

		Command.loadCommands();
		this.registerEvents();
	}

	private registerEvents(): void {
		// ucitaj sve evente
		const events: IEvent[] = _.map(discordEvents, (event: any) => {
			return new event();
		});

		_.forEach(events, (event: IEvent) => {
			this._client.on(event.eventName(), event.handle);
		});
	}
}

export { Bot };
