import { existsSync, copyFileSync } from 'fs';
import * as path from 'path';
import * as clc from 'cli-color';
import { inquirer } from './inquirer';
import { deleteFileSync } from './deletion';
import { isUndefined } from '@xenopomp/advanced-utils';
import { GenerationOptions } from '../types/GenerationOptions.interface';
import { createDirSync } from './creation';

/**
 * Generates entity.
 *
 * @param name
 * @param sourcePath
 * @param outputPath
 * @param foldersToCreate
 * @param modification
 * @param modify
 */
const generate = async ({
	name,
	sourcePath,
	outputPath,
	foldersToCreate,
	modification,
	modify,
}: GenerationOptions & {
	modify?: boolean;
}) => {
	const FILE_CHANGE_DISABLED = false;

	const sourceFileName = path.join(sourcePath, name);
	const outputFileName = path.join(outputPath, name);

	// Check for folders to create
	const missingFolders = foldersToCreate?.filter(fold => {
		const requestedPath = path.join(outputPath, fold);

		return !existsSync(requestedPath);
	});

	// Create all missing folders
	missingFolders?.forEach(fold => {
		createDirSync(fold);
	});

	// Check if target file exists.
	if (existsSync(outputFileName)) {
		console.log(`File ${clc.bold.bgMagenta(name)} already exists.`);

		const override = await inquirer.confirm({
			message: 'Want to override it?',
		});

		if (!override) {
			console.log(`${clc.red('File generation canceled.')}`);
			return;
		}

		if (!FILE_CHANGE_DISABLED) {
			deleteFileSync(outputFileName);
		}
	}

	if (!FILE_CHANGE_DISABLED) {
		copyFileSync(sourceFileName, outputFileName);
	}

	// Do not emit modification check if it is not defined.
	if (isUndefined(modification)) {
		// Check if modify flag is set.
		if (modify) {
			console.log(
				`${clc.bgCyan(
					`This item has not ${clc.italic('any modification rule.')}`,
				)}`,
			);
		}

		return;
	}
};

export default generate;
