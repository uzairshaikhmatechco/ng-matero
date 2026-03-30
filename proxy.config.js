// https://angular.io/guide/build#proxying-to-a-backend-server

// const PROXY_CONFIG = {
//   '/users/**': {
//     target: 'https://api.github.com',
//     changeOrigin: true,
//     secure: false,
//     logLevel: 'debug',
//     // onProxyReq: (proxyReq, req, res) => {
//     //   const cookieMap = {
//     //     SID: '',
//     //   };
//     //   let cookie = '';
//     //   for (const key of Object.keys(cookieMap)) {
//     //     cookie += `${key}=${cookieMap[key]}; `;
//     //   }
//     //   proxyReq.setHeader('cookie', cookie);
//     // },
//   },
// };

// module.exports = PROXY_CONFIG;


// proxy.config.js
const PROXY_CONFIG = {
  "/api/*": {
    target: "https://localhost:7136",
    secure: false,        // Accept self-signed dev certificates
    changeOrigin: true,
    logLevel: "debug"
  }
};

module.exports = PROXY_CONFIG;
