import { FormDevTool } from './form-devtool';

(function(chrome) {
  const title = 'Form Inspector';

  // sidebar - http://developer.chrome.com/extensions/devtools_panels.html#type-ExtensionSidebarPane
  // thanks to https://github.com/timstuyckens/chromeextensions-knockoutjs for the $0 trick

  chrome.devtools.panels.elements.createSidebarPane(title, sidebar => {
    const tool = new FormDevTool(sidebar);

    //attach to chrome events so that the sidebarPane refreshes (contains up to date info)
    chrome.devtools.panels.elements.onSelectionChanged.addListener(
      this.updateElementProperties
    );
    sidebar.onShown.addListener(this.updateElementProperties);

    //listen to a message send by the background page (when the chrome windows's focus changes)
    chrome.extension['onMessage'].addListener(
      (request, sender, sendResponse) => {
        this.updateElementProperties();
      }
    );
  });
})(chrome);
