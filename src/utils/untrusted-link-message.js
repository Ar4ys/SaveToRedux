import { Libs, Utils } from "./../runtime-imports"

const {	Logger } = Libs.ZeresLibrary
const { MessageCreator } = Utils

export const untrustedLinkMessage = (() => {
	try {
		return MessageCreator.getMessage("If you see this, SaveToRedux has failed to get a safe proxied version of the image URL **!!{url}!!**. If you do not recognize the domain, it's best you don't download from it as it could potentially be an IP logger.\n\nAre you sure you want to download an image from this domain?", 'en-US')
	} catch (e) {
		Logger.stacktrace('Failed to create message', e)
		return null
	}
})()
