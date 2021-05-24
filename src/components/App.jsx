import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  loadWeb3,
  loadAccount,
  loadPlay,
} from "../store/actions";
import {contractsLoadedSelector} from '../store/selectors'
import Content from './Content'

const App = ({
  loadWeb3,
  loadAccount,
  loadPlay,
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
          <Content />
        ) : <h1>Loading ...</h1>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    contractsLoaded: contractsLoadedSelector(state),
  };
};

export default connect(mapStateToProps, {
  loadWeb3,
  loadAccount,
  loadPlay,
})(App);
