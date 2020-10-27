import { React } from "../../runtime-imports/libs"

export class InstallAddOn extends React.Component {
	constructor(props) {
		super(props)
		if (props.type === "Plugin") {
			this.label = "Plugin"
			this.id = "plugin"
			this.store = "Plugins"
		} else if (props.type === "Theme") {
			this.label = "Theme"
			this.id = "theme"
			this.store = "Themes"
	}

	render = () => this.label ?
		<MenuItem
			label={`Install ${this.label}`}
			id={`install-${this.id}`}
			action={() => this.saveFile(BdApi[this.store].folder + `/${formattedurl.fileName}`, undefined, formattedurl, type, false, true)}
			tooltip= "No overwrite warning"
		/> : null
}
