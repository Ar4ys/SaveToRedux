import config from "./../../../config"
import { DependencyResolver } from "./../dependency-resolver"
import {
	missingComponentsAlert
} from './utils'

const BdApi = global.BdApi
const { React } = BdApi

export class DependencyErrorPlugin {
	constructor() {
		this._XL_PLUGIN = true
		this.start = this.handleMissingLib
	}

	getName() {
		return this.name.replace(/\s+/g, '')
	}

	getAuthor() {
		return this.author
	}

	getVersion() {
		return this.version
	}

	getDescription() {
		return `${this.description} You are missing libraries for this plugin, please enable the plugin and click Download Now.`
	}

	load() {}
	stop() {}

	handleMissingLib() {
		const { XenoLibOutdated, ZeresPluginLibraryOutdated } = DependencyResolver.getStatusAll().reduce((reducer, plugin) => {
			reducer[plugin[0] + "Outdated"] = plugin[1]
			return reducer
		}, {})
		const isXenoLibAbsent = !global.XenoLib
		const isZeresPluginLibraryAbsent = !global.ZeresPluginLibrary
		const d = (isXenoLibAbsent && isZeresPluginLibraryAbsent)
				|| ((isXenoLibAbsent || isZeresPluginLibraryAbsent)
					&& (XenoLibOutdated || ZeresPluginLibraryOutdated))

		const alertContent = (() => {
			let result = `The ${d ? 'libraries' : 'library'} `

			if (isXenoLibAbsent || XenoLibOutdated) {
				result += 'XenoLib '
				if (isZeresPluginLibraryAbsent || ZeresPluginLibraryOutdated)
					result += 'and ZeresPluginLibrary '
			} else if (isZeresPluginLibraryAbsent || ZeresPluginLibraryOutdated) 
				result += 'ZeresPluginLibrary '

			result += `required for ${this.name} ${d ? 'are' : 'is'} ${isXenoLibAbsent || isZeresPluginLibraryAbsent ? 'missing' : ''}${XenoLibOutdated || ZeresPluginLibraryOutdated
				? (isXenoLibAbsent || isZeresPluginLibraryAbsent ? ' and/or outdated' : 'outdated') : ''}.`

			return result
		})()

		BdApi.showConfirmationModal("Some libraries are missing", alertContent, {
			confirmText: "Download Now",
			onConfirm: async () => {
				BdApi.showToast("Downloading is started", { type: "info" } )
				const notInstalledPlugins = await DependencyResolver.installAll()
				if (notInstalledPlugins.length) {
					missingComponentsAlert(notInstalledPlugins)
				}
			}
		})
	}

	get[Symbol.toStringTag]() {
		return 'Plugin'
	}

	get name() {
		return config.info.name
	}

	get short() {
		let string = ''
		for (let i = 0, len = config.info.name.length; i < len; i++) {
			const char = config.info.name[i]
			if (char === char.toUpperCase()) string += char
		}
		return string
	}

	get author() {
		return config.info.authors.map(author => author.name).join(', ')
	}

	get version() {
		return config.info.version
	}

	get description() {
		return config.info.description
	}
}
