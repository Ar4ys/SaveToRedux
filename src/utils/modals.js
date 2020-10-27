import { ConfirmModal } from "./../components"
import { Libs, Components, Utils } from "./../runtime-imports"

const {	React } = Libs
const { Markdown } = Components
const { ModalStack } = Utils

export class Modals {
	static ModalStack = ModalStack;

	static showModal(title, content, options) {
		return ModalStack.openModal(props => (
				<ConfirmModal 
					title={title}
					cancelText='Cancel'
					{...props}
					{...options}
				> 
					{content}
				</ConfirmModal>
			)
		)
	}

	static showConfirmationModal(title, content, options) {
		return this.showModal(
			title,
			<Markdown>{content}</Markdown>, 
			options
		)
	}
}
