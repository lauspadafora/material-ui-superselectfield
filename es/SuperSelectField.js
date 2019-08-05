/**
 * Created by Raphaël Morineau on 28 Oct 2016.
 */
import React, { Component } from 'react';
import { object } from 'prop-types';
import InfiniteScroller from 'react-infinite';
import ListItem from 'material-ui/List/ListItem';
import Popover from 'material-ui/Popover/Popover';
import TextField from 'material-ui/TextField/TextField';

import SelectionsPresenter from './SelectionsPresenter';
import { getChildrenLength, areEqual } from './utils';
import { selectFieldTypes } from './types';
import { selectFieldDefaultProps } from './defaultProps';

const _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function (obj) {
      return typeof obj;
    }
    : function (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };

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

let _class, _temp, _initialiseProps;

function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
  });
  if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass); }
}

const SelectField =
  ((_temp = _class = (function (_Component) {
    _inherits(SelectField, _Component);

    function SelectField (props, context) {
      _classCallCheck(this, SelectField);

      const _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

      _initialiseProps.call(_this);

      const children = props.children;
      const value = props.value;
      const multiple = props.multiple;
      const showAutocompleteThreshold = props.showAutocompleteThreshold;

      const itemsLength = getChildrenLength(children);
      _this.state = {
        isOpen: false,
        isFocused: false,
        initialValue: value || (multiple ? [] : null),
        itemsLength: itemsLength,
        isAutocompleteShown: _this.showAutocomplete(showAutocompleteThreshold, itemsLength),
        selectedItems: value || (multiple ? [] : null),
        searchText: '',
      };
      _this.menuItems = [];
      return _this;
    }

    // eslint-disable-next-line camelcase
    SelectField.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
      if (!areEqual(nextProps.value, this.state.selectedItems)) {
        this.setState({ selectedItems: nextProps.value });
      }
      if (!areEqual(nextProps.children, this.props.children)) {
        const itemsLength = getChildrenLength(nextProps.children);
        this.setState({
          itemsLength: itemsLength,
          isAutocompleteShown: this.showAutocomplete(this.props.showAutocompleteThreshold, itemsLength),
        });
      }
    };

    SelectField.prototype.showAutocomplete = function showAutocomplete () {
      const threshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      const itemsLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (typeof threshold === 'number') return itemsLength >= threshold;
      switch (threshold) {
        case 'always':
          return true;
        case 'never':
        default:
          return false;
      }
    };

    SelectField.prototype.componentDidMount = function componentDidMount () {
      // Potential problem with Popover ?
      // https://github.com/callemall/material-ui/blob/master/src/DropDownMenu/DropDownMenu.js#L237
      if (this.props.openImmediately) this.openMenu();
    };

    SelectField.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {};

    SelectField.prototype.openMenu = function openMenu () {
      const _this2 = this;

      if (!this.state.isOpen) this.props.onMenuOpen();
      if (this.state.itemsLength || this.props.showAutocompleteThreshold === 'always') {
        this.setState({ isOpen: true }, function () {
          return _this2.focusTextField();
        });
      }
    };

    // FIXME: both focusTextField and focusMenuItem don't really focus the targeted element, user must hit another key to trigger the actual focus... need to find a solution for a true direct focus

    SelectField.prototype.focusMenuItem = function focusMenuItem (index) {
      const targetMenuItem = this.menuItems.find(function (item) {
        return !!item && (index ? item.props.tabIndex === index : true);
      });
      if (targetMenuItem) targetMenuItem.applyFocusState('keyboard-focused');
    };

    SelectField.prototype.focusTextField = function focusTextField () {
      this.state.isAutocompleteShown && this.searchTextField ? this.searchTextField.focus() : this.focusMenuItem();
    };

    SelectField.prototype.clearTextField = function clearTextField (callback) {
      this.props.keepSearchOnSelect
        ? typeof callback === 'function' && callback() // don't reset the autocomplete
        : this.setState({ searchText: '' }, callback);
    };

    /**
     * Main Component Wrapper methods
     */
    // toggle instead of close ? (in case user changes targetOrigin/anchorOrigin)

    /**
     * TextField autocomplete methods
     */

    /**
     * Menu Header methods
     */

    /**
     * Menu methods
     */

    // group must be of type 'optgroup'

    // TODO: add Shift+Tab
    /**
     * this.menuItems can contain uncontinuous React elements, because of filtering
     */

    SelectField.prototype.render = function render () {
      const _this3 = this;

      const _props = this.props;
      const anchorOrigin = _props.anchorOrigin;
      const autocompleteFilter = _props.autocompleteFilter;
      const autocompleteStyle = _props.autocompleteStyle;
      const autocompleteUnderlineFocusStyle = _props.autocompleteUnderlineFocusStyle;
      const autocompleteUnderlineStyle = _props.autocompleteUnderlineStyle;
      const canAutoPosition = _props.canAutoPosition;
      const checkPosition = _props.checkPosition;
      const checkedIcon = _props.checkedIcon;
      const children = _props.children;
      const disabled = _props.disabled;
      const dropDownIcon = _props.dropDownIcon;
      const elementHeight = _props.elementHeight;
      const errorStyle = _props.errorStyle;
      const errorText = _props.errorText;
      const floatingLabel = _props.floatingLabel;
      const floatingLabelFocusStyle = _props.floatingLabelFocusStyle;
      const floatingLabelStyle = _props.floatingLabelStyle;
      const hintText = _props.hintText;
      const hintTextAutocomplete = _props.hintTextAutocomplete;
      const hoverColor = _props.hoverColor;
      const infiniteLoadBeginEdgeOffset = _props.infiniteLoadBeginEdgeOffset;
      const innerDivStyle = _props.innerDivStyle;
      const menuCloseButton = _props.menuCloseButton;
      const menuFooterStyle = _props.menuFooterStyle;
      const menuGroupStyle = _props.menuGroupStyle;
      const menuStyle = _props.menuStyle;
      const multiple = _props.multiple;
      const nb2show = _props.nb2show;
      const noMatchFound = _props.noMatchFound;
      const noMatchFoundStyle = _props.noMatchFoundStyle;
      const popoverClassName = _props.popoverClassName;
      const popoverWidth = _props.popoverWidth;
      const onInfiniteLoad = _props.onInfiniteLoad;
      const resetButton = _props.resetButton;
      const selectAllButton = _props.selectAllButton;
      const selectedMenuItemStyle = _props.selectedMenuItemStyle;
      const selectionsRenderer = _props.selectionsRenderer;
      const style = _props.style;
      const unCheckedIcon = _props.unCheckedIcon;
      const underlineErrorStyle = _props.underlineErrorStyle;
      const underlineFocusStyle = _props.underlineFocusStyle;
      const underlineStyle = _props.underlineStyle;
      const withResetSelectAllButtons = _props.withResetSelectAllButtons;

      // Default style depending on Material-UI context (muiTheme)

      const _context$muiTheme = this.context.muiTheme;
      const palette = _context$muiTheme.baseTheme.palette;
      const menuItem = _context$muiTheme.menuItem;

      const mergedSelectedMenuItemStyle = _extends(
        {
          color: menuItem.selectedTextColor,
        },
        selectedMenuItemStyle
      );
      if (checkedIcon) {
        checkedIcon.props.style.fill = mergedSelectedMenuItemStyle.color;
      }
      const mergedHoverColor = hoverColor || menuItem.hoverColor;

      /**
       * MenuItems building, based on user's children
       * 1st function is the base process for producing a MenuItem,
       * including filtering from the Autocomplete.
       * 2nd function is the main loop over children array,
       * accounting for optgroups.
       */
      const menuItemBuilder = function menuItemBuilder (nodes, child, index) {
        const selectedItems = _this3.state.selectedItems;
        const _child$props = child.props;
        const childValue = _child$props.value;
        const label = _child$props.label;

        if (!autocompleteFilter(_this3.state.searchText, label || childValue)) {
          return nodes;
        }
        const isSelected = Array.isArray(selectedItems)
          ? selectedItems.some(function (obj) {
            return areEqual(obj.value, childValue);
          })
          : selectedItems
            ? selectedItems.value === childValue
            : false;
        const leftCheckbox = (multiple && checkPosition === 'left' && (isSelected ? checkedIcon : unCheckedIcon)) || null;
        const rightCheckbox =
          (multiple && checkPosition === 'right' && (isSelected ? checkedIcon : unCheckedIcon)) || null;
        if (multiple && checkPosition !== '') {
          if (checkedIcon) checkedIcon.props.style.marginTop = 0;
          if (unCheckedIcon) unCheckedIcon.props.style.marginTop = 0;
        }
        return [].concat(nodes, [
          React.createElement(ListItem, {
            key: ++index,
            tabIndex: index,
            ref: function ref (_ref) {
              return (_this3.menuItems[++index] = _ref);
            },
            disableFocusRipple: true,
            hoverColor: mergedHoverColor,
            innerDivStyle: _extends(
              {
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: multiple && checkPosition === 'left' ? 56 : 16,
                paddingRight: multiple && checkPosition === 'right' ? 56 : 16,
              },
              innerDivStyle
            ),
            leftIcon: leftCheckbox,
            onClick: _this3.handleMenuSelection({ value: childValue, label: label }),
            primaryText: child,
            rightIcon: rightCheckbox,
            style: isSelected ? mergedSelectedMenuItemStyle : {},
          }),
        ]);
      };

      const fixedChildren = Array.isArray(children) ? children : [children];

      const menuItems =
        !disabled &&
        fixedChildren.length &&
        this.state.isOpen &&
        fixedChildren.reduce(function (nodes, child, index) {
          if (child.type !== 'optgroup') {
            return menuItemBuilder(nodes, child, index);
          }
          const nextIndex = nodes.length ? +nodes[nodes.length - 1].key + 1 : 0;
          const menuGroup = React.createElement(ListItem, {
            disabled: true,
            key: nextIndex,
            primaryText: child.props.label,
            style: _extends(
              {
                cursor: 'default',
                paddingTop: 10,
                paddingBottom: 10,
              },
              menuGroupStyle
            ),
          });
          let groupedItems = [];
          const cpc = child.props.children;
          if (cpc) {
            if (Array.isArray(cpc) && cpc.length) {
              groupedItems = cpc.reduce(function (nodes, child, idx) {
                return menuItemBuilder(nodes, child, nextIndex + idx);
              }, []);
            } else if ((typeof cpc === 'undefined' ? 'undefined' : _typeof(cpc)) === 'object') {
              groupedItems = menuItemBuilder(nodes, cpc, nextIndex);
            }
          }
          return groupedItems.length ? [].concat(nodes, [menuGroup], groupedItems) : nodes;
        }, []);

      const autoCompleteHeight = this.state.isAutocompleteShown ? 53 : 0;
      const headerHeight = multiple && withResetSelectAllButtons ? 36 : 0;
      const footerHeight = multiple && menuCloseButton ? 36 : 0;
      const noMatchFoundHeight = 36;
      const optionsContainerHeight =
        (Array.isArray(elementHeight)
          ? elementHeight.reduce(function (totalHeight, height) {
            return totalHeight + height;
          }, 0)
          : elementHeight * (nb2show < menuItems.length ? nb2show : menuItems.length)) || 0;
      const popoverHeight =
        autoCompleteHeight + headerHeight + (optionsContainerHeight || noMatchFoundHeight) + footerHeight + 6;

      const scrollableStyle = {
        overflowY: nb2show >= menuItems.length ? 'hidden' : 'scroll',
      };

      const baseWidth = this.root ? this.root.clientWidth : null;
      const menuWidth = Math.max(baseWidth, popoverWidth);

      return React.createElement(
        'div',
        {
          ref: function ref (_ref4) {
            return (_this3.root = _ref4);
          },
          tabIndex: disabled ? '-1' : '0',
          onBlur: this.onBlur,
          onClick: this.handleClick,
          onFocus: this.onFocus,
          onKeyDown: this.handleKeyDown,
          style: _extends(
            {
              cursor: disabled ? 'not-allowed' : 'pointer',
              color: disabled ? palette.disabledColor : palette.textColor,
              outline: 'none',
            },
            style
          ),
          title: !this.state.itemsLength ? 'Nothing to show' : '',
        },
        React.createElement(SelectionsPresenter, {
          disabled: disabled,
          dropDownIcon: dropDownIcon,
          errorStyle: errorStyle,
          errorText: errorText,
          floatingLabel: floatingLabel,
          floatingLabelFocusStyle: floatingLabelFocusStyle,
          floatingLabelStyle: floatingLabelStyle,
          hintText: hintText,
          isFocused: this.state.isFocused,
          isOpen: this.state.isOpen,
          muiTheme: this.context.muiTheme,
          selectedValues: this.state.selectedItems,
          selectionsRenderer: selectionsRenderer,
          underlineErrorStyle: underlineErrorStyle,
          underlineFocusStyle: underlineFocusStyle,
          underlineStyle: underlineStyle,
        }),
        React.createElement(
          Popover,
          {
            anchorEl: this.root,
            anchorOrigin: anchorOrigin,
            canAutoPosition: canAutoPosition,
            className: popoverClassName,
            onRequestClose: this.closeMenu,
            open: this.state.isOpen,
            style: { height: popoverHeight, width: menuWidth },
            useLayerForClickAway: false,
          },
          this.state.isAutocompleteShown &&
            React.createElement(TextField, {
              ref: function ref (_ref2) {
                return (_this3.searchTextField = _ref2);
              },
              autoFocus: true,
              hintText: hintTextAutocomplete,
              inputStyle: autocompleteStyle,
              onChange: this.handleTextFieldAutocompletionFiltering,
              onKeyDown: this.handleTextFieldKeyDown,
              style: { margin: '0 16px 5px', width: 'calc(100% - 32px)' },
              underlineFocusStyle: autocompleteUnderlineFocusStyle,
              underlineStyle: autocompleteUnderlineStyle,
              value: this.state.searchText,
            }),
          multiple &&
            withResetSelectAllButtons &&
            React.createElement(
              'header',
              { style: { display: 'flex', alignItems: 'center' } },
              React.createElement('div', { onClick: this.selectAll, style: { flex: '50%' } }, selectAllButton),
              React.createElement('div', { onClick: this.reset, style: { flex: '50%' } }, resetButton)
            ),
          React.createElement(
            'div',
            {
              ref: function ref (_ref3) {
                return (_this3.menu = _ref3);
              },
              onKeyDown: this.handleMenuKeyDown,
              style: menuStyle,
            },
            menuItems.length
              ? React.createElement(
                InfiniteScroller,
                {
                  containerHeight: optionsContainerHeight,
                  elementHeight: elementHeight,
                  styles: { scrollableStyle: scrollableStyle },
                  onInfiniteLoad: onInfiniteLoad,
                  infiniteLoadBeginEdgeOffset: infiniteLoadBeginEdgeOffset,
                },
                menuItems
              )
              : React.createElement(ListItem, {
                disabled: true,
                primaryText: noMatchFound,
                style: _extends(
                  {
                    cursor: 'default',
                    padding: '10px 16px',
                  },
                  noMatchFoundStyle
                ),
              })
          ),
          multiple &&
            React.createElement(
              'footer',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                },
              },
              React.createElement('div', { onClick: this.closeMenu, style: menuFooterStyle }, menuCloseButton)
            )
        )
      );
    };

    return SelectField;
  })(Component)),
  (_class.contextTypes = {
    muiTheme: object.isRequired,
  }),
  (_class.defaultProps = selectFieldDefaultProps),
  (_initialiseProps = function _initialiseProps () {
    const _this4 = this;

    this.onFocus = function () {
      return _this4.setState({ isFocused: true });
    };

    this.onBlur = function () {
      return !_this4.state.isOpen && _this4.setState({ isFocused: false });
    };

    this.closeMenu = function (reason) {
      const _props2 = _this4.props;
      const onChange = _props2.onChange;
      const name = _props2.name;

      if (reason) _this4.setState({ isFocused: false }); // if reason === 'clickaway' or 'offscreen'
      _this4.setState({ isOpen: false, searchText: '' }, function () {
        if (!reason) _this4.root.focus();
        onChange(_this4.state.selectedItems, name);
      });
    };

    this.handleClick = function () {
      return !_this4.props.disabled && _this4.openMenu();
    };

    this.handleKeyDown = function (event) {
      return !_this4.props.disabled && /ArrowDown|Enter/.test(event.key) && _this4.openMenu();
    };

    this.handleTextFieldAutocompletionFiltering = function (event, searchText) {
      _this4.props.onAutoCompleteTyping(searchText);
      _this4.setState({ searchText: searchText }, function () {
        return _this4.focusTextField();
      });
    };

    this.handleTextFieldKeyDown = function (_ref5) {
      const key = _ref5.key;

      switch (key) {
        case 'ArrowDown':
          _this4.focusMenuItem();
          break;

        case 'Escape':
          _this4.clearTextField();
          _this4.closeMenu();
          break;

        default:
          break;
      }
    };

    this.selectAll = function () {
      const _props3 = _this4.props;
      const children = _props3.children;
      const autocompleteFilter = _props3.autocompleteFilter;

      const fixedChildren = Array.isArray(children) ? children : [children];
      const selectedItems = fixedChildren.reduce(function (nodes, child) {
        const type = child.type;
        const _child$props2 = child.props;
        const value = _child$props2.value;
        const label = _child$props2.label;

        const passesFilter = function passesFilter (label, value) {
          return autocompleteFilter(_this4.state.searchText, label || value);
        };
        if (type !== 'optgroup' && passesFilter(label, value)) {
          return nodes.concat({ value: value, label: label });
        } else if (type === 'optgroup') {
          const groupedItems = _this4.selectAllInGroup(child);
          return groupedItems.length ? nodes.concat(groupedItems) : nodes;
        } else return nodes;
      }, []);
      _this4.setState({ selectedItems: selectedItems }, function () {
        return _this4.getSelected();
      });
    };

    this.reset = function () {
      return _this4.setState(
        function (prevState) {
          return { selectedItems: prevState.initialValue };
        },
        function () {
          return _this4.getSelected();
        }
      );
    };

    this.handleMenuSelection = function (selectedItem) {
      return function (event) {
        event.preventDefault();
        const selectedItems = _this4.state.selectedItems;

        if (_this4.props.multiple) {
          const selectedItemExists = selectedItems.some(function (obj) {
            return areEqual(obj.value, selectedItem.value);
          });
          const updatedValues = selectedItemExists
            ? selectedItems.filter(function (obj) {
              return !areEqual(obj.value, selectedItem.value);
            })
            : selectedItems.concat(selectedItem);
          _this4.setState({ selectedItems: updatedValues }, function () {
            return _this4.getSelected();
          });
          _this4.clearTextField(function () {
            return _this4.focusTextField();
          });
        } else {
          const updatedValue = areEqual(selectedItems, selectedItem) ? null : selectedItem;
          _this4.setState({ selectedItems: updatedValue }, function () {
            return _this4.closeMenu();
          });
        }
      };
    };

    this.getSelected = function () {
      return _this4.props.onSelect && _this4.props.onSelect(_this4.state.selectedItems, _this4.props.name);
    };

    this.selectAllInGroup = function (group) {
      const children = group.props.children;

      const passesFilter = function passesFilter (label, value) {
        return _this4.props.autocompleteFilter(_this4.state.searchText, label || value);
      };
      const fixedChildren = Array.isArray(children) ? children : [children];
      return fixedChildren.reduce(function (nodes, _ref6) {
        const _ref6$props = _ref6.props;
        const value = _ref6$props.value;
        const label = _ref6$props.label;

        return passesFilter(label, value) ? nodes.concat({ value: value, label: label }) : nodes;
      }, []);
    };

    this.handleMenuKeyDown = function (_ref7) {
      const key = _ref7.key;
      const tabIndex = _ref7.target.tabIndex;

      const cleanMenuItems = _this4.menuItems.filter(function (item) {
        return !!item;
      });
      const firstTabIndex = cleanMenuItems[0].props.tabIndex;
      const lastTabIndex = cleanMenuItems[cleanMenuItems.length - 1].props.tabIndex;
      const currentElementIndex = cleanMenuItems.findIndex(function (item) {
        return item.props.tabIndex === tabIndex;
      });
      switch (key) {
        case 'ArrowUp':
          if (+tabIndex === firstTabIndex) {
            _this4.state.isAutocompleteShown ? _this4.focusTextField() : _this4.focusMenuItem(lastTabIndex);
          } else {
            const previousTabIndex = cleanMenuItems.slice(0, currentElementIndex).slice(-1)[0].props.tabIndex;
            _this4.focusMenuItem(previousTabIndex);
          }
          break;

        case 'ArrowDown':
          if (+tabIndex === lastTabIndex) {
            _this4.state.isAutocompleteShown ? _this4.focusTextField() : _this4.focusMenuItem();
          } else {
            const nextTabIndex = cleanMenuItems.slice(currentElementIndex + 1)[0].props.tabIndex;
            _this4.focusMenuItem(nextTabIndex);
          }
          break;

        case 'PageUp':
          _this4.focusMenuItem();
          break;

        case 'PageDown':
          _this4.focusMenuItem(lastTabIndex);
          break;

        case 'Escape':
          _this4.closeMenu();
          break;

        default:
          break;
      }
    };
  }),
  _temp);
export { SelectField as default };
SelectField.propTypes = process.env.NODE_ENV !== 'production' ? selectFieldTypes : {};
