import signale from "signale";
import { Bot } from "../../Bot";
import { APIEmbed, Channel, TextChannel } from "discord.js";

class MessageManager {
	public static _instance: MessageManager;
	private channelId: string;

	public static get instance(): MessageManager {
		if (!this._instance) {
			this._instance = new MessageManager();
		}
		return this._instance;
	}

	public exists(): boolean {
		return !!this.channelId;
	}

	public reset(): void {
		this.channelId = null;
	}

	public setup(channelId: string): void {
		this.channelId = channelId;
	}

	public async send(message: string): Promise<void> {
		if (!this.channelId) {
			signale.error(new Error("Channel ID not set!"));
			return;
		}

		const channel = (await Bot.client.channels.fetch(this.channelId)) as TextChannel;
		channel.send(message);
	}

	public async sendEmbed(embed: APIEmbed): Promise<void> {
		if (!this.channelId) {
			signale.error(new Error("Channel ID not set!"));
		}

		const channel = (await Bot.client.channels.fetch(this.channelId)) as TextChannel;
		channel.send({ embeds: [embed] });
	}
}

export { MessageManager };
