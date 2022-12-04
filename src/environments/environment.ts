// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // api: 'https://jsonplaceholder.typicode.com',
  // api: 'https://masalabazaar.azurewebsites.net',
  // api: 'https://mbpos-api.eurofoods-bd.com',
  api: 'http://localhost:3000',
  ENCRYPT_SECRET: 'f0a38d2ef813a209',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
