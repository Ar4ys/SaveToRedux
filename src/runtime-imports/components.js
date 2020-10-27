import { FaultyVarsChecker, ZeresLibrary } from "./../dependency-related"

const { WebpackModules } = ZeresLibrary
const getByDisplayName = WebpackModules.getByDisplayName.bind(WebpackModules)

export const Markdown = getByDisplayName('Markdown')
export const TextComponent = getByDisplayName('Text')
export const FormItem = getByDisplayName('FormItem')
export const TextInput = getByDisplayName('TextInput')
export const ConfirmModal = getByDisplayName('ConfirmModal')

FaultyVarsChecker.checkVars({
	Markdown,
	TextComponent,
	FormItem,
	TextInput,
	ConfirmModal,
})
