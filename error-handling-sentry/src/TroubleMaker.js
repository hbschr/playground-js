import React from 'react';
import PropTypes from 'prop-types';

TroubleMaker.propTypes = {
  probability: PropTypes.number,
  suffix: PropTypes.string,
}

TroubleMaker.defaultProps = {
  probability: 0,
  suffix: '',
}

export default function TroubleMaker(props) {

  if (Math.random() < props.probability) {
    throw new Error(['trouble', props.suffix].join(' '))
  }

  return (
    <div style={{border: 'solid 1px blue'}}>
      Here be content.
    </div>
  );
}
