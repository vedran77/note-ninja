import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";

class Play implements ICommand {
	public name: string = "play";

	public aliases?: string[] = ["p"];

	public args: CommandArgument[] = [
		{
			name: "Query",
			type: "string",
		},
	];

	public fullText: boolean = true;

	public handler(message: Message, fullText: string) {
		message.react("🎵");
	}
}

export { Play };
