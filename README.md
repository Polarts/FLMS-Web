# Freelancer Mod Studio - Web

A re-implementation of [Freelancer Mod Studio](https://github.com/FreelancerOdyssey/FreelancerModStudio) using modern Web technologies.
This project aims to bring a more robust, maintainable, and functional UI to the Freelancer modding experience. The main target is a cross-platform Desktop app, but we also have a side goal to deploy a browser version so that you won't have to download anything.

## Tech Stack

- Languages: TypeScript, SCSS, Rust (tauri-related)

- ### Web Framework: React 18.1.0
    - State Management: [Mobx](https://mobx.js.org/README.html), MVVM-like
    - External Libraries:
        - [The New CSS Reset](https://elad2412.github.io/the-new-css-reset/)
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

We have plenty of issues in the [Issues page](https://github.com/FreelancerOdyssey/FLMS-Web/issues). If you'd like to be assigned, comment on an issue and request an assignment.

We use GitHub Projects to keep up with the workflow. Take a look at the [Projects page](https://github.com/orgs/FreelancerOdyssey/projects/1/views/1?layout=board) for more info on future developments.
