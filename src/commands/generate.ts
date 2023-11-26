import { Args, Command } from '@oclif/core';
import * as clc from 'cli-color';
import cwd from '../utils/cwd';
import appSource from '../utils/appSource';

export default class Generate extends Command {
	static description = 'generates code files';

	static aliases = ['generate', 'g', 'gen'];

	static examples = ['<%= config.bin %> <%= command.id %>'];

	static flags = {
		// flag with a value (-n, --name=VALUE)
		// name: Flags.string({ char: 'n', description: 'name to print' }),'
		// flag with no value (-f, --force)
		// force: Flags.boolean({ char: 'f' }),
	};

	static args = {
		entityType: Args.string({
			required: true,
			options: ['prettier'],
		}),
	};

	public async run(): Promise<void> {
		console.log(
			`Running generation script from ${clc.bold(clc.green(cwd()))}\n` +
				`Script source dir ${clc.bold.yellow(appSource())}`,
		);
	}
}
