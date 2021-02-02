// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  
  apiUrl:'http://app5.labaiik.com/labaiik/v1',
  mqtturl:'ws://app5.labaiik.com:8088/mqtt',
  mqttUserName:'labaiik',
  mqttPassword:'admin123',
  // 'http://5d35151f3932.ngrok.io',
  // 'http://app5.labaiik.com/api',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
