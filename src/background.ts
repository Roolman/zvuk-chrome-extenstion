chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.action.onClicked.addListener(async () => {
  const prevState = await chrome.action.getBadgeText({});
  const nextState = prevState === "ON" ? "OFF" : "ON";

  await chrome.action.setBadgeText({ text: nextState });

  if (nextState === "ON") {
    chrome.contextMenus.create({
      id: "229",
      title: "Слушать в Звуке",
      type: "normal",
      contexts: ["selection"],
    });
    chrome.action.setIcon({ path: "icon.png" });
  } else if (nextState === "OFF") {
    chrome.contextMenus.removeAll();
    chrome.action.setIcon({ path: "icon_grayscale.png" });
  }
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  let url = new URL(`https://zvuk.com/search`);
  url.searchParams.set("query", item?.selectionText || "");
  chrome.tabs.create({ url: url.href, index: tab?.index || 0 + 1 });
});
