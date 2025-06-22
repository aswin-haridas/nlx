# nlx

An Electron application with React

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

nlx/
├── src/
│   ├── main/          # Electron main process
│   ├── preload/       # Electron preload scripts
│   └── renderer/      # React frontend
│       └── src/
│           ├── pages/     # Application pages
│           ├── components/ # Reusable components
│           ├── core/       # State management
│           ├── hooks/      # Custom React hooks
│           └── services/   # API services