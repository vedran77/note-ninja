type CommandArgument = {
	name: string;
	type: "string" | "number";
};

interface ICommand {
	readonly name: string;
	readonly fullText: boolean;
	readonly aliases?: string[];
	readonly args?: CommandArgument[];
	readonly adminCommand?: boolean;
	readonly help?: string;
	handler: (user: any, fullText: string, ...args: Array<number | string>) => void;
}

export { ICommand, CommandArgument };
