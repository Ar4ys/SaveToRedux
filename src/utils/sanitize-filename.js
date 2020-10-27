/*
 * I DO NOT OWN THESE TWO
 */
export function sanitizeFileName(r, e) {
	// https://github.com/parshap/node-sanitize-filename
	function n(r, n) {
		function o(r, e, n) {
			// https://github.com/parshap/truncate-utf8-bytes
			function t(r) {
				return r >= 55296 && 56319 >= r
			}

			function u(r) {
				return r >= 56320 && 57343 >= r
			}
			if ('string' != typeof e) throw new Error('Input must be string')
			for (var i, f, c = e.length, o = 0, l = 0; c > l; l += 1) {
				if (((i = e.charCodeAt(l)), (f = e[l]), t(i) && u(e.charCodeAt(l + 1)) && ((l += 1), (f += e[l])), (o += r(f)), o === n)) return e.slice(0, l + 1)
				if (o > n) return e.slice(0, l - f.length + 1)
			}
			return e
		}
		if ('string' != typeof r) throw new Error('Input must be string')
		var l = Buffer.byteLength.bind(Buffer),
			a = o.bind(null, l),
			p = r.replace(t, n).replace(u, n).replace(i, n).replace(f, n).replace(c, n)
		return a(p, e.extLength)
	}
	var t = /[\/\?<>\\:\*\|"]/g,
		u = /[\x00-\x1f\x80-\x9f]/g,
		i = /^\.+$/,
		f = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i,
		c = /[\. ]+$/,
		o = (e && e.replacement) || '',
		l = n(r, o)
	return '' === o ? l : n(l, '')
}
