# Meta Safe Snap
![](https://img.shields.io/badge/yarn-%3E%3D1.17.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D12.x-orange.svg?style=flat-square)

Snap to enable MetaMask users to create recovery and inheritance plans for their accounts.


### MetaMask Flask
Snaps is pre-release software available in MetaMask Flask, a canary distribution for developers that provides access to upcoming features. To try Snaps, either [install MetaMask Flask](https://metamask.io/flask/) or build it locally.

#### Build MetaMask Flask locally
- checkout to [this branch](https://github.com/MetaMask/metamask-extension/tree/snaps-stable-nov-21) (Chrome recommended)
- build MetaMask using `yarn start --build-type flask` or `yarn dist`
- go to [chrome://extensions/](chrome://extensions/)
- enable "Developer mode"
- click "Load unpacked" and point to chrome directory

### Live demo dapp
Test SafeMeta inside [our demo dapp](http://metasafe.safient.io/).

### Running our demo dapp locally
```shell
corepack enable && yarn install && yarn run demo
```

## License
This project is dual-licensed under Apache 2.0 and MIT terms:
- Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)
