import { Args, Command, Flags } from '@oclif/core';
import { existsSync } from 'fs';
import * as path from 'path';
import appSource from '../utils/appSource';
import * as clc from 'cli-color';
import { CLIError } from '@oclif/core/lib/errors';
import generate, { GenerationOptions } from '../utils/generate';
import cwd from '../utils/cwd';

export default class Generate extends Command {
	static description = 'generates code files';

	static aliases = ['generate', 'g', 'gen'];

	static examples = ['<%= config.bin %> <%= command.id %>'];

	static flags = {
		// flag with a value (-n, --name=VALUE)
		// name: Flags.string({ char: 'n', description: 'name to print' }),'
		// flag with no value (-f, --force)
		// force: Flags.boolean({ char: 'f' }),

		modify: Flags.boolean({
			char: 'm',
			description: 'enable force entity modification.',
			required: false,
		}),
	};

	static args = {
		entityType: Args.string({
			required: true,
			options: ['prettier'],
		}),
	};

	public async run(): Promise<void> {
		const { args, flags } = await this.parse(Generate);

		const sharedGenerationOptions: Omit<
			GenerationOptions,
			'name' | 'modification'
		> = {
			sourcePath: path.join(appSource(), 'res'),
			outputPath: path.join(cwd()),
		};

		switch (args.entityType) {
			case 'prettier': {
				await generate({
					...sharedGenerationOptions,
					name: '.prettierrc',
					modification: flags.modify ? {} : undefined,
				});

				break;
			}
		}
	}
}
