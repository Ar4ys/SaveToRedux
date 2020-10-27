import { React } from "../../runtime-imports/libs"
import { Extensions } from "../../utils"

const { isImage, isVideo, isAudio } = Extensions

export class SaveAs extends React.Component {
	constructor(props) {
		super(props)
	}

	getFileType = (extension) =>
		isImage(extension)
		? 'Images'
		: isVideo(extension)
		? 'Videos'
		: isAudio(extension)
		? 'Audio'
		: 'Files'

	action = () => {
		// `formattedurl` is not here
		dialog
			.showSaveDialog({
				defaultPath: formattedurl.fileName,
				filters: formattedurl.extension ?
					[{
							name: this.getFileType(formattedurl.extension),
							extensions: [formattedurl.extension]
						},
						{
							name: 'All Files',
							extensions: ['*']
						}
					] :
					undefined
			})
			.then(({ filePath: path }) => {
				if (!path) return BdApi.showToast('Maybe next time.')
				this.saveFile(path, undefined, formattedurl, type, false, true)
			})
	}

	render = () =>
		<MenuItem label="Save As..." id="save-as" action={this.action}/>
}
