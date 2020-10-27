import { Messages } from "runtime-imports/utils"
import { TextInput } from "runtime-imports/components"
import { XenoLib, ZeresLibrary } from "runtime-imports/libs"
import { FilePicker } from "runtime-imports/libs/ReactComponents"

const {
	DiscordModules: { React, DiscordConstants },
	DiscordClasses
} = ZeresLibrary

export class FolderEditor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.name || "",
			path: props.path || ""
		}
		this._onNameChange = props.onNameChange || (() => {})
		this._onPathChange = props.onPathChange || (() => {})
		Libs.XenoLib.DiscordUtils.bindAll(this, ['handleNameChange', 'handlePathChange'])
	}

	handleNameChange(name) {
		this.setState({	name })
		this._onNameChange(name)
	}

	handlePathChange(path) {
		this.setState({	path })
		this._onPathChange(path)
	}

	render() {
		return <>
			<FormItem 
				className={DiscordClasses.Margins.marginBottom20.value}
				title={Messages.GUILD_FOLDER_NAME}
			>
				<TextInput
					maxLength={DiscordConstants.MAX_GUILD_FOLDER_NAME_LENGTH * 4}
					value={this.state.name}
					onChange={this.handleNameChange}
					placeholder={Messages.SERVER_FOLDER_PLACEHOLDER}
					autoFocus={true}
				/>
			</FormItem>,
			<FormItem
				className={DiscordClasses.Margins.marginBottom20}
				title='Folder path'
			>
				<FilePicker
					path={this.state.path}
					placeholder='Path to folder'
					onChange={this.handlePathChange}
					properties={['openDirectory', 'createDirectory']}
					nullOnInvalid={true}
				/>
			</FormItem>
		</>
	}
}
