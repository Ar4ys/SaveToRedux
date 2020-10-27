import { React } from "../../runtime-imports/libs"

export class AddFolder extends React.Component {
	constructor(props) {
		super(props)
	}

	isFolderAlreadyAdded = path => {
		const folder = /**/this.folders.find(m => m.path === path)
		if (folder) {
			BdApi.showToast(`Folder already exists as ${folder.name}!`, {
				type: 'error',
				timeout: 5000
			})

			return true
		}

		return false
	}

	saveFolder = (name, path) => {
		if (!path || !path.length) return BdApi.showToast('Invalid path', {
			type: 'error'
		})
		/**/this.folders.push({
			path: path,
			name: name || 'Unnamed'
		})
		/**/this.saveFolders()
		BdApi.showToast('Added!', {
			type: 'success'
		})
	}

	action = () => {
		dialog
			.showOpenDialog({
				title: 'Add folder',
				properties: ['openDirectory', 'createDirectory']
			})
			.then(({ filePaths: [ path ] }) => {
				if (!path) return BdApi.showToast('Maybe next time.')
				if (isFolderAlreadyAdded(path)) return

				const folderName = PathModule.basename(path)
				let name = folderName
				let path = path.slice(0)
				Modals.showModal(
					'Create New Folder',
					<FolderEditor
						name={name}
						path={path}
						onNameChange={e => (name = e)}
						onPathChange={e => (path = e)}
					/>, {
						confirmText: 'Create',
						onConfirm: () => saveFolder(name, path),
						size: Modals.ModalSizes.MEDIUM,
						className: 'ST-modal'
					}
				)
			})
	}

	render = () =>
		<MenuItem label="Add Folder" id="add-folder" action={this.action}/>
}
