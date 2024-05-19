import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";
import { AudioManager } from "../../services/AudioManager";

class Pause implements ICommand {
	public name: string = "pause";

	public fullText: boolean = false;

	public handler(message: Message, fullText: string): void {
		if (AudioManager.instance.isStopped) {
			message.react("▶️");
			AudioManager.instance.resume();
			return;
		}

		message.react("⏸️");
		AudioManager.instance.pause();
	}
}

export { Pause };
