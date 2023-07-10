# Freelancer Mod Studio - Web

A re-implementation of [Freelancer Mod Studio](https://github.com/Lazrius/FLModStudio) using modern Web technologies.
This project aims to bring a more robust, maintainable, and functional UI to the Freelancer modding experience. The main target is a cross-platform Desktop app, but we also have a side goal to deploy a browser version so that you won't have to download anything.

## Tech Stack

- ### <u>Web Framework:</u> React 18.2.0
    - <u>Languages:</u> TypeScript, SCSS
    - <u>State Management:</u> [Mobx](https://mobx.js.org/README.html), MVVM-like
    - <u>External Libraries:</u>
        - [rc-dock](https://ticlo.github.io/rc-dock/)
        - [react-menu](https://szhsin.github.io/react-menu/)
        - [ini](https://github.com/npm/ini)
        - [react-three-fiber](https://github.com/pmndrs/react-three-fiber)

- ### Desktop Wrapper: [tauri](https://tauri.studio)

## Running Locally

To run in your browser:
- `npm start`

To run the desktop environment:
- Development: `npm start` then `npm run tauri dev`
- Production: `npm run build` then `npm run tauri build`

## Contributing Code

There's plenty of issues in the [Issues page](https://github.com/FreelancerOdyssey/FLMS-Web/issues). If you'd like to be assigned, comment on an issue and request an assignment.

Take a look at the [Project page](https://github.com/Polarts/FLMS-Web/projects/1) for more info on future developments.
