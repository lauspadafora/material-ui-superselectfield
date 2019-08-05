import React from 'react';

import { underLineTypes } from './types';

const _extends =
  Object.assign ||
  function (target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

const styles = {
  hr: {
    borderBottom: '1px solid',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    bottom: 0,
    boxSizing: 'content-box',
    left: 0,
    margin: 0,
    position: 'absolute',
    width: '100%',
  },
  underline: { position: 'relative', marginTop: 4 },
};

UnderLine.propTypes = process.env.NODE_ENV !== 'production' ? underLineTypes : {};

export default function UnderLine (_ref) {
  const disabled = _ref.disabled;
  const errorText = _ref.errorText;
  const isFocused = _ref.isFocused;
  const isOpen = _ref.isOpen;
  const themeBorderColor = _ref.themeBorderColor;
  const themeFocusColor = _ref.themeFocusColor;
  const underlineErrorStyle = _ref.underlineErrorStyle;
  const underlineFocusStyle = _ref.underlineFocusStyle;
  const underlineStyle = _ref.underlineStyle;

  const baseHRstyle = _extends(
    {},
    styles.hr,
    {
      borderColor: themeBorderColor,
    },
    underlineStyle,
    errorText ? _extends({ borderColor: 'red' }, underlineErrorStyle) : {}
  );

  const focusedHRstyle = errorText
    ? underlineStyle
    : _extends(
      {
        borderBottom: '2px solid',
        borderColor: (isFocused && !disabled) || isOpen ? themeFocusColor : themeBorderColor,
        transform: 'scaleX( ' + ((isFocused && !disabled) || isOpen ? 1 : 0) + ' )',
        transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)',
      },
      underlineFocusStyle
    );

  return React.createElement(
    'div',
    { style: styles.underline },
    React.createElement('hr', { style: baseHRstyle }),
    React.createElement('hr', { style: _extends({}, baseHRstyle, focusedHRstyle) })
  );
}
