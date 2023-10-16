import { Message } from "discord.js";
import { AudioManager } from "./AudioManager";
import { MessageManager } from "./MessageManager";
import { QueueItem } from "./Types";

class QueueManager {
	public _queue: QueueItem[] = [];

	private static _instance: QueueManager;

	public static get instance(): QueueManager {
		if (!this._instance) {
			this._instance = new QueueManager();
		}
		return this._instance;
	}

	public async sendQueue(message: Message): Promise<void> {
		if (!this._queue.length) {
			message.channel.send({
				embeds: [
					{
						color: 0x206694,
						title: "Nothing in the queue",
					},
				],
			});

			return;
		}

		const fields = this._queue.map((item, index) => ({
			name: `${index + 1}) **${item.title}**`,
			value: "",
		}));

		message.channel.send({
			embeds: [
				{
					color: 0x206694,
					title: "Queue 🎶",
					fields,
				},
			],
		});
	}

	public add(item: QueueItem): void {
		this._queue.push(item);
		AudioManager.instance.onSongAdd();

		if (this._queue.length > 0) {
			MessageManager.instance.sendEmbed({
				color: 0x206694,
				thumbnail: { url: item.channel.iconURL({ size: 64 }) },
				title: item.title,
				fields: [
					{
						name: "** Added  to queue ⌛ **",
						value: `[${item.title}](${item.url})`,
					},
				],
			});
		}
	}

	public remove(item: QueueItem): void {
		this._queue.filter((element) => element !== item);
	}

	public playNext(): QueueItem | null {
		if (this._queue.length === 0) {
			return null;
		}

		return this._queue.shift();
	}
}

export { QueueManager };
