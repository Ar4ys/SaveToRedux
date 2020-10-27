import config from "./../config"
import "./runtime-imports"
import {
	buildPlugin,
	DependencyResolver,
	DependencyErrorPlugin,
	FaultyVarsChecker
} from "./dependency-related"



// Check for plugin update
// PluginUpdater.checkForUpdate(this.name, this.version, this._config.info.github_raw)

DependencyResolver.init(config)
DependencyResolver.checkDependencies()
const dependencyStatus = DependencyResolver.checkStatus()
const runtimeImportsStatus = FaultyVarsChecker.checkStatus()

let Plugin;
if (dependencyStatus && runtimeImportsStatus) {
	buildPlugin(config)
	Plugin = require("./components").MainPlugin
} else if (!dependencyStatus)
	Plugin = DependencyErrorPlugin
else if (!runtimeImportsStatus) {
	try {
		Logger.error(`[**${this.name}**] Following vars are invalid: ${FaultyVarsChecker.allFaultyVars.map(e => '\n' + e).reduce((e, b) => e + b, '')}`)
		XenoLib.Notifications.error(`[**${this.name}**] Plugin is in a broken state. Please update it, press CTRL + R or ${GuildStore.getGuild(XenoLib.supportServerId) ? 'go to <#639665366380838924>' : '[join my support server](https://discord.gg/NYvWdN5)'} for further assistance.`, {
			timeout: 0
		})
	} catch (e) {}
	Plugin = RuntimeImportsErrorPlugin
} else {
	// TODO: Move logging to UniversalErrorPlugin
	try {
		Logger.error(`[**${this.name}**] Smth got wrong`)
		XenoLib.Notifications.error(`[**${this.name}**] Plugin is in a broken state. Please update it, press CTRL + R or ${GuildStore.getGuild(XenoLib.supportServerId) ? 'go to <#639665366380838924>' : '[join my support server](https://discord.gg/NYvWdN5)'} for further assistance.`, {
			timeout: 0
		})
	} catch (e) {}
	Plugin = UniversalErrorPlugin // TODO: Make universal plugin for init errors
}

export default Plugin