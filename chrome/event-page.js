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
      const exp = `
      function getControlState(control, controlName = null, recursive = false) {
        const result = {
          name: controlName,
          status: control.status,
          valid: control.valid,
          pending: control.pending,
          enabled: control.enabled,
          errors: control.errors,
          dirty: control.dirty,
          touched: control.touched,
          value: control.value,
        };
      
        if (recursive) {
          const controls = control.controls;
          if ( controls ) {
            result.children = {};
            for ( let entry of Object.entries(controls)) {
              result.children[entry[0]] = this.getControlState(entry[1], entry[0], recursive);
            }
          }
        }
        return result;
      }
      
      function getFormGroupFromComponent(component) {
        if ( component ) {
          for ( let entry of Object.entries(component)) {
            const value = entry[1];     
            if ( typeof value === 'object' ) {
              // probe a few properties to see if it is a Form Control
              if ( value.hasOwnProperty('status') && value.hasOwnProperty('_onCollectionChange')) {
                return entry;
              }
            }
          }
        }
        return null;
      }
      
      function getSelectedFormData() {
        let formData = { empty: 'No Form Selected' };
      
        const debugElement = ng.probe($0);
        if (debugElement) {
          const component = debugElement.componentInstance;
          const form = getFormGroupFromComponent(component);
          if (form) {
            formData = getControlState(form[1], form[0], true );
          }
        }
        return formData;
      }
      
      getSelectedFormData();        
      `;

      this.sidebar.setExpression(exp, 'Form Data');
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
