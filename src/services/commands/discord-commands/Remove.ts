import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";
import { QueueManager } from "../../services/QueueManager";

class Remove implements ICommand {
	public name: string = "remove";

	public args: CommandArgument[] = [
		{
			name: "Position in queue",
			type: "number",
		},
	];

	public fullText: boolean = false;

	public handler(message: Message, fullText: string, positionInQueue: number): void {
		if (!positionInQueue || positionInQueue > QueueManager.instance.length) {
			message.reply("Can't remove this song!");
			return;
		}

		QueueManager.instance._queue.splice(positionInQueue - 1, 1);

		message.react("🗑️");
	}
}

export { Remove };
