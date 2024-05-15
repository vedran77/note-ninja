import { Message } from "discord.js";
import { AudioManager } from "./AudioManager";
import { MessageManager } from "./MessageManager";
import { QueueItem } from "./Types";

class QueueManager {
	public _queue: QueueItem[] = [];

	public _onRepeat: boolean = false;

	private static _instance: QueueManager;

	public static get instance(): QueueManager {
		if (!this._instance) {
			this._instance = new QueueManager();
		}
		return this._instance;
	}

	public get length(): number {
		return this._queue.length;
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

	public repeat(message: Message): void {
		this._onRepeat = !this._onRepeat;

		if (this._onRepeat) {
			const fields = this._queue.map((item, index) => ({
				name: `${index + 1}) **${item.title}**`,
				value: "",
			}));

			message.channel.send({
				embeds: [
					{
						color: 0x206694,
						title: "Repeating this playlist",
						fields,
					},
				],
			});
		} else {
			message.channel.send({
				embeds: [
					{
						color: 0x206694,
						title: "Repeating stopped, playlist will go on without repeating songs.",
					},
				],
			});
		}
	}

	public playNext(): QueueItem | null {
		if (this._queue.length === 0) {
			return null;
		}

		if (this._onRepeat) {
			const nextSong = this._queue.shift();
			this._queue.push(nextSong);

			return nextSong;
		}

		return this._queue.shift();
	}

	public clearQueue(message: Message): void {
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

		this._queue = [];
		message.react("🚮");
	}
}

export { QueueManager };
