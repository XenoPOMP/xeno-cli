import { Args, Command, Flags, ux } from '@oclif/core';
import WorkaroundManager from '../utils/WorkaroundManager';
import * as clc from 'cli-color';

export default class Generate extends Command {
	private workaroundManager = new WorkaroundManager();

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
		// file: Args.string({ description: 'file to read' }),
		entityType: Args.string({
			required: true,
			options: ['prettier'],
		}),
	};

	public async run(): Promise<void> {
		console.log(
			`Running generation script from ${clc.bold(
				clc.green(this.workaroundManager.curDir()),
			)}\n` +
				`Script source dir ${clc.bold.yellow(this.workaroundManager.cwd())}`,
		);
	}
}
