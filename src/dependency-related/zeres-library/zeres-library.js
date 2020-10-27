export let Plugin
export let ZeresLibrary
export const buildPlugin = (config) => {
	const [ PluginClass, Api ] = global.ZeresPluginLibrary.buildPlugin(config)
	Plugin = PluginClass
	ZeresLibrary = Api
}
