import { Message } from "discord.js";
import { ICommand } from "../ICommand";
import { AudioManager } from "../../services/AudioManager";

class Resume implements ICommand {
	public name: string = "resume";

	public fullText: boolean = false;

	public handler(message: Message): void {
		if (!AudioManager.instance.isStopped) {
			const embed = {
				color: 0xff0037,
				title: "Error",
				description: `The song is not stopped.`,
			};

			message.reply({ embeds: [embed] });
			message.react("❌");

			return;
		}

		message.react("▶️");
		AudioManager.instance.resume();
	}
}

export { Resume };
