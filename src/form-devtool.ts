export class FormDevTool {
  private sidebar;

  constructor(sidebar) {
    this.sidebar = sidebar;
    this.updateElementProperties();
  }

  public updateElementProperties() {
    this.sidebar.setExpression(`(${'test'})`);
  }

  // The function is executed in the context of the inspected page.
  /*
  private getRappidInfo(shouldSerialize) {
    'use strict';

    var node, nodeSelf, error;

    try {
      node = $0;
    } catch (e) {
      error = e;
    }

    if (!node || error) {
      return {
        error: 'Element unknown.'
      };
    }

    if (!window['rAppid']) {
      return {
        error: 'No rAppid.js found'
      };
    }

    if (node.inspect) {
      nodeSelf = node.inspect();
    } else {
      return {
        error:
          "Element cannot be inspected. Have you set 'enableInspection: true' in your config?"
      };
    }

    if (!nodeSelf) {
      return {
        error: 'Inspection cannot be performed'
      };
    }

    return {
      $: (function($) {
        var ret = {};

        for (var key in $) {
          if ($.hasOwnProperty(key)) {
            ret[key] = $[key];
          }
        }

        return ret;
      })(nodeSelf.$),

      bindings: (function(bindingAttributes) {
        var ret = {};

        for (var key in bindingAttributes) {
          if (bindingAttributes.hasOwnProperty(key)) {
            ret[key] = bindingAttributes[key].value;
          }
        }

        return ret;
      })(nodeSelf.$bindingAttributes)
    };

    function debug() {
      console.log.apply(console, Array.prototype.slice.call(arguments));
    }
  }
  */
}
