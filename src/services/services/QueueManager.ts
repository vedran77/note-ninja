import { AudioManager } from "./AudioManager";

class QueueManager {
	public _queue: QueueItem[] = [];

	private static _instance: QueueManager;

	public static get instance(): QueueManager {
		if (!this._instance) {
			this._instance = new QueueManager();
		}
		return this._instance;
	}

	public add(item: QueueItem): void {
		this._queue.push(item);
		AudioManager.instance.onSongAdd();
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
