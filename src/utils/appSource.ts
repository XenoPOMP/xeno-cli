import { path } from 'app-root-path';

/**
 * Returns directory of script invocation.
 */
const appSource = (): string => {
	return path;
};

export default appSource;
