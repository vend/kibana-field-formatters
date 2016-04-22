function DictionaryLookupProvider(Private) {

  // This needs to use Kibana's running version of lodash, and not any local version in node_modules
  var _ = require('lodash');
  var FieldFormat = Private(require('ui/index_patterns/_field_format/FieldFormat'));
  const DICTIONARY_PROTOCOLS = {
    "0": "HOPOPT",
    "1": "ICMP",
    "2": "IGMP",
    "3": "GGP",
    "4": "IPv4",
    "5": "ST",
    "6": "TCP",
    "7": "CBT",
    "8": "EGP",
    "9": "IGP",
    "10": "BBN-RCC-MON",
    "11": "NVP-II",
    "12": "PUP",
    "13": "ARGUS (deprecated)",
    "14": "EMCON",
    "15": "XNET",
    "16": "CHAOS",
    "17": "UDP",
    "18": "MUX",
    "19": "DCN-MEAS",
    "20": "HMP",
    "21": "PRM",
    "22": "XNS-IDP",
    "23": "TRUNK-1",
    "24": "TRUNK-2",
    "25": "LEAF-1",
    "26": "LEAF-2",
    "27": "RDP",
    "28": "IRTP",
    "29": "ISO-TP4",
    "30": "NETBLT",
    "31": "MFE-NSP",
    "32": "MERIT-INP",
    "33": "DCCP",
    "34": "3PC",
    "35": "IDPR",
    "36": "XTP",
    "37": "DDP",
    "38": "IDPR-CMTP",
    "39": "TP++",
    "40": "IL",
    "41": "IPv6",
    "42": "SDRP",
    "43": "IPv6-Route",
    "44": "IPv6-Frag",
    "45": "IDRP",
    "46": "RSVP",
    "47": "GRE",
    "48": "DSR",
    "49": "BNA",
    "50": "ESP",
    "51": "AH",
    "52": "I-NLSP",
    "53": "SWIPE (deprecated) ",
    "54": "NARP",
    "55": "MOBILE",
    "56": "TLSP",
    "57": "SKIP",
    "58": "IPv6-ICMP",
    "59": "IPv6-NoNxt",
    "60": "IPv6-Opts",
    "62": "CFTP",
    "64": "SAT-EXPAK",
    "65": "KRYPTOLAN",
    "66": "RVD",
    "67": "IPPC",
    "69": "SAT-MON",
    "70": "VISA",
    "71": "IPCV",
    "72": "CPNX",
    "73": "CPHB",
    "74": "WSN",
    "75": "PVP",
    "76": "BR-SAT-MON",
    "77": "SUN-ND",
    "78": "WB-MON",
    "79": "WB-EXPAK",
    "80": "ISO-IP",
    "81": "VMTP",
    "82": "SECURE-VMTP",
    "83": "VINES",
    "84": "TTP",
    "84": "IPTM",
    "85": "NSFNET-IGP",
    "86": "DGP",
    "87": "TCF",
    "88": "EIGRP",
    "89": "OSPFIGP",
    "90": "Sprite-RPC",
    "91": "LARP",
    "92": "MTP",
    "93": "AX.25",
    "94": "IPIP",
    "95": "MICP (deprecated)",
    "96": "SCC-SP",
    "97": "ETHERIP",
    "98": "ENCAP",
    "100": "GMTP",
    "101": "IFMP",
    "102": "PNNI",
    "103": "PIM",
    "104": "ARIS",
    "105": "SCPS",
    "106": "QNX",
    "107": "A/N",
    "108": "IPComp",
    "109": "SNP",
    "110": "Compaq-Peer",
    "111": "IPX-in-IP",
    "112": "VRRP",
    "113": "PGM",
    "115": "L2TP",
    "116": "DDX",
    "117": "IATP",
    "118": "STP",
    "119": "SRP",
    "120": "UTI",
    "121": "SMP",
    "122": "SM (deprecated)",
    "123": "PTP",
    "124": "ISIS over IPv4",
    "125": "FIRE",
    "126": "CRTP",
    "127": "CRUDP",
    "128": "SSCOPMCE",
    "129": "IPLT",
    "130": "SPS",
    "131": "PIPE",
    "132": "SCTP",
    "133": "FC",
    "134": "RSVP-E2E-IGNORE",
    "135": "Mobility Header",
    "136": "UDPLite",
    "137": "MPLS-in-IP",
    "138": "manet",
    "139": "HIP",
    "140": "Shim6",
    "141": "WESP",
    "142": "ROHC",
    "255": "Reserved",
  };
  
  // Create a new FieldFormat type and inherit FieldFormat
  _.class(DictionaryLookup).inherits(FieldFormat);
  function DictionaryLookup(params) {
    DictionaryLookup.Super.call(this, params);
  }

  // The id of this field format
  DictionaryLookup.id = 'DictionaryLookup';
  // The title of the field format, shown to the user
  DictionaryLookup.title = 'Dictionary Lookup';
  // An array of types, which this field formatter can be used for.
  // You can only apply this field formatter to fields, that have one
  // of the here specified types. Possible types are:
  // number, boolean, date, ip, attachment, geo_point, geo_shape, string, murmur3
  // murmur3 (Murmur3 plugin hashes), unknown (unknown field type),
  // conflict (fields that have different types in different indices matched by the index pattern)
  DictionaryLookup.fieldType = [
    'number'
  ];

  DictionaryLookup.editor = require('plugins/kibana-field-formatters/dictionary-lookup.html');
  DictionaryLookup.sampleInputs = [
    1,4,6
  ];

  DictionaryLookup.paramDefaults = {
    dictionary: 1
  };

  DictionaryLookup.dictionaryOpts = [
    { id: 0, name: 'None' },
    { id: 1, name: 'Networking IP Protocol Names' }
  ];

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
  DictionaryLookup.prototype._convert = function(value) {

    // Select Dictionary to use
    switch (this.param('dictionary')) {
    case 1:
      var dictionary = DICTIONARY_PROTOCOLS;
      break;
    default:
      var dictionary = {};
      break;
    }

    // Lookup
    if (value in dictionary) {
      return dictionary[value];
    } else {
      return value
    }

  };

  return DictionaryLookup;
}

// Register the provider to the field_formats registry
require('ui/registry/field_formats').register(DictionaryLookupProvider);