# Virtex App

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

The Virtex App is a desktop application used for updating, viewing the camera stream of, and configuring Virtex. The app is not necessary to set configurations as everything is available over the I2C interface. However, if you are unsure how certain configurations change what the camera sees this is a helpful tool.

Virtex App is written in Typescript runs on Angular with Electron in the background (credit to [maximegris/angular-electron](https://github.com/maximegris/angular-electron)). It uses [Open OCD](https://openocd.org/) to flash and update to FPGA over FT2232H's JTAG interface and FT2232H's Fast Serial Inteface to stream the video and change configurations.

## How To Use
We recommend downloading the [app installer](https://34engineering.com/store/34V0) directly from our website. Otherwise see directions below.

## Serving
```
npm i
npm runs serve
```

## Building
Build executables
```
npm run build
```
Build locally
```
npm run buildlocal
```

## Linting
```
npm run lint
```
or
```
npm run fix
```
