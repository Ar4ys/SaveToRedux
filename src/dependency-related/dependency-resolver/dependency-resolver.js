const path = global.require("path")
const fs = global.require("fs").promises
const request = global.require("util").promisify(global.require("request"))
const BdApi = global.BdApi

export class DependencyResolver {
	static init(config) {
		this.dependencies = config.dependencies
		this.libraries = {}
	}

	static checkDependencies() {
		for (const dependencyName in this.dependencies) {
			try {
				this.libraries[dependencyName] = BdApi.getPlugin(dependencyName)
				
				if (!this.libraries[dependencyName])
					return this.setStatus(dependencyName, { exist: false })
				
				this.setStatus(dependencyName, {
					exist: true,
					outdated: this.isLibraryOutdated(
						this.libraries[dependencyName],
						this.dependencies[dependencyName].version
					)
				})
			} catch (err) {
				this.setStatus(dependencyName, { err })
				console.error('Error while checking dependencies', err)
			}
		}
	}

	static checkStatus() {
		for (const [_, outdated] of this.getStatusAll()) {
			if (outdated) return false
		}

		return !!global.ZeresPluginLibrary && !!global.XenoLib
	}

	static getStatusAll() {
		const result = []
		for (const dependencyName in this.dependencies) {
			const outdated = this.dependencies[dependencyName].outdated
			result.push([dependencyName, outdated])
		}
		return result
	}

	static async installAll() {
		const promises = []

		for (const dependencyName in this.dependencies) {
			if (this.libraries[dependencyName].exist
				&& !this.dependencies[dependencyName].outdated) 
				continue

			promises.push(this.installDependency(dependencyName))
		}

		return (await Promise.allSettled(promises)).reduce((result, pluginState) => {
			if (pluginState.status === "rejected") {
				console.error(`Fatal error while downloading ${filename}`, pluginState.reason)
				return result.push(pluginState)
			}
		}, [])
	}

	static async installDependency(dependencyName) {
		const dependencyUrl = this.dependencies[dependencyName].rawHref
		const pluginsFolder = BdApi.Plugins.folder
		
		try {
			const { statusCode, statusMessage, headers, body } = await request(dependencyUrl)
			if (statusCode !== 200)
				throw new Error({ statusCode, statusMessage })

			const contentDisp = headers['content-disposition'];
			let filename;

			if (contentDisp && /^attachment/i.test(contentDisp)) {
				filename = contentDisp.toLowerCase()
					.split('filename=')[1]
					.split(';')[0]
					.replace(/"/g, '');
			} else {
				filename = path.basename(url.parse(fileUrl).path);
			}
				
			await fs.writeFile(path.join(pluginsFolder, filename), body)
		} catch (err) {
			throw new Error({
				filename: dependencyName,
				url: dependencyUrl,
				err
			})
		}
	}

	static setStatus(dependencyName, status) {
		const {
			exist = null,
			outdated = null,
			err = null,
		} = status

		this.dependencies[dependencyName] = {
			...this.dependencies[dependencyName],
			exist,
			outdated,
			err,
		}
	}

	static isLibraryOutdated(plugin, targetVersion) {
		let pluginVersion = plugin._config.info.version

		pluginVersion = pluginVersion.split('.').map(i => parseInt(i))
		targetVersion = targetVersion.split('.').map(i => parseInt(i))

		return targetVersion[0] > pluginVersion[0]
				|| targetVersion[1] > pluginVersion[1]
				|| targetVersion[2] > pluginVersion[2]
	}
}
