## DWITTER: Decentralized Twitter

Check out the deployed version of this app at https://dwtr.wajeshubham.in

> Transactions on Ethereum are slow. Therefore, whenever you sign up or post/like dweets, it might take some time to complete the transaction. So please be patient.

## Usage

All the data is stored on the Ethereum blockchain, which means that signing up and posting dweets costs a small amount of ether _(on Ropsten network)_. This is probably not something that people would be willing to pay for in the near future, but serves as a PoC (Proof of concept).

## Add ether to your wallet

You can add ether in your wallet fro free. To add ether to your wallet on the Robsten network, you can use the following link:

https://faucet.egorfine.com/

## DWITTER FRONTEND

- Language: [TypeScript](https://www.typescriptlang.org/)
- Styling: [TailwindCSS](https://tailwindcss.com/)
- Framework: [NextJs](https://nextjs.org/)
- File storage: [IPFS](https://ipfs.io/)
- Web3 tools: [ethers](https://www.npmjs.com/package/ethers), [Ethereum](https://ethereum.org/en/)

### Setup

---

First, make sure that you have [Node](https://nodejs.org/en/) installed on your computer.

install all the required packages:

```bash
npm install
```

start the server:

```bash
npm run dev
```

## DWITTER SMART CONTRACT

- Language: [Solidity (v^0.8.0)](https://docs.soliditylang.org/en/v0.8.13/)
- Dev environment: [Hardhat](https://hardhat.org/getting-started/)
- Deployed on: [Alchemy (Ropsten)](https://alchemy.com/)

### Setup

---

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
