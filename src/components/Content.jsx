import React, { useEffect } from "react";
import { connect } from "react-redux";

import { changeTest, loadAllData, subscribeToEvents } from "../store/actions";
import { accountSelector, testSelector } from "../store/selectors";
import Demo from "./Demo";

const Content = ({
  account,
  test1,
  test2,
  changeTest,
  loadAllData,
  subscribeToEvents,
}) => {
  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    await loadAllData();
    await subscribeToEvents();
  };

  return (
    <div>
      <Demo />
      <h5>{account}</h5>
      <h6>{test2.name}</h6>
      <button onClick={changeTest}>Change</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    test2: state.web3.test,
    test1: testSelector(state),
    account: accountSelector(state),
  };
};

export default connect(mapStateToProps, {
  changeTest,
  loadAllData,
  subscribeToEvents,
})(Content);
