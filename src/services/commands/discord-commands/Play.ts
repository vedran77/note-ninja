import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";
import { AudioManager } from "../../services/AudioManager";
import { ConnectionManager } from "../../services/ConnectionManager";

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
		if (!ConnectionManager.instance.exists()) {
			ConnectionManager.instance.setup(
				message.member.voice.channel.id,
				message.guild.id,
				(message.channel as any).guild.voiceAdapterCreator
			);
		}

		message.react("🎵");
		AudioManager.instance.play(fullText);
	}
}

export { Play };
