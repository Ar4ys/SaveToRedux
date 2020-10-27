export function missingComponentsAlert(header, content) {
	global.BdApi.alert(header, (
		<span> 
			<div>{content}</div>
			{"Due to a slight mishap however, you'll have to download the libraries yourself. This is not intentional, something went wrong, errors are in console."}
			{isZeresPluginLibraryAbsent || ZeresPluginLibraryOutdated && (
				<div>
					<a href='https://betterdiscord.net/ghdl?id=2252' target='_blank'>
						{'Click here to download ZeresPluginLibrary'}
					</a>
				</div>	
			)}
			{isXenoLibAbsent || XenoLibOutdated && (
				<div>
					<a href='https://betterdiscord.net/ghdl?id=3169' target='_blank'>
						{'Click here to download XenoLib'}
					</a>
				</div>
			)}
		</span>
	))
}
