import signale from "signale";
import { Event } from "../Event";
import { IEvent } from "../IEvent";
import { Message as DiscordMessage, Events } from "discord.js";
import { Command } from "../../commands/Command";

class Message extends Event implements IEvent {
	protected _name: string = Events.MessageCreate;

	public async handle(message: DiscordMessage): Promise<void> {
		signale.success("New message received! 🤖");

		console.log("mc", message.content, process.env.PREFFIX);

		if (message.content.startsWith(process.env.PREFFIX)) {
			console.log("asd", message.content);
			Command.callCommand(message, message.content);
		}
	}
}

export { Message };
