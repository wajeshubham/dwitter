## DWITTER

---

Decentralized Twitter.

Check out the deployed version of this app at https://dwtr.wajeshubham.in

## Add ether to your wallet

To add ether to your wallet on the Robsten network, you can use the following link:

https://faucet.egorfine.com/

## Usage

All the data is stored on the Ethereum blockchain, which means that signing up and posting dweets costs a small amount of ether _(on Ropsten network)_. This is probably not something that people would be willing to pay for in the near future, but serves as a PoC (Proof of concept).

## DWITTER FRONTEND

---

- Tools: [NextJs](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [TypeScript](https://www.typescriptlang.org/),
  [IPFS](https://ipfs.io/), [ethers](https://www.npmjs.com/package/ethers), [Ethereum](https://ethereum.org/en/)

### Setup

First, make sure that you have (Node)[https://nodejs.org/en/] installed on your computer.
install all the required packages:

```bash
npm install
```

start the server:

```bash
npm run dev
```

## DWITTER SMART CONTRACT

---

- Language: [Solidity (v^0.8.0)](https://docs.soliditylang.org/en/v0.8.13/)
- Dev environment: [Hardhat](https://hardhat.org/getting-started/)
- Deployed on: [Alchemy (Ropsten)](https://alchemy.com/)

## Setup

Create `.env` file with the following content in root folder:

```
PRIVATE_KEY=<PRIVATE_KEY_OF_ETHEREUM_ACCOUNT>
```

### Compilation

```shell
npm start
```

### Test

```shell
npm test
```

### Start local node

```shell
npm run node
```

### Deploy locally

```shell
npm run deploy-dev
```

### Deploy in production

```shell
npm run deploy-prod
```
