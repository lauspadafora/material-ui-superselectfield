import React, { cloneElement } from 'react';

import FloatingLabel from './FloatingLabel';
import UnderLine from './UnderLine';
import { arrowDownIconTypes, selectionsPresenterTypes } from './types';
import { arrowDownIconDefaultProps, selectionsPresenterDefaultProps } from './defaultProps';

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
  column: { display: 'flex', flexDirection: 'column', flex: 'auto' },
  error: { marginTop: 5, color: 'red', fontSize: 12 },
  row: {
    alignItems: 'center',
    display: 'flex',
    flex: 'auto',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  selections: { flex: 1 },
};

const rotatingIconStyle = function rotatingIconStyle (isOpen) {
  return {
    // fill: this.context.muiTheme.textField.borderColor,
    transform: 'rotate(' + (isOpen ? 180 : 0) + 'deg)',
  };
};

const ArrowDownIcon = function ArrowDownIcon (_ref) {
  const style = _ref.style;
  const customIcon = _ref.customIcon;
  return cloneElement(customIcon, { style: style });
};
ArrowDownIcon.propTypes = arrowDownIconTypes;
ArrowDownIcon.defaultProps = arrowDownIconDefaultProps;

const isValidObject = function isValidObject (obj) {
  return (
    obj &&
    Object.prototype.toString.call(obj) === '[object Object]' &&
    Object.keys(obj).includes('value') &&
    obj.value !== null
  );
};

SelectionsPresenter.propTypes = process.env.NODE_ENV !== 'production' ? selectionsPresenterTypes : {};
SelectionsPresenter.defaultProps = selectionsPresenterDefaultProps;

export default function SelectionsPresenter (_ref2) {
  const disabled = _ref2.disabled;
  const dropDownIcon = _ref2.dropDownIcon;
  const errorStyle = _ref2.errorStyle;
  const errorText = _ref2.errorText;
  const floatingLabel = _ref2.floatingLabel;
  const floatingLabelFocusStyle = _ref2.floatingLabelFocusStyle;
  const floatingLabelStyle = _ref2.floatingLabelStyle;
  const hintText = _ref2.hintText;
  const isFocused = _ref2.isFocused;
  const isOpen = _ref2.isOpen;
  const muiTheme = _ref2.muiTheme;
  const selectedValues = _ref2.selectedValues;
  const selectionsRenderer = _ref2.selectionsRenderer;
  const underlineErrorStyle = _ref2.underlineErrorStyle;
  const underlineFocusStyle = _ref2.underlineFocusStyle;
  const underlineStyle = _ref2.underlineStyle;
  const _muiTheme$textField = muiTheme.textField;
  const borderColor = _muiTheme$textField.borderColor;
  const floatingLabelColor = _muiTheme$textField.floatingLabelColor;
  const focusColor = _muiTheme$textField.focusColor;

  // Conditions for shrinking the floating Label

  const isShrunk =
    !!(hintText && hintText.length) ||
    (Array.isArray(selectedValues) && (!!selectedValues.length || isFocused)) ||
    (!Array.isArray(selectedValues) && (isValidObject(selectedValues) || (selectedValues === null && isFocused))) ||
    isOpen;

  const Error = function Error () {
    return React.createElement('div', { style: _extends({}, styles.error, errorStyle) }, errorText);
  };

  return React.createElement(
    'div',
    { style: styles.column },
    React.createElement(
      'div',
      { style: styles.row },
      React.createElement(
        'div',
        { style: styles.selections },
        floatingLabel &&
          React.createElement(
            FloatingLabel,
            {
              defaultColors: { floatingLabelColor: floatingLabelColor, focusColor: focusColor },
              disabled: disabled,
              floatingLabelFocusStyle: floatingLabelFocusStyle,
              floatingLabelStyle: floatingLabelStyle,
              isFocused: isFocused,
              shrink: isShrunk,
            },
            floatingLabel
          ),
        (!floatingLabel || isShrunk) && selectionsRenderer(selectedValues, hintText)
      ),
      React.createElement(ArrowDownIcon, { customIcon: dropDownIcon, style: rotatingIconStyle(isOpen) })
    ),
    React.createElement(UnderLine, {
      disabled: disabled,
      errorText: errorText,
      isFocused: isFocused,
      isOpen: isOpen,
      themeBorderColor: borderColor,
      themeFocusColor: focusColor,
      underlineErrorStyle: underlineErrorStyle,
      underlineFocusStyle: underlineFocusStyle,
      underlineStyle: underlineStyle,
    }),
    errorText && React.createElement(Error, null)
  );
}
