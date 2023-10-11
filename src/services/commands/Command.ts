import _ from "lodash";

import * as commands from "./discord-commands";
import signale from "signale";
import { CommandArgument, ICommand } from "./ICommand";
import { Message } from "discord.js";

class Command {
	private static _commandList: Map<string, (message: Message, fullText: string, ...args: string[]) => void> =
		new Map();

	public static callCommand(message: Message, text: string): void {
		const args: string[] = text.slice(process.env.PREFIX.length).split(/ +/);
		const command: string = args.shift().toLowerCase();

		if (!this._commandList.has(command)) {
			message.reply("Nepostojeca komanda.");
			return;
		}

		this._commandList.get(command)(message, _.join(args, " "), ...args);
	}

	public static loadCommands(): void {
		const allCommands: ICommand[] = _.map(commands, (command: any) => new command());
		_.forEach(allCommands, (command: ICommand) => {
			const handler: (message: Message, fullText: string, ...args: string[]) => void = (
				message: Message,
				fullText: string,
				...args: string[]
			) => {
				if (!!command.fullText) {
					if (_.isUndefined(args[0])) {
						signale.debug(`Client ${message.author.displayName} > Command: ${command.name}.`);
						message.reply(`${process.env.PREFIX}${command.name} < ${_.get(command, "args.0.name")} >`);
						return;
					}
					command.handler(message, fullText, ...args);
				} else {
					const commandArgs: Array<number | string> = [];
					let argsCorrect: boolean = true;

					if (!_.isEmpty(args) && command.args) {
						if (args.length !== command.args.length) {
							let args: string = "";

							_.forEach(command.args, (arg) => {
								args += `< ${arg.name} > `;
							});

							message.reply(`${process.env.PREFIX}${command.name} ${args}`);
							return;
						}

						// prolazimo kroz sve parametre i gledamo da li su okej
						_.forEach(command.args, (arg: CommandArgument, current: number) => {
							const currentArgument: string = args[current];
							let parsedArg: number | string = Number(currentArgument);

							if (arg.type === "number") {
								if (_.isNaN(parsedArg)) {
									argsCorrect = false;
									message.reply(
										`${process.env.PREFIX}${command.name} | Error while parsing argument ${currentArgument}`
									);
									return;
								}
							}

							if (arg.type === "string") {
								if (!_.isNaN(parsedArg)) {
									argsCorrect = false;
									message.reply(
										`${process.env.PREFIX}${command.name} | Error while parsing argument ${currentArgument}`
									);
									return;
								} else {
									parsedArg = currentArgument;
								}
							}

							commandArgs.push(parsedArg);
						});
					}

					// ako nisu argumenti dobri
					if (!argsCorrect) {
						if (command.help) {
							_.forEach(command.help, (help: string) => {
								message.reply(`[b]${process.env.PREFIX}${command.name} || ${help}`);
								return;
							});

							return;
						}

						message.reply(
							`[b]${process.env.PREFIX}${command.name} ${_.join(
								_.map(command.args, (arg: CommandArgument) => `[${arg.name}]`),
								" "
							)}`
						);
					}

					signale
						.scope("commands")
						.debug(
							`Client '${message.author.displayName}' > Command: '${
								command.name
							}' Args: '${commandArgs.join(" ")}'.`
						);
					command.handler(message, fullText, ...commandArgs);
				}
			};
			this._commandList.set(command.name, handler);

			if (command.aliases) {
				for (const alias of command.aliases) {
					this._commandList.set(alias, handler);
				}
			}
		});
	}
}

export { Command };
