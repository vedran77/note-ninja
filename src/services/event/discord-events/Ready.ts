import signale from "signale";
import { Event } from "../Event";
import { IEvent } from "../IEvent";

class Ready extends Event implements IEvent {
	protected _name: string = "ready";

	public async handle(): Promise<void> {
		signale.success("Bot is ready! 🤖");
	}
}

export { Ready };
