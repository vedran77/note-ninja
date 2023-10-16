import { Message } from "discord.js";
import play from "play-dl";
import { ConnectionManager } from "../../services/ConnectionManager";
import { MessageManager } from "../../services/MessageManager";
import { QueueManager } from "../../services/QueueManager";
import { CommandArgument, ICommand } from "../ICommand";

class Play implements ICommand {
	public name: string = "play";

	public aliases?: string[] = ["p"];

	public args: CommandArgument[] = [
		{
			name: "Query",
			type: "string",
		},
	];

	public fullText: boolean = true;

	public needsToBeInVoice?: boolean = true;

	public async handler(message: Message, query: string): Promise<void> {
		if (!ConnectionManager.instance.exists()) {
			ConnectionManager.instance.setup(
				message.member.voice.channel.id,
				message.guild.id,
				(message.channel as any).guild.voiceAdapterCreator
			);
		}

		if (!MessageManager.instance.exists()) {
			MessageManager.instance.setup(message.channel.id);
		}

		const isYoutubeUrl: boolean = this.isYoutubeUrl(query);
		if (isYoutubeUrl) {
			const video = await play.video_basic_info(query);

			QueueManager.instance.add({
				songTitle: video.video_details.title,
				channel: video.video_details.channel,
				title: video.video_details.title,
				views: video.video_details.views,
				duration: video.video_details.durationRaw,
				thumbnail: video.video_details.thumbnails[0].url,
				url: query,
			});
		} else {
			const videos = await play.search(query, {
				limit: 1,
			});

			const video = videos[0];
			QueueManager.instance.add({
				songTitle: video.title,
				channel: video.channel,
				views: video.views,
				title: video.title,
				duration: video.durationRaw,
				thumbnail: video.thumbnails[0].url,
				url: video.url,
			});
		}
	}

	private isYoutubeUrl(url: string): boolean {
		return url.includes("youtube.com") || url.includes("youtu.be");
	}
}

export { Play };
