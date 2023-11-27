import { Args, Command, Flags } from '@oclif/core';
import * as path from 'path';
import appSource from '../utils/appSource';
import generate from '../utils/generate';
import cwd from '../utils/cwd';
import { GenerationOptions } from '../types/GenerationOptions.interface';

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
			Parameters<typeof generate>[0],
			'name' | 'modification'
		> = {
			sourcePath: path.join(appSource(), 'res'),
			outputPath: path.join(cwd()),
			modify: flags.modify,
		};

		/**
		 * Returns modification from argument,
		 * if **-m** flag has been provided.
		 *
		 * @param modification
		 */
		const offerModification = (
			modification: GenerationOptions['modification'],
		) => {
			return flags.modify ? modification : undefined;
		};

		switch (args.entityType) {
			case 'prettier': {
				await generate({
					...sharedGenerationOptions,
					name: '.prettierrc',
					foldersToCreate: ['.github', '.github/workflows'],
					// modification: offerModification([]),
				});

				break;
			}
		}
	}
}
