import Web3 from "web3";

import Play from "../abis/Play.json";

export const WEB3_LOADED = "WEB3_LOADED";
export const WEB3_ACCOUNT_LOADED = "WEB3_ACCOUNT_LOADED";
export const TOKEN_LOADED = "TOKEN_LOADED";
export const PLAY_LOADED = "PLAY_LOADED";
export const GET_NAME = "GET_NAME";
export const SET_NAME = "SET_NAME";
export const CHANGE_TEST = "CHANGE_TEST";
export const LOAD_ALL_DATA = "LOAD_ALL_DATA";
export const TRANSFER_LOADING = "TRANSFER_LOADING";
export const TRANSFER_LOADED = "TRANSFER_LOADED";

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
    const name = await getState().play.play.methods.name().call();
    dispatch({
      type: GET_NAME,
      name,
    });
  };
};

export const setName = (name) => {
  return async (dispatch, getState) => {
    try {
      const { account } = getState().web3;
      const { play } = getState().play;
      play.methods
        .setName(name)
        .send({
          from: account,
        })
        .on("transactionHash", (hash) => {
          dispatch({
            type: SET_NAME,
            name,
          });
        })
        .on("error", (error) => {
          console.error(error);
          window.alert("There was an error setting Name");
        });
    } catch (error) {
      window.alert("Failed to Set Name");
    }
  };
};

export const loadAllData = () => {
  return async (dispatch, getState) => {
    const { play } = getState().play;
    const transferStream = await play.getPastEvents("Transfer", {
      fromBlock: 0,
      toBlock: "latest",
    });
    const allTransferred = transferStream.map((event) => event.returnValues);
    dispatch({
      type: LOAD_ALL_DATA,
      allTransferred,
    });
  };
};

export const subscribeToEvents = () => {
  return async (dispatch, getState) => {
    const { play } = getState().play;
    play.events.Transfer({}, (error, event) => {
      dispatch({
        type: TRANSFER_LOADED,
        payload: event.returnValues,
      });
    });
  };
};

export const transfer = (amount) => {
  return async (dispatch, getState) => {
    const { account } = getState().web3;
    const { play } = getState().play;
    await play.methods
      .transfer(amount)
      .send({
        from: account,
      })
      .on("transactionHash", () => {
        dispatch({
          type: TRANSFER_LOADING,
        });
      })
      .on("error", (error) => {
        console.error(error);
        window.alert("There was an error Transferring");
      });
  };
};

export const getTitle = () => {
  return async (dispatch, getState) => {
    const title = await getState().play.play.methods.title().call();
    console.log(title);
  };
};

export const testDemo = () => {
  return async (dispatch, getState) => {
    console.log(dispatch, getState());
  };
};

export const changeTest = () => {
  return {
    type: CHANGE_TEST,
    name: "ali",
  };
};
