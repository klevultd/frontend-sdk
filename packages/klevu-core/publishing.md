# Instructions to publish @klevu/core

## prep

Install globally `np` package

```
> npm install -g np
```

Login and authenticate your npm

```
> npm login
```

## 1) Build a core

In `klevu-core` folder run following command to build a version

```
> npm run build
```

## 2) Run np

```
> np
```

This will run tests and publish automatically to NPM and open a link to GitHub to write release notes.

## 3) Write release notes

Title of the release is version number. Write what have changed. Np will automatically create list of commits to release notes.

## 4) Create commit from version change

```
> git add -A .
> git commit -m "bump version"
> git push
```

You might need to create new branch with git if you don't have permission and create pull request to GitHub

## 5) 🍾

Done
