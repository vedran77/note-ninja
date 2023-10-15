import { YouTubeChannel } from "play-dl";

export type QueueItem = {
	songTitle: string;
	channel: YouTubeChannel;
	views: number;
	title: string;
	thumbnail: string;
	duration: string;
	url: string;
};
