import { RegistryFieldFormatsProvider } from 'ui/registry/field_formats'
import { IndexPatternsFieldFormatProvider } from 'ui/index_patterns/_field_format/field_format';
import fractionUnitsTemplate from 'plugins/kibana-field-formatters/fractional-units.html';

function FractionalUnitsFieldFormatProvider(Private) {

  // This needs to use Kibana's running version of lodash, and not any local version in node_modules
  var _ = require('lodash');
  var FieldFormat = Private(IndexPatternsFieldFormatProvider);
  
  // Create a new FieldFormat type and inherit FieldFormat
  _.class(FractionalUnitsFieldFormat).inherits(FieldFormat);
  function FractionalUnitsFieldFormat(params) {
    FractionalUnitsFieldFormat.Super.call(this, params);
  }

  // The id of this field format
  FractionalUnitsFieldFormat.id = 'FractionalUnits';
  // The title of the field format, shown to the user
  FractionalUnitsFieldFormat.title = 'Fractional Units';
  // An array of types, which this field formatter can be used for.
  // You can only apply this field formatter to fields, that have one
  // of the here specified types. Possible types are:
  // number, boolean, date, ip, attachment, geo_point, geo_shape, string, murmur3
  // murmur3 (Murmur3 plugin hashes), unknown (unknown field type),
  // conflict (fields that have different types in different indices matched by the index pattern)
  FractionalUnitsFieldFormat.fieldType = [
    'number'
  ];

  FractionalUnitsFieldFormat.paramDefaults = {
    baseunit: 's',
    method: 'digits-optional',
    digits: 3,
    dp: 3
  };

  FractionalUnitsFieldFormat.baseunitOpts = [
    { id: false, name: 'Unspecified Units' },
    { id: 's', name: 'Second' },
    { id: 'g', name: 'Gram' },
    { id: 'm', name: 'Meter'},
    { id: 'c', name: 'Cake' },
  ];

  FractionalUnitsFieldFormat.methodOpts = [
    { id: 'digits-fixed',     name: 'Number of digits (fixed)' },
    { id: 'digits-optional',  name: 'Number of digits (optional)' },
    { id: 'decimal-fixed',    name: 'Decimal points (fixed)' },
    { id: 'decimal-optional', name: 'Decimal points (optional)' },
  ];

  FractionalUnitsFieldFormat.digitsOpts = [
    { id: 1, name: '1 digit' },
    { id: 2, name: '2 digits'},
    { id: 3, name: '3 digits'},
    { id: 4, name: '4 digits'},
    { id: 5, name: '5 digits'},
    { id: 6, name: '6 digits'},
  ];

  FractionalUnitsFieldFormat.dpOpts = [
    { id: 0, name: '0 dp' },
    { id: 1, name: '1 dp'},
    { id: 2, name: '2 dp'},
    { id: 3, name: '3 dp'},
  ];

  FractionalUnitsFieldFormat.editor = fractionUnitsTemplate;
  FractionalUnitsFieldFormat.sampleInputs = [
    1010,7.9,0.025,0.0009991,0.0000000333333333,0.000000000069
  ];

  const SCALE = { '12':'T', '9':'G', '6':'M', '3':'K', '0':'', '-3':'m', '-6':'µ', '-9':'n', '-12':'p' };

  /*
    Will be used to render the field with this formatter.
    If you specify a function, the return value will be rendered (without interpreting HTML in it).
    If you specify an object, you can have a key html and a key text with a function as
    a value. The text function works as if you would have specified only a function. The return value
    of the function you applied to the html key, will be interpreted as HTML (as seen below).
    
    The first argument to the function will be the value that should be rendered.
    The second argument will be the field, that should be rendered.
      The object contains information like the type (`field.type`), that you might want to use
      if you want to render differently depending on the field's type.
      This can also be undefined, e.g. when formatting the field in a visualization due to the aggregation
      this information is lost.
  */
  
  FractionalUnitsFieldFormat.prototype._convert = function(value) {

    switch (this.param('baseunit')) {
    case 's':
    case 'g':
    case 'm':
      var baseunit = this.param('baseunit');
      break;
    case 'c':
      var baseunit = '🎂'
      break;
    default:
      var baseunit = '';
      break;
    }

    // I realise this is computationally complex, but it's accurate!
    // Could be faster by counting characters before/after the decimal point.
    var magnitude = Math.log(value) / Math.LN10;
    var nearest_scale = Math.floor(magnitude / 3) * 3;

    if (nearest_scale in SCALE) {
      var scaled_value = value / Math.pow(10,nearest_scale);
      switch (this.param('method')) {
      case 'digits-fixed':
        // Difficult to avoid scientific notation without huge libraries
        var rounded_value = scaled_value.toPrecision(this.param('digits'));
        break;
      case 'digits-optional':
        var rounded_value = Number(scaled_value.toPrecision(this.param('digits')));
        break;
      case 'decimal-fixed':
        // Difficult to avoid scientific notation without huge libraries
        var rounded_value = scaled_value.toFixed(this.param('dp'));
        break;
      case 'decimal-optional':
        var rounded_value = Number(scaled_value.toFixed(this.param('dp')));
        break;
      }
      return '' + rounded_value + ' ' + SCALE[nearest_scale] + baseunit;
    }

    // It's something else, or just too big/small to worry about
    return value;

  };

  return FractionalUnitsFieldFormat;
}

// Register the provider to the field_formats registry
RegistryFieldFormatsProvider.register(FractionalUnitsFieldFormatProvider);