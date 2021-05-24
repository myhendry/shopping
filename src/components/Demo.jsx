import React, { useEffect} from 'react'
import {connect} from 'react-redux'

import {getName} from '../store/actions'
import {nameSelector} from '../store/selectors'

const Demo = ({ getName, name }) => {
  useEffect(() => {
    getName()
  }, [getName])

  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    name: nameSelector(state)
    
  }
}

export default connect(mapStateToProps, { getName})(Demo)
