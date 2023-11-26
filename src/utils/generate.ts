import { existsSync, copyFileSync } from 'fs';
import * as path from 'path';
import * as clc from 'cli-color';
import { inquirer } from './inquirer';
import { deleteFileSync } from './deletion';
import { isUndefined } from '@xenopomp/advanced-utils';
import { GenerationOptions } from '../types/GenerationOptions.interface';

/**
 * Generates entity.
 *
 * @param name
 * @param sourcePath
 * @param outputPath
 * @param modification
 */
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
