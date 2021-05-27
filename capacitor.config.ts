import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ivano.iorio',
  appName: 'condominium',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.8.103:3000",
    "cleartext": true,
  }
  
};

export default config;
