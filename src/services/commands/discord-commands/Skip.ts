import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";
import { AudioManager } from "../../services/AudioManager";

class Skip implements ICommand {
	public name: string = "skip";

	public fullText: boolean = false;

	public needsToBeInVoice?: boolean = true;

	public handler(message: Message, fullText: string): void {
		AudioManager.instance.skip();
		message.react("⏭");
	}
}

export { Skip };
