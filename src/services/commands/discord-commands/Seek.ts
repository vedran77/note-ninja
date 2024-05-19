import { Message } from "discord.js";
import { CommandArgument, ICommand } from "../ICommand";
import { AudioManager } from "../../services/AudioManager";
import { seekNotGreaterThanZero } from "../../constants/errorMessages";

class Seek implements ICommand {
	public name: string = "seek";

	public aliases?: string[] = ["s"];

	public args: CommandArgument[] = [
		{
			name: "Time",
			type: "string",
		},
	];

	public fullText: boolean = true;

	public needsToBeInVoice?: boolean = true;

	public async handler(message: Message, time: string): Promise<void> {
		console.log(time);
		if (Number(time) < 0) {
			message.reply({ embeds: [seekNotGreaterThanZero] });
			message.react("❌");

			return;
		}

		AudioManager.instance.seek(Number(time), message);
		message.react("⏩");
	}
}

export { Seek };
