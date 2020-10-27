import { TrustStore } from "runtime-imports/utils"

export function isTrustedDomain(url) {
	for (const domain of isTrustedDomain.domains)
		if (url.search(domain) !== -1) return true
	return TrustStore.isTrustedDomain(url)
}

isTrustedDomain.domains = [
	/\/\/steamuserimages-\w\.akamaihd\.net\//, /\/\/steamcdn-\w\.akamaihd\.net\//,
	/\/\/steamcommunity-\w\.akamaihd\.net\//, '//cdn.discordapp.com/', '//media.discordapp.net/',
	/\/\/images-ext-\d\.discordapp\.net\//, '//i.ytimg.com/', /\/\/static\d\.e621\.net\//,
	/\/\/static\d\.e926\.net\//, '//pbs.twimg.com/', '//preview.redd.it/', '//cdn.shopify.com/',
	'//discordapp.com/', '//i.imgur.com/', '//i.clouds.tf/', '//image.prntscr.com/', '//i.giphy.com/',
	'//media.tenor.co/'
]
