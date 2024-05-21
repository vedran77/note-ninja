import { Message } from "discord.js";
import { ConnectionManager } from "../../services/ConnectionManager";
import { ICommand } from "../ICommand";

class Disconnect implements ICommand {
	public name: string = "disconnect";

	public fullText: boolean = false;

	public handler(message: Message): void {
        if (!ConnectionManager.instance.exists()) {
            message.react("👋");
		    ConnectionManager.instance.disconnect();
        } else {
            message.react("❌");
            message.reply("I'm not in a voice channel.");
        }
	}
}

export { Disconnect };

