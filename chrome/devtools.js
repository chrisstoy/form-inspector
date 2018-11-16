// TODO -figure out how to load the script from a file so we can get syntax
// highlighting and such.

// const script = require('form-utils.js');

(function(chrome) {
  const title = 'Form Inspector';

  // sidebar - http://developer.chrome.com/extensions/devtools_panels.html#type-ExtensionSidebarPane
  // thanks to https://github.com/timstuyckens/chromeextensions-knockoutjs for the $0 trick

  chrome.devtools.panels.elements.createSidebarPane(title, sidebar => {
    const updateElementProperties = () => {
      const exp = `x = () => { 
		let formData = {};

		const debugElement = ng.probe($0);
		if ( debugElement ) {
			const component = debugElement.componentInstance;
			if ( component && component.form ) {
				formData = component.form.getRawValue();
			}
		}
		return formData;		
	  }; x();`;

      sidebar.setExpression(exp, 'Form');
    };

    //attach to chrome events so that the sidebarPane refreshes (contains up to date info)
    chrome.devtools.panels.elements.onSelectionChanged.addListener(value => {
      console.log('selection changed: ' + value);
      updateElementProperties();
    });

    sidebar.onShown.addListener(() => {
      console.log('onShown called');
      updateElementProperties();
    });

    //listen to a message send by the background page (when the chrome windows's focus changes)
    chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
      console.log('got message');
      updateElementProperties();
    });
  });
})(chrome);
