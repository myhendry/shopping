import React, { useEffect} from 'react'
import {connect} from 'react-redux'

import {testDemo} from '../store/actions'

const Demo = ({ testDemo }) => {
  useEffect(() => {
    testDemo()
  }, [testDemo])

  return (
    <div>
      <h1>Demo</h1>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, { testDemo})(Demo)
