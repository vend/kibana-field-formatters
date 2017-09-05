# Kibana Field Formatter Plugin Examples

2 for the price of 1.

## 1. Dictionary Lookup

Converts an integer to a descption based on a dictionary lookup.

Includes a single dictionary:
- IP Protocol numbers to text-description. Useful for Flow Logs

Example: `6` => `TCP`

## 2. Nicely Formatted Floats

Converts an ugly number EG `0.0059` into `5.9 ms` showing units and a reasonable level of precesion. Useful for big dashboards, where you need a simple-looking number with appropriate units.

Includes the following:
- SI Units (seconds, grams, meters & cake)
- Fractional prefixes
  - mili, micro, nano, pico
- Multiplier prefixes
  - kilo, mega, giga, tera
- Ability to control the precision required:
  - Significant digitis (fixed and optional)
  - Decimal Places (fixed and optional)

Bugs:
- Some combination of settings will show javascript scientific notation `1e+3 µs` due to `Math.toFixed` & `Math.toPrecision` being uncontrollable. I didn't want to rely upon heafty 3rd-party libraries.

## Requirements

Tested on Kibana 5.5.2

## How to install

Simple clone:
- Simply clone the repo into `installedPlugins`, and restart Kibana. No NPM requirements.

or via the Kibana CLI:
- `./kibana plugin --install kibana-field-formatters -u https://github.com/vend/kibana-field-formatters/archive/master.zip`

## Useful Info

Tim Roes blog gives a great introduction to the evolving Kibana plugin system https://www.timroes.de/2015/12/02/writing-kibana-4-plugins-basics/
