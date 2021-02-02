# Dispatcher-3pl-dashboard 


## Quick Start


#### Clone the repo

```shell 
git clone https://app4.labaiik.com/labaiik/core/dispatcher-3pl-dashboard.git
cd dispatcher-3pl-dashboard
```

#### Install npm packages
```shell 
npm install
```


## Framework Description

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Configuration
#### Development
change configuration in `dispatcher-3pl-dashboard/src/environments/environment.ts`
```shell
export const environment = {

  apiUrl:'http://app5.labaiik.com/api',
  mqtturl:'ws://app5.labaiik.com:8088/mqtt',
  mqttUserName:'labaiik',
  mqttPassword:'admin123',
  production: false
}
```

#### Staging
change configuration in `dispatcher-3pl-dashboard/src/environments/environment.staging.ts`
```shell
export const environment = {

  apiUrl:'http://app5.labaiik.com/api',
  mqtturl:'ws://app5.labaiik.com:8088/mqtt',
  mqttUserName:'labaiik',
  mqttPassword:'admin123',
  staging: true,
  production: false
}
```

#### Production
change configuration in `dispatcher-3pl-dashboard/src/environments/environment.prod.ts`
```shell
export const environment = {

  apiUrl:'http://app5.labaiik.com/api',
  mqtturl:'ws://app5.labaiik.com:8088/mqtt',
  mqttUserName:'labaiik',
  mqttPassword:'admin123',
  production: true
}
```
## Development/Local server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/3pl-dashboard` directory. Use below command for different environment.

#### Development
```shell
ng build
```

#### Staging
```shell
ng build --configuration=staging
```

#### Production
```shell
ng build --prod
```