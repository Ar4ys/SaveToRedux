export default {
	main: 'index.js',
	info: {
		name: 'SaveToRedux',
		authors: [{
			name: 'Lighty',
			discord_id: '239513071272329217',
			github_username: 'LightyPon',
			twitter_username: ''
		}],
		version: '2.1.5',
		description: 'Allows you to save images, videos, profile icons, server icons, reactions, emotes and custom status emotes to any folder quickly, as well as install plugins from direct links.',
		github: 'https://github.com/1Lighty',
		github_raw: 'https://raw.githubusercontent.com/1Lighty/BetterDiscordPlugins/master/Plugins/SaveToRedux/SaveToRedux.plugin.js'
	},
	dependencies: {
		ZeresPluginLibrary: {
			version: '1.2.17',
			href: 'https://betterdiscord.net/ghdl?id=2252',
			rawHref: 'https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js'
		},
		XenoLib: {
			version: '1.3.20',
			href: 'https://betterdiscord.net/ghdl?id=3169',
			rawHref: 'https://raw.githubusercontent.com/1Lighty/BetterDiscordPlugins/master/Plugins/1XenoLib.plugin.js'
		}
	},
	changelog: [{
		title: 'fixed',
		type: 'fixed',
		items: ['Changed to module.exports because useless backwards incompatbile changes are the motto for BBD apparently.']
	}],
	defaultConfig: [{
			type: 'category',
			id: 'saveOptions',
			name: 'File save settings',
			collapsible: true,
			shown: false,
			settings: [{
					name: 'Filename preview',
					type: 'preview'
				},
				{
					name: 'File name save',
					id: 'fileNameType',
					type: 'dropdown',
					value: 0,
					options: [{
							label: 'Original',
							value: 0
						},
						{
							label: 'Date',
							value: 1
						},
						{
							label: 'Random',
							value: 2
						},
						{
							label: 'Original + random',
							value: 3
						},
						{
							label: 'Custom',
							value: 4
						}
					]
				},
				{
					name: 'Custom file name save',
					note: 'Available options: file rand date time day month year hours minutes seconds name. options must be wrapped in ${<OPTION>}!',
					id: 'customFileName',
					type: 'textbox',
					value: '${file}_${date}_${time}'
				},
				{
					name: 'Random string length',
					id: 'randLength',
					type: 'textbox',
					value: 7
				},
				{
					name: 'Conflicting filename mode',
					id: 'conflictingFilesHandle',
					type: 'radio',
					value: 0,
					options: [{
							name: 'Warn',
							value: 0
						},
						{
							name: 'Overwrite',
							value: 1
						},
						{
							name: 'Append number: (1)',
							value: 2
						},
						{
							name: 'Append random',
							value: 3
						},
						{
							name: 'Save as...',
							value: 4
						}
					]
				},
				{
					name: 'User and Server icons get saved by the users or servers name, instead of randomized',
					id: 'saveByName',
					type: 'switch',
					value: true
				},
				{
					name: 'Append server name or DM name to image/file name',
					id: 'appendCurrentName',
					type: 'switch',
					value: false
				}
			]
		},
		{
			type: 'category',
			id: 'misc',
			name: 'Misc',
			collapsible: true,
			shown: false,
			settings: [{
				name: 'Context menu option at the bottom instead of top',
				id: 'contextMenuOnBottom',
				type: 'switch',
				value: true
			}]
		}
	]
}