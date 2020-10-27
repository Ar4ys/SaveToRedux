import { Libs } from "./../../runtime-imports"
import { Preview } from "./preview"
const { SettingField } = Libs.ZeresLibrary.Settings

export class PreviewField extends SettingField {
	constructor(name, note, data, onChange) {
		super(name, note, onChange, Preview, data)
	}
}
