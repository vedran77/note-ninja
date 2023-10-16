import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";
import { QueueManager } from "../../services/QueueManager";

class Queue implements ICommand {
	public name: string = "queue";

	public fullText: boolean = false;

	public async handler(message: Message, fullText: string): Promise<void> {
		message.react("🎶");
		await QueueManager.instance.sendQueue(message);
	}
}

export { Queue };
