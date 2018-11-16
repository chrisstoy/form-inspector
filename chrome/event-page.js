(function(chrome) {

  class EventPage {
    constructor(sidebar) {
      this.sidebar = sidebar;

      //attach to chrome events so that the sidebarPane refreshes (contains up to date info)
      chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
        console.log('onSelectionChanged called');
        this.updateElementProperties();
      });

      sidebar.onShown.addListener(() => {
        console.log('onShown called');
        this.updateElementProperties();
      });

      //listen to a message send by the background page (when the chrome windows's focus changes)
      chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
        console.log('onMessage called');
        this.updateElementProperties();
      });
    }

    // Update the sidebar with selected Form
    updateElementProperties() {
      const exp = `x = () => { 
        let formData = {};

        const debugElement = ng.probe($0);
        if ( debugElement ) {
          const component = debugElement.componentInstance;
          if ( component ) {
            form = component.form || component.formGroup;
            if ( form ) {
              formData = form.getRawValue();
            }
          }
        }
        return formData;		
        }; x();`;

      this.sidebar.setExpression(exp, 'Form');
    };

  }


  const title = 'Form Inspector';

  // sidebar - http://developer.chrome.com/extensions/devtools_panels.html#type-ExtensionSidebarPane
  // thanks to https://github.com/timstuyckens/chromeextensions-knockoutjs for the $0 trick

  chrome.devtools.panels.elements.createSidebarPane(title, sidebar => {
    // create the EventPage when sidebar is created
    const eventPage = new EventPage(sidebar);
  });
})(chrome);
