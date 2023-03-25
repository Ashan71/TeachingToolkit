const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: './src/preload.js',
      builderOptions: {
        productName: 'Teaching Toolkit',
        appId: 'com.teaching.toolkit',
        copyright: 'Ashan71',
        asar: true,
        win: {
          icon: './src/assets/app/logo.png',
          requestedExecutionLevel: 'asInvoker',
          target: [
            {
              target: 'nsis',
              arch: ['ia32'],
            },
          ],
        },
        extraResources: [
          {
            from: './public/resources/',
            to: './',
          },
          {
            from: './public/static',
            to: './static',
          },
        ],
        nsis: {
          oneClick: false,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,
          installerIcon: './src/assets/app/install.ico',
          uninstallerIcon: './src/assets/app/uninstall.ico',
          installerHeaderIcon: './src/assets/app/install.ico',
          createDesktopShortcut: true,
          createStartMenuShortcut: false,
        },
      },
    },
  },
});
