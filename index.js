module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'kibana-field-formatters',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      // fieldFormat is not working as of Kibana 4.3.0, but it's fixed in the master branch
      // see the issue on GitHub: https://github.com/elastic/kibana/issues/6040
      // As a workaround, just add the field formats to visTypes array.
      visTypes: [
        'plugins/kibana-field-formatters/dictionary-lookup',
        'plugins/kibana-field-formatters/fractional-units'
      ]
    }
  });
};
