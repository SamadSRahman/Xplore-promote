export const detectDeviceDetails = () => {
    const userAgent = navigator.userAgent;
  
    // Browser and version
    const browserMatch = userAgent.match(/(Chrome|Safari|Firefox|Edge|Opera)\/([\d.]+)/);
    const browser = browserMatch ? { name: browserMatch[1], version: browserMatch[2] } : { name: "Unknown", version: "Unknown" };
  
    // OS and version
    const osMatch = userAgent.match(/\(([^)]+)\)/);
    const osString = osMatch ? osMatch[1] : "";
    const osParts = osString.split(";").map((s) => s.trim());
    const osName = osParts[0]?.includes("Windows NT") ? "Windows" :
      osParts[0]?.includes("Mac") ? "Mac OS" :
      osParts[0]?.includes("Linux") ? "Linux" :
      osParts[0]?.includes("Android") ? "Android" :
      /iPhone|iPad|iPod/.test(userAgent) ? "iOS" : "Unknown";
    const osVersion = osParts[0]?.replace(/[^0-9.]/g, "");
  
    // Device details
    const deviceModel = /iPhone|iPad|iPod/i.test(userAgent) ? "iPhone" :
      /Android/i.test(userAgent) ? "Android Device" :
      "Desktop";
  
    return {
      browser: browser.name.toLowerCase(),
      browserVersion: browser.version,
      osName,
      osVersion,
      deviceModel,
      deviceName: navigator.platform,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  };
  
//   export const detectSourceAna = () => {
//     const userAgent = navigator.userAgent || navigator.vendor || (window.opera || "");
//     if (userAgent.includes("Instagram")) return "instagram";
//     if (userAgent.includes("FBAN") || userAgent.includes("FBAV")) return "facebook";
//     if (userAgent.includes("LinkedIn")) return "linkedin";
//     if (userAgent.includes("Twitter")) return "twitter";
//     return "web";
//   };