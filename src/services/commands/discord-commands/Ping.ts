import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";

class Ping implements ICommand {
	public name: string = "ping";

	public args: CommandArgument[] = [];

	public fullText: boolean = false;

	public handler(message: Message, fullText: string): void {
		message.react("🏓");
	}
}

export { Ping };
