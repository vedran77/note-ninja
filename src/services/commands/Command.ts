import _ from "lodash";

import * as commands from "./discord-commands";
import signale from "signale";
import { CommandArgument, ICommand } from "./ICommand";
import { Message, Embed } from "discord.js";

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
				if (!!command.needsToBeInVoice) {
					if (!message.member.voice.channel) {
						message.reply("Please join a voice channel!");
						signale.debug(`Client ${message.author.displayName} > Command: ${command.name}.`);
						return;
					}
				}
				if (!!command.fullText) {
					if (_.isUndefined(args[0])) {
						signale.debug(`Client ${message.author.displayName} > Command: ${command.name}.`);

						const embed = {
							color: 0xff0037,
							title: "Error",
							description: `Please provide argument for **${_.get(command, "args[0].name")}**!`,
						};

						message.reply({ embeds: [embed] });
						message.react("❌");
						return;
					}
					command.handler(message, fullText, ...args);
				} else {
					const commandArgs: Array<number | string> = [];

					if (command.args) {
						if (_.isEmpty(args)) {
							let args: string = "";

							_.forEach(command.args, (arg) => {
								args += `${arg.name}, `;
							});

							// remove last 2 characters from args so we don't have something like 'Param, '
							args = args.slice(0, -2);

							const embed = {
								color: 0xff0037,
								title: "Error",
								description: `Missing arguments. Required args are: **${args}**!`,
							};

							message.reply({ embeds: [embed] });
							message.react("❌");
							return;
						}

						// prolazimo kroz sve parametre i gledamo da li su okej
						_.forEach(command.args, (arg: CommandArgument, current: number) => {
							const currentArgument: string = args[current];
							let parsedArg: number | string = Number(currentArgument);

							if (arg.type === "number") {
								if (_.isNaN(parsedArg)) {
									const embed = {
										color: 0xff0037,
										title: "Error",
										description: `Argument ${currentArgument} is not a number!`,
									};

									message.reply({ embeds: [embed] });
									message.react("❌");
									return;
								}
							}

							if (arg.type === "string") {
								if (!_.isNaN(parsedArg)) {
									const embed = {
										color: 0xff0037,
										title: "Error",
										description: `Argument ${currentArgument} is not a string!`,
									};

									message.reply({ embeds: [embed] });
									message.react("❌");
									return;
								} else {
									parsedArg = currentArgument;
								}
							}

							commandArgs.push(parsedArg);
						});
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
