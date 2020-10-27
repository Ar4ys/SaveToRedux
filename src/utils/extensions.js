export const isImage = e => /\.{0,1}(png|jpe?g|webp|gif|svg)$/i.test(e)
export const isVideo = e => /\.{0,1}(mp4|webm|mov)$/i.test(e)
export const isAudio = e => /\.{0,1}(mp3|ogg|wav|flac|m4a)$/i.test(e)
export const useIdealExtensions = url => (
	url.indexOf('/a_') !== -1 
		? url.replace('.webp', '.gif').replace('.png', '.gif') 
		: url.replace('.webp', '.png')
)
