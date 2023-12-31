import { ModificationSlot } from './ModificationSlot';

export interface GenerationOptions {
	/** Name of target file. */
	name: string;

	/** Path of source directory where files has to be placed. */
	sourcePath: string;
	/** Path of output directory where files has to be placed. */
	outputPath: string;

	/** Defines which folders have to be created. */
	foldersToCreate?: string[];

	/** If _defined_, will **establish** rules of modification. */
	modification?: Array<ModificationSlot>;
}
