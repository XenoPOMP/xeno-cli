import { existsSync, copyFileSync } from 'fs';
import * as path from 'path';
import * as clc from 'cli-color';
import { inquirer } from './inquirer';
import { deleteFileSync } from './deletion';
import { isUndefined } from '@xenopomp/advanced-utils';

interface GenerationOptions {
	/** Name of target file. */
	name: string;

	/** Path of source directory where files has to be placed. */
	sourcePath: string;
	/** Path of output directory where files has to be placed. */
	outputPath: string;

	/** If _defined_, will **establish** rules of modification. */
	modification?: {};
}

const generate = async ({
	name,
	sourcePath,
	outputPath,
	modification,
}: GenerationOptions) => {
	const sourceFileName = path.join(sourcePath, name);
	const outputFileName = path.join(outputPath, name);

	// Check if target file exists.
	if (existsSync(outputFileName)) {
		console.log(`File ${clc.bold.bgMagenta(name)} already exists.`);

		const override = await inquirer.confirm({
			message: 'Want to override it?',
		});

		if (!override) {
			console.log(`${clc.red('File generation canceled.')}`);

			process.exit(0);
		}

		// deleteFileSync(outputFileName);
	}

	// copyFileSync(sourceFileName, outputFileName);

	// Do not emit modification check if it is not defined.
	if (isUndefined(modification)) {
		return;
	}
};

export default generate;
