import { Message } from "discord.js";
import { ConnectionManager } from "../../services/ConnectionManager";
import { ICommand } from "../ICommand";

class Join implements ICommand {
	public name: string = "join";

	public fullText: boolean = false;

	public handler(message: Message): void {
		message.react("✅");
		if (!ConnectionManager.instance.exists()) {
			ConnectionManager.instance.setup(message.member.voice.channel.id, message.guild.id, message.guild.voiceAdapterCreator);
		} else {
			message.react("❌");
			message.reply("I'm already in a voice channel.");
		}
	}
}

export { Join };

