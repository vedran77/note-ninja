import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";
import { QueueManager } from "../../services/QueueManager";

class ClearQueue implements ICommand {
	public name: string = "clearq";

	public fullText: boolean = false;

	public async handler(message: Message): Promise<void> {

		await QueueManager.instance.clearQueue(message);
	}
}

export { ClearQueue };
