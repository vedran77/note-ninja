import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";
import { QueueManager } from "../../services/QueueManager";

class RepeatQueue implements ICommand {
	public name: string = "repeatq";

	public fullText: boolean = false;

	public async handler(message: Message): Promise<void> {
		await QueueManager.instance.repeat(message);
	}
}

export { RepeatQueue };
