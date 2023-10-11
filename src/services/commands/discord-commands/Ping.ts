import signale from "signale";
import { CommandArgument, ICommand } from "../ICommand";
import { Message } from "discord.js";

class Ping implements ICommand {
	public name: string = "ping";

	public args: CommandArgument[] = [];

	public fullText: boolean = false;

	public handler(message: Message, fullText: string): void {
		signale.debug("Pong");
		message.reply("Pong");
		message.react("🏓");
	}
}

export { Ping };
