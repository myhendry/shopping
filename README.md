## Blockchain Developer Bootcamp Dapp University

- [ ] Solidity
- [ ] Test Events
- [x] Call
- [x] Send

---

Node 10.19.0

truffle init
truffle migrate
truffle migrate --reset
truffle exec scripts/seed-exchange.js

Change Solidity Compiler Version:
Right click on pragma solidity -> Choose Solidity: Change Workspace Compiler version (remote)

truffle console
DappToken.deployed().then(t => { token = t })
token.address
token.name()
token.symbol()
token.decimals()
token.decimals().then(v => { console.log(v.toNumber())})

---

##### References

[Reselect]
(https://github.com/reduxjs/reselect)

[TailwindCSS]
(https://tailwindcss.com/docs/guides/create-react-app)
(https://www.smashingmagazine.com/2020/02/tailwindcss-react-project/)
