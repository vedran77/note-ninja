import { configDotenv } from "dotenv";

import { Bot } from "./Bot";

class App {
	private static _instance: App;

	public static get instance(): App {
		if (!this._instance) {
			this._instance = new App();
		}
		return this._instance;
	}

	public start(): void {
		configDotenv();

		Bot.instance.start();
	}
}

export { App };
