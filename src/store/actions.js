import Web3 from "web3";

import Play from "../abis/Play.json";

export const WEB3_LOADED = "WEB3_LOADED";
export const WEB3_ACCOUNT_LOADED = "WEB3_ACCOUNT_LOADED";
export const TOKEN_LOADED = "TOKEN_LOADED";
export const PLAY_LOADED = "PLAY_LOADED";
export const GET_NAME = "GET_NAME"
export const CHANGE_TEST = "CHANGE_TEST";

export const loadWeb3 = (eth) => {
  const web3 = new Web3(eth);
  return async (dispatch) => {
    dispatch({
      type: WEB3_LOADED,
      connection: web3,
    });
    return web3;
  };
};

export const loadAccount = (web3) => {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    dispatch({
      type: WEB3_ACCOUNT_LOADED,
      account,
    });
  };
};

export const loadPlay = (web3, networkId) => {
  return async (dispatch) => {
    try {
      const play = new web3.eth.Contract(
        Play.abi,
        Play.networks[networkId].address
      );
      dispatch({
        type: PLAY_LOADED,
        play,
      });
      return play;
    } catch (error) {
      console.log("Play Contract Not Deployed");
      return null;
    }
  };
};

export const getName = () => { 
  return async (dispatch, getState) => {
    const name = await getState().web3.play.methods.name().call()
    dispatch({
      type: GET_NAME,
      name
    })
  }
}

export const testDemo = () => {
  return async (dispatch, getState) => {
    console.log(dispatch, getState())
  } 
}

export const changeTest = () => {
  return {
    type: CHANGE_TEST,
    name: "ali",
  };
};


