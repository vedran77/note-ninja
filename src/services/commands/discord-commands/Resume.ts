import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";
import { AudioManager } from "../../services/AudioManager";

class Resume implements ICommand {
	public name: string = "resume";

	public fullText: boolean = false;

	public handler(message: Message): void {
		message.react("▶️");
		AudioManager.instance.resume();
	}
}

export { Resume };
