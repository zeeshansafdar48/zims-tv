// @ts-nocheck
if (typeof window.PalmSystem !== 'undefined') {
  if (!window.webOS) {
    window.webOS = {
      platform: {
        tv: true,
        version: window.PalmSystem.deviceInfo?.platformVersion || '1.0.0',
      },
    };
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (cb) => {
      return setTimeout(cb, 16);
    };
    window.cancelAnimationFrame = (id) => {
      clearInterval(id);
    };
  }
}
