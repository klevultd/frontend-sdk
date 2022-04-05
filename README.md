![Klevu](images/klevu_header.jpg?raw=true "Klevu")

# Klevu headless monorepository

Here are the links to different projects.

- [@klevu/core](packages/klevu-core/README.md) package that can be used to build modern frontends with Klevu search.
- [React example](examples/react/) React, React Router, Material UI example.
- [Vue example](examples/vue/) Vue 3 example.

# Internal development

All projects in this repository can be build and run using VSCode.

Node.js and npm is required to be installed on your system before starting. This should be done once before starting development.

In the root of this repository run npm to install all packages

> npm install

Run build once to make sure everything is good to go.

> npm run build

## VSCode run development environment

You can run full environment inside VScode. Run default build task `ctrl+shift+b` in windows and `shift+command+b` in mac. This watched builds on all projects and runs react example project.

## VSCode extensions

It is recommened to have `ESLint` and `Prettier` extensions installed in order to produce clean code.
