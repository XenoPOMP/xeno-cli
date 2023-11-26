import { existsSync } from 'fs';
import * as path from 'path';
import * as clc from 'cli-color';
import { inquirer } from './inquirer';
import { deleteFile } from './deletion';

interface GenerationOptions {
	name: string;
	sourcePath: string;
	outputPath: string;
}

const generate = async ({
	name,
	sourcePath,
	outputPath,
}: GenerationOptions) => {
	if (existsSync(path.join(outputPath, name))) {
		console.log(`File ${clc.bold.bgMagenta(name)} already exists.`);

		const override = await inquirer.confirm({
			message: 'Want to override it?',
		});

		if (!override) {
			console.log(`${clc.red('File generation canceled.')}`);

			process.exit(0);
		}

		deleteFile(path.join(outputPath, name));
	}
};

export default generate;
