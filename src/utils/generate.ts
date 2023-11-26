import { existsSync, copyFileSync } from 'fs';
import * as path from 'path';
import * as clc from 'cli-color';
import { inquirer } from './inquirer';
import { deleteFileSync } from './deletion';

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
	const sourceFileName = path.join(sourcePath, name);
	const outputFileName = path.join(outputPath, name);

	if (existsSync(outputFileName)) {
		console.log(`File ${clc.bold.bgMagenta(name)} already exists.`);

		const override = await inquirer.confirm({
			message: 'Want to override it?',
		});

		if (!override) {
			console.log(`${clc.red('File generation canceled.')}`);

			process.exit(0);
		}

		deleteFileSync(outputFileName);

		copyFileSync(sourceFileName, outputFileName);
	}
};

export default generate;
