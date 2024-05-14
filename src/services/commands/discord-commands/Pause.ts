import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";
import { AudioManager } from "../../services/AudioManager";

class Pause implements ICommand {
	public name: string = "pause";

	public fullText: boolean = false;

	public handler(message: Message, fullText: string): void {
		message.react("⏸️");
		AudioManager.instance.pause();
	}
}

export { Pause };
