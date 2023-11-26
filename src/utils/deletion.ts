import { existsSync, PathLike, unlinkSync } from 'fs';

/**
 * Deletes file synchronously.
 *
 * @param path
 */
const deleteFile = (path: PathLike) => {
	if (!existsSync(path)) {
		return;
	}

	unlinkSync(path);
};

const deleteDir = (path: PathLike) => {
	return deleteFile(path);
};

export { deleteFile, deleteDir };
