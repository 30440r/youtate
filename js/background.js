chrome.runtime.onInstalled.addListener(() => {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: {
							urlContains: 'youtube.com/watch'
						}
					})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		])
	})
})

chrome.contextMenus.create({
	id                  : 'YouTate',
	title               : 'YouTate',
	documentUrlPatterns : ["https://*.youtube.com/watch*"]
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === 'YouTate') {
		chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
			chrome.tabs.sendMessage(tabs[0].id, { cmd: 'YouTate' })
		})
	}
})

chrome.pageAction.onClicked.addListener(() => {
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		chrome.tabs.sendMessage(tabs[0].id, { cmd: 'YouTate' })
	})
})
