import { Message } from "discord.js";

type CommandArgument = {
	name: string;
	type: "string" | "number";
};

interface ICommand {
	readonly name: string;
	readonly fullText: boolean;
	readonly aliases?: string[];
	readonly args?: CommandArgument[];
	handler: (message: Message, fullText: string, ...args: Array<number | string>) => void;
}

export { ICommand, CommandArgument };
