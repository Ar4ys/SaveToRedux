import { Libs } from "./../../runtime-imports"
import { TextComponent } from "./../discord-imports"

const {
	DiscordModules: { Dispatcher }
} = Libs.ZeresLibrary
const { React } = Libs

export class Preview extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			date: new Date(),
			rand: props.rand
		}
		this.handleSettingsUpdate = this.handleSettingsUpdate.bind(this)
	}

	componentDidMount() {
		Dispatcher.subscribe('ST_SETTINGS_UPDATE', this.handleSettingsUpdate)
	}

	componentWillUnmount() {
		Dispatcher.unsubscribe('ST_SETTINGS_UPDATE', this.handleSettingsUpdate)
	}

	handleSettingsUpdate(e) {
		if (typeof e.rand !== 'undefined') {
			this.setState({
				rand: e.rand
			})
		} else 
			this.forceUpdate()
	}

	render() {
		return (
			<TextComponent>
				{this.props.formatFilename('unknown', this.state.date, this.state.rand) + '.png'}
			</TextComponent>
		)
	}
}
