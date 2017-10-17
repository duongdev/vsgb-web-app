import React from 'react';
import PropTypes from 'prop-types';
import withWidth from 'material-ui/utils/withWidth';
import withStyles from 'material-ui/styles/withStyles';
import compose from 'recompose/compose';

const Container = ({ width, styles, ...props }) => {
  let widthPx = '100%';

  // switch (width) {
  //   case 'xs': { widthPx = '100%'; break; }
  //   case 'sm': { widthPx = '100%'; break; }
  //   case 'md': { widthPx = 960; break; }
  //   case 'lg': { widthPx = 1280; break; }
  //   default: { widthPx = 1900; break; }
  // }

  return (
    <div
      style={{
        width: widthPx,
        marginLeft: 'auto',
        marginRight: 'auto',
        ...(styles || {})
      }}
      {...props}
    />
  )
}

Container.propTypes = {
  width: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
Container.defaultProps = {};

const styles = {};

export default compose(withStyles(styles), withWidth())(Container);
