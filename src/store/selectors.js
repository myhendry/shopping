import { get } from "lodash";
import { createSelector } from "reselect";

const account = (state) => get(state, "web3.account");
export const accountSelector = createSelector(account, (a) => a);

const web3 = state => get(state, "web3.connection")
export const web3LoadedSelector = createSelector(web3, w => w)

const play = state => get(state, "web3.play")
export const playSelector = createSelector(play, p => p)

const playLoaded = (state) => get(state, "web3.play", false)
export const playLoadedSelector = createSelector(playLoaded, p => p)

export const contractsLoadedSelector = createSelector(
  playLoaded,
  c => c
)

const test = (state) => get(state, "web3.test.nicknames");
export const testSelector = createSelector(test, (a) => a);

const name = (state) => get(state, "web3.name", "")
export const nameSelector = createSelector(name, n => n)
