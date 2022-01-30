browser.runtime.onInstalled.addListener(() => {
	browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
		browser.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new browser.declarativeContent.PageStateMatcher({
						pageUrl: {
							urlContains: 'youtube.com/watch'
						}
					})
				],
				actions: [new browser.declarativeContent.ShowPageAction()]
			}
		])
	})
})

browser.contextMenus.create({
	id                  : 'YouTate',
	title               : 'YouTate',
	documentUrlPatterns : ["https://*.youtube.com/watch*"]
})

browser.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === 'YouTate') {
		browser.tabs.query({ active: true, currentWindow: true }, tabs => {
			browser.tabs.sendMessage(tabs[0].id, { cmd: 'YouTate' })
		})
	}
})

browser.pageAction.onClicked.addListener(() => {
	browser.tabs.query({ active: true, currentWindow: true }, tabs => {
		browser.tabs.sendMessage(tabs[0].id, { cmd: 'YouTate' })
	})
})
