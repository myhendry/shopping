import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  loadWeb3,
  loadAccount,
  loadPlay,
  changeTest,
} from "../store/actions";
import { accountSelector, testSelector, contractsLoadedSelector } from "../store/selectors";
import Demo from './Demo'

const App = ({
  account,
  loadWeb3,
  loadAccount,
  loadPlay,
  changeTest,
  test1,
  test2,
  contractsLoaded
}) => {
  useEffect(() => {
    const loadBlockchain = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const web3 = await loadWeb3(window.ethereum);
          const networkId = await web3.eth.net.getId();
          await loadAccount(web3);
          const play = await loadPlay(web3, networkId);
          if (!play) {
            window.alert(
              "No play smart contract detected on current network. Please select another network with Metamask"
            );
            return;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };
    loadBlockchain();
  }, []);

  return (
    <div>
      {
        contractsLoaded ? (
          <div>
            <h5>{account}</h5>
            <Demo/>
            <h6>{test2.name}</h6>
            <button onClick={changeTest}>Change</button>
          </div> 
        ) : <h1>Loading ...</h1>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: accountSelector(state),
    contractsLoaded: contractsLoadedSelector(state),
    test2: state.web3.test,
    test1: testSelector(state),
  };
};

export default connect(mapStateToProps, {
  loadWeb3,
  loadAccount,
  loadPlay,
  changeTest,
})(App);
