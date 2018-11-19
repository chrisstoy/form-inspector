(function(chrome) {
  class EventPage {
    constructor(sidebar) {
      this.sidebar = sidebar;

      //attach to chrome events so that the sidebarPane refreshes (contains up to date info)
      chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
        console.log('onSelectionChanged called');
        if (this.port) {
          this.port.postMessage({ type: 'update-form' });
        }
      });

      // TEST seding a message to content script
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: 'hello' }, function(
          response
        ) {
          console.log(response.farewell);
        });
      });
      chrome.runtime.onMessage.addListener(function(
        request,
        sender,
        sendResponse
      ) {
        console.log(
          sender.tab
            ? 'from a content script:' + sender.tab.url
            : 'from the extension'
        );
        if (request.greeting == 'hello') sendResponse({ farewell: 'goodbye' });
      });
    }

    // Update the sidebar with selected Form
    updateElementProperties(formData) {
      this.sidebar.setExpression(formData, 'Form Data');
    }
  }

  ///////////
  // bootstrap the Sidebar creation

  const title = 'Form Inspector';
  let eventPage;

  // sidebar - http://developer.chrome.com/extensions/devtools_panels.html#type-ExtensionSidebarPane
  // thanks to https://github.com/timstuyckens/chromeextensions-knockoutjs for the $0 trick

  chrome.devtools.panels.elements.createSidebarPane(title, sidebar => {
    // create the EventPage when sidebar is created
    eventPage = new EventPage(sidebar);
  });
  console.log('Event Page Initialized');
})(chrome);
