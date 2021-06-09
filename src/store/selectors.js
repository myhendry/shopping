import { get } from "lodash";
import { createSelector } from "reselect";

//* Setup and Load All Contracts
const web3 = (state) => get(state, "web3.connection");
export const web3LoadedSelector = createSelector(web3, (w) => w);

const account = (state) => get(state, "web3.account");
export const accountSelector = createSelector(account, (a) => a);

const play = (state) => get(state, "play.play");
export const playSelector = createSelector(play, (p) => p);

const playLoaded = (state) => get(state, "play.loaded");
export const playLoadedSelector = createSelector(playLoaded, (p) => p);

//* All contracts loaded
export const contractsLoadedSelector = createSelector(playLoaded, (c) => c);

//* All Transfers
const allTransfersLoaded = (state) => get(state, "play.allTransferred.loaded");
export const allTransfersLoadedSelector = createSelector(
  allTransfersLoaded,
  (loaded) => loaded
);

const allTransfers = (state) => get(state, "play.allTransferred.data");
export const allTransfersSelector = createSelector(allTransfers, (a) => a);

//* Other Selectors
const name = (state) => get(state, "play.name", "");
export const nameSelector = createSelector(name, (n) => n);

const test = (state) => get(state, "web3.test.nicknames");
export const testSelector = createSelector(test, (a) => a);
