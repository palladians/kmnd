# kmnd

![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)
![CI Status](https://github.com/palladians/kmnd/actions/workflows/ci.yml/badge.svg)
[![Twitter](https://img.shields.io/twitter/url/https/twitter.com/palladians_xyz.svg?style=social&label=Follow%20%40Palladians)](https://twitter.com/palladians_xyz)

Your terminal's missing command palette.

*Why?*

- You won't have to look for you app's scripts in `package.json` again. Just hit `kmnd` and select the command to run.
- You forgot to install commitzen for conventional commits again? Don't worry, we got you covered with `Git -> Commit`.
- You won't have to search for the commands to create Next, Remix, Vite, and CRA apps again. Want more boilerplates? Let us know.

## Features

- [x] Read closest `package.json` for its `scripts`.
- [x] Read annotations for `scripts`.
- [x] Filter commands with text input.
- [x] Conventional commit command.
- [x] Create app from boilerplates (Next.js, Remix, Vite).
- [ ] Tools for other ecosystems than TypeScript.
- [ ] Persistent settings with `~/.kmnd`.
- [ ] Custom commands and local automation with `~/.kmnd`.
- [ ] Interface for community extensions.

## Usage

In this section we've covered how to install and use `kmnd`. You can either run it once with `npx` to check if it suits you, or install globally if you want to stay with it.

### Test without installing globally

```sh
$ npx kmnd@latest
```

### Install

```sh
npm i -g kmnd@latest
```

### Run

```sh
kmnd
```

Btw, you can add alias to your `.zshrc` or `.bashrc` to make it even shorter. Here you go: `alias k="kmnd"`

## Development

### Prerequisite

- NVM
- PNPM

### Prepare

```sh
$ nvm use
$ pnpm i
```

### Build

```sh
$ pnpm build
```

### Run unit tests

```sh
$ pnpm test:unit
```

## Contributors

<a href="https://github.com/palladians/kmnd/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=palladians/kmnd" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## Maintained by

- [Tomek Marciniak](https://github.com/mrcnk) @ [Palladians](https://github.com/palladians)

## Acknowledgements

- Shout out to [Vadim Demedes](https://github.com/vadimdemedes) for creating `ink` and `ink-ui`.
