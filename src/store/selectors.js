import { get } from "lodash";
import { createSelector } from "reselect";

const web3 = state => get(state, "web3.connection")
export const web3LoadedSelector = createSelector(web3, w => w)

const account = (state) => get(state, "web3.account");
export const accountSelector = createSelector(account, (a) => a);

const play = state => get(state, "play.play")
export const playSelector = createSelector(play, p => p)

const playLoaded = (state) => get(state, "play.loaded")
export const playLoadedSelector = createSelector(playLoaded, p => p)

//* All contracts loaded
export const contractsLoadedSelector = createSelector(
  playLoaded,
  c => c
)

const name = (state) => get(state, "play.name", "")
export const nameSelector = createSelector(name, n => n)

const test = (state) => get(state, "web3.test.nicknames");
export const testSelector = createSelector(test, (a) => a);


