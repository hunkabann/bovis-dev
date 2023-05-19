// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApiBovis: 'https://bovis-api-dev-up.azurewebsites.net/',
  redirectUri: 'http://localhost:4200/',
  clientID: 'ffd10c5b-0d31-4024-bc9c-4d9681b0b82e',
  urlAuthority: 'https://login.microsoftonline.com/02d0add9-98d8-4c97-9bf8-06ab1f88344a'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
