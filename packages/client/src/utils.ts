export function getBrowserData() {
  const ua = navigator.userAgent;
  let name: string;

  if (ua.search(/Edge/) !== -1) {
    name = 'edge';
  } else if (ua.search(/MSIE/) !== -1) {
    name = 'ie';
  } else if (ua.search(/Trident/) !== -1) {
    name = 'ie11';
  } else if (ua.search(/Firefox/) !== -1) {
    name = 'firefox';
  } else if (ua.search(/Opera/) !== -1) {
    name = 'opera';
  } else if (ua.search(/OPR/) !== -1) {
    name = 'operaWebkit';
  } else if (ua.search(/YaBrowser/) !== -1) {
    name = 'yabrowser';
  } else if (ua.search(/Chrome/) !== -1) {
    name = 'chrome';
  } else if (ua.search(/Safari/) !== -1) {
    name = 'safari';
  } else if (ua.search(/Maxthon/) !== -1) {
    name = 'maxthon';
  } else {
    name = 'unknown';
  }

  let version: string;

  switch (name) {
    case 'edge':
      version = ua.split('Edge')[1].split('/')[1];
      break;
    case 'ie':
      version = ua.split('MSIE ')[1].split(';')[0];
      break;
    case 'ie11':
      name = 'ie';
      version = ua.split('; rv:')[1].split(')')[0];
      break;
    case 'firefox':
      version = ua.split('Firefox/')[1];
      break;
    case 'opera':
      version = ua.split('Version/')[1];
      break;
    case 'operaWebkit':
      name = 'opera';
      version = ua.split('OPR/')[1];
      break;
    case 'yabrowser':
      version = ua.split('YaBrowser/')[1].split(' ')[0];
      break;
    case 'chrome':
      version = ua.split('Chrome/')[1].split(' ')[0];
      break;
    case 'safari':
      version = ua.split('Version/')[1].split(' ')[0];
      break;
    case 'maxthon':
      version = ua.split('Maxthon/')[1];
      break;
    default:
      version = 'unknown';
  }

  let platform: string;

  if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua.toLowerCase())) {
    platform = 'mobile';
  } else {
    platform = 'desktop';
  }

  return {
    platform,
    browser: name,
    versionFull: version,
    versionShort: (version !== 'unknown')
      ? version.split('.')[0]
      : 'unknown',
  };
}
