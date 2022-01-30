let counter = 0

const pxToNum = str => {
	let result = str.substring(0, str.length - 2)
	return +result
}

const rotate = counter => {
	let v_title = document.getElementById('player-container-inner')
	let v_play = document.getElementById('player-container')
	let v_ctn = document.getElementById('movie_player')
	let v_elem = document.getElementsByClassName('html5-main-video')[0]
	let v_height = document.documentElement.clientHeight - 100
	let v_width = Math.floor(v_height * pxToNum(v_elem.getAttribute('ytheight')) / pxToNum(v_elem.getAttribute('ytwidth')))

	switch(counter % 4) {
		case 0:
			v_title.style.height = '100%'
			v_play.style.height = '100%'
			v_ctn.style.height = '100%'
			v_ctn.style.position = 'relative'
			v_elem.style.transform = 'rotate(0deg)'
			v_elem.style.width = v_elem.getAttribute('ytwidth')
			v_elem.style.height = v_elem.getAttribute('ytheight')
			v_elem.style.top = 0
			break
		case 1:
			v_title.style.height = Math.abs(v_height - pxToNum(v_elem.getAttribute('ytheight'))) + 'px'
			v_play.style.height = v_height + 'px'
			v_ctn.style.height = v_height + 'px'
			v_ctn.style.position = 'inherit'
			v_elem.style.transform = 'rotate(90deg)'
			v_elem.style.width = v_height + 'px'
			v_elem.style.height = v_width + 'px'
			v_elem.style.top = Math.floor((v_height - v_width) / 2) + 'px'
			break
		case 2:
			v_title.style.height = '100%'
			v_play.style.height = '100%'
			v_ctn.style.height = '100%'
			v_ctn.style.position = 'relative'
			v_elem.style.transform = 'rotate(180deg)'
			v_elem.style.width = v_elem.getAttribute('ytwidth')
			v_elem.style.height = v_elem.getAttribute('ytheight')
			v_elem.style.top = 0
			break
		case 3:
			v_title.style.height = Math.abs(v_height - pxToNum(v_elem.getAttribute('ytheight'))) + 'px'
			v_play.style.height = v_height + 'px'
			v_ctn.style.height = v_height + 'px'
			v_ctn.style.position = 'inherit'
			v_elem.style.transform = 'rotate(270deg)'
			v_elem.style.height = v_width + 'px'
			v_elem.style.width = v_height + 'px'
			v_elem.style.top = Math.floor((v_height - v_width) / 2) + 'px'
			break
		default:
			v_title.style.height = '100%'
			v_play.style.height = '100%'
			v_ctn.style.height = '100%'
			v_ctn.style.position = 'relative'
			v_elem.style.width = v_elem.getAttribute('ytwidth')
			v_elem.style.height = v_elem.getAttribute('ytheight')
			v_elem.style.top = 0
			v_elem.style.transform = 'rotate(0deg)'
			break
	}
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.cmd === 'YouTate') { rotate(++counter) }
})

let resetTimer = null
let resizeTimer = null
window.onresize = () => {
	if (resetTimer === null) {
		rotate(0)
	}
	clearTimeout(resetTimer)
	resetTimer = setTimeout(() => { clearTimeout(resetTimer) }, 1000)

	clearTimeout(resizeTimer)
	resizeTimer = setTimeout(() => {
		let target = document.getElementsByClassName('html5-main-video')[0]
		target.setAttribute('ytwidth', Math.max(pxToNum(target.style.width), pxToNum(target.style.height)))
		target.setAttribute('ytheight', Math.min(pxToNum(target.style.width), pxToNum(target.style.height)))
		rotate(counter)
		clearTimeout(resizeTimer)
	}, 1000)
}

document.addEventListener('DOMContentLoaded', () => {
	console.log('YouTate inited')
	let target = document.getElementsByClassName('html5-main-video')[0]
	target.setAttribute('ytwidth', target.style.width)
	target.setAttribute('ytheight', target.style.height)
})
