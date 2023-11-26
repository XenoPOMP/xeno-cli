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
	public curDir(): string {
		return __dirname;
	}
}

export default WorkaroundManager;
