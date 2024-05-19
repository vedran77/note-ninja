import { QueueItem } from "../services/Types";

export const seekNotGreaterThanZero = {
	color: 0xff0037,
	title: "Error",
	description: `Seek time must be greater than 0.`,
};

export const notANumber = {
	color: 0xff0037,
	title: "Error",
	description: `Seek time must be provided as number.`,
};

export const nothingIsPlaying = {
	color: 0xff0037,
	title: "Error",
	description: `Nothing is playing`,
};

export const seekTimeGreaterThanSong = (resourceTime: number) => ({
	color: 0xff0037,
	title: "Error",
	description: `Seek time cannot be greater than song length. Please seek up to ${resourceTime - 2} seconds.`,
});

export const playEmbedMessage = (item: QueueItem) => ({
	color: 0x206694,
	thumbnail: { url: item.channel.iconURL({ size: 64 }) },
	image: { url: item.thumbnail },
	title: item.title,
	fields: [
		{
			name: "** Now playing 🎧 **",
			value: `🎸 [${item.title}](${item.url})`,
		},
		{
			name: "** Channel 🎷 **",
			value: `[${item.channel.name}](${item.channel.url})`,
			inline: true,
		},
		{
			name: "** Views 👀 **",
			value: `${item.views}`,
			inline: true,
		},
		{
			name: "** Duration ⏱ **",
			value: `${item.duration}`,
			inline: true,
		},
	],
});
