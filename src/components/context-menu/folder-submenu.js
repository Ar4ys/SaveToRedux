import { React } from "../../runtime-imports/libs"

export class FolderSubMenu extends React.component {
	// `this` is no here	
	constructor(props) {
		super(props)
	}
	
	removeFolder() {
		/* `this` is not from this class */this.folders.splice(idx, 1)
		/**/this.saveFolders()
		BdApi.showToast('Removed!', {
			type: 'success'
		})
	}

	save(open = false) {
		// `formattedurl` is not here
		this.lastUsedFolder = idx
		const path = folder.path + `/${formattedurl.fileName}`
		/**/this.saveFile(path, folder.path, formattedurl, type, open)
	}

	saveFolder = () => {
		if (!path || !path.length) return BdApi.showToast('Invalid path', {
			type: 'error'
		})
		this.folders.push({
			path: path,
			name: name || 'Unnamed'
		})
		this.saveFolders()
		BdApi.showToast('Added!', {
			type: 'success'
		})
	}

	saveDefault() {
		this.lastUsedFolder = /**/this.folders.findIndex(m => m === folder)
		const path = folder.path + `/${formattedurl.fileName}`
		this.saveFile(path, folder.path, formattedurl, type)
	}

	saveFolder(folder, path, name) {
		if (!path || !path.length) return BdApi.showToast('Invalid path', {
			type: 'error'
		})
		folder.name = name
		folder.path = path
		/**/this.saveFolders()
	}

	edit() {
		let name = folder.name.slice(0)
		let path = folder.path.slice(0)
		Modals.showModal(
			'Edit folder',
			<FolderEditor
				name={name}
				path={path}
				onNameChange={e => (name = e)}
				onPathChange={e => (path = e)}
			/>, {
				confirmText: 'Create',
				onConfirm: () => saveFolder(folder, path, name),
				size: Modals.ModalSizes.MEDIUM,
				className: 'ST-modal'
			}
		)
	}

	render = () => (
		<MenuItem label={folder.name} id={this.props.idx} action={() => this.saveDefault()}>
			<MenuItem label="Remove folder" id="remove-folder" action={() => this.removeFolder()} />
			<MenuItem label="Open Folder" id="open-folder" action={() => /**/this.openPath(folder.path)} />
			<MenuItem label="Save" id="save" action={() => this.save()} />
			<MenuItem label="Save As..." id="savetoredux-save-as" action={() => /**/this.saveAs(folder, undefined, type)} />
			<MenuItem label="Save And Open" id="save-and-open" action={() => this.save(true)} />
			<MenuItem label="Edit" id="edit" action={() => this.edit()} />
		</MenuItem>
	)
}
