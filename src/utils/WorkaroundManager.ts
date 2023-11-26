import { path } from 'app-root-path';

class WorkaroundManager {
	/**
	 * Returns current working directory.
	 */
	public cwd = (): string => {
		return process.cwd();
	};

	/**
	 * Returns directory of script invocation.
	 */
	public appSource(): string {
		return path;
	}
}

export default WorkaroundManager;
