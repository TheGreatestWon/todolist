module.exports = function override(config, env) {
  // 웹소켓 핫 리로딩 비활성화
  if (config.devServer) {
    config.devServer.hot = false;
    config.devServer.liveReload = false;
    config.devServer.webSocketServer = false;
  }
  
  return config;
};