import { FaultyVarsChecker, ZeresLibrary } from "./../dependency-related"
import { Electron } from "./libs"

const {	Utilities, WebpackModules } = ZeresLibrary

export const getEmojiURL = Utilities.getNestedProp(WebpackModules.getByProps('getEmojiURL'), 'getEmojiURL')
export const dialog = Utilities.getNestedProp(Electron, 'remote.dialog')
export const Messages = Utilities.getNestedProp(WebpackModules.getByProps('Messages'), 'Messages')
export const AvatarModule = WebpackModules.getByProps('getChannelIconURL')
export const TrustStore = WebpackModules.getByProps('isTrustedDomain')
export const MessageCreator = WebpackModules.find(m => m.default && m.getMessage)
export const ModalStack = WebpackModules.getByProps('openModal', 'hasModalOpen')

export const openPath = Utilities.getNestedProp(Electron, 'shell.openPath')
				|| Utilities.getNestedProp(Electron, 'shell.openItem')

export const showAlertModal = Utilities.getNestedProp(
	WebpackModules.find(m => m.show && m.show.toString().search(/\w\.minorText,\w=\w\.onConfirmSecondary/)),
	'show'
)

FaultyVarsChecker.checkVars({
	getEmojiURL,
	dialog,
	Messages,
	AvatarModule,
	TrustStore,
	MessageCreator,
	openPath,
	showAlertModal
})
