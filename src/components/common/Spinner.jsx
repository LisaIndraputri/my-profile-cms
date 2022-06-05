import React from 'react'
import RingLoader from "react-spinners/RingLoader";
import '../../styles/Spinner.scss'
// import PropTypes from 'prop-types'

function Spinner(props) {
  return (
    <div className='spinner-wrapper'>
      <RingLoader color={"#CF7B7B"} size={150} />
    </div>
  )
}

Spinner.propTypes = {}

export default Spinner
