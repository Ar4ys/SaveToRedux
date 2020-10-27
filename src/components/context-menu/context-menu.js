import { React } from "../../runtime-imports/libs"
import { FolderSubMenu } from "./folder-submenu"
import { AddFolder } from "./add-folder"
import { SaveAs } from "./save-as"
import { InstallAddOn } from "./save-as"

export class SaveContextSubMenu extends React.Component {
	constructor({ type = "" } = {}) {
		super(arguments[0])
	}

	action = () => {
		if (this.lastUsedFolder === -1) return BdApi.showToast('No folder has been used yet', {
			type: 'error'
		})

		const folder = this.folders[this.lastUsedFolder]
		if (!folder) return BdApi.showToast('Folder no longer exists', {
			type: 'error'
		})

		const path = folder.path + `/${formattedurl.fileName}`
		/* `this` is not from here */
		this.saveFile(path, folder.path, formattedurl, type)
	}


	render = () => (	
		<MenuItem label="`Save ${this.props.type} To`" id="str" action={action}>
			{/**/...this.folders.map(folderIdx =>
				<FolderSubMenu folder={/**/this.folders[folderIdx]} idx={folderIdx}/>
			)}
			<AddFolder/>
			<SaveAs/>
			<InstallAddOn/>
		</MenuItem>
	)
}

function constructMenu(url, type, customName, onNoExtension = () => {}, fallbackExtension, proxiedUrl) {
	const formattedurl = this.formatURL(url, type === 'Icon' || type === 'Avatar', customName, fallbackExtension, proxiedUrl, 0, type === 'Theme' || type === 'Plugin')
	if (!formattedurl.extension) onNoExtension(formattedurl.url)

	// Shouldn't be there
	let downloadAttempts = 0
	const shouldDoMultiAttempts = url.indexOf('.e621.net/') !== -1 || url.indexOf('.e926.net/') !== -1

}
