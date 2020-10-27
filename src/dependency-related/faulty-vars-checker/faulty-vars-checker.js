export class FaultyVarsChecker {
	static allFaultyVars = [];

	static checkVars(vars) {
		const faultyVars = []
	
		for (const varName in vars) {
			if (!vars[varName]) {
				faultyVars.push(varName)
				this.allFaultyVars.push(varName)
			}
		}

		return faultyVars
	}

	static checkStatus() {
		return this.allFaultyVars.length === 0
	}
}
