import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";
import { QueueManager } from "../../services/QueueManager";

class ClearQueue implements ICommand {
	public name: string = "clearq";

	public fullText: boolean = false;

	public aliases: string[] = ["clear"];

	public async handler(message: Message): Promise<void> {
		QueueManager.instance.clearQueue(message);
	}
}

export { ClearQueue };
