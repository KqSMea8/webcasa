import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as React from 'react';
import RcMenu, { Divider, ItemGroup } from 'rc-menu';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import animation from '../_util/openAnimation';
import warning from '../_util/warning';
import SubMenu from './SubMenu';
import Item from './MenuItem';

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.inlineOpenKeys = [];
        _this.handleTransitionEnd = function (e) {
            // when inlineCollapsed menu width animation finished
            // https://github.com/ant-design/ant-design/issues/12864
            if (e.propertyName === 'width' && e.target === e.currentTarget && _this.switchingModeFromInline) {
                _this.switchingModeFromInline = false;
                _this.setState({});
            }
        };
        _this.handleClick = function (e) {
            _this.handleOpenChange([]);
            var onClick = _this.props.onClick;

            if (onClick) {
                onClick(e);
            }
        };
        _this.handleOpenChange = function (openKeys) {
            _this.setOpenKeys(openKeys);
            var onOpenChange = _this.props.onOpenChange;

            if (onOpenChange) {
                onOpenChange(openKeys);
            }
        };
        warning(!('onOpen' in props || 'onClose' in props), '`onOpen` and `onClose` are removed, please use `onOpenChange` instead, ' + 'see: https://u.ant.design/menu-on-open-change.');
        warning(!('inlineCollapsed' in props && props.mode !== 'inline'), '`inlineCollapsed` should only be used when Menu\'s `mode` is inline.');
        var openKeys = void 0;
        if ('openKeys' in props) {
            openKeys = props.openKeys;
        } else if ('defaultOpenKeys' in props) {
            openKeys = props.defaultOpenKeys;
        }
        _this.state = {
            openKeys: openKeys || []
        };
        return _this;
    }

    _createClass(Menu, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                inlineCollapsed: this.getInlineCollapsed(),
                antdMenuTheme: this.props.theme
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            if (this.props.mode === 'inline' && nextProps.mode !== 'inline') {
                this.switchingModeFromInline = true;
            }
            if ('openKeys' in nextProps) {
                this.setState({ openKeys: nextProps.openKeys });
                return;
            }
            if (nextProps.inlineCollapsed && !this.props.inlineCollapsed || nextContext.siderCollapsed && !this.context.siderCollapsed) {
                this.switchingModeFromInline = true;
                this.inlineOpenKeys = this.state.openKeys;
                this.setState({ openKeys: [] });
            }
            if (!nextProps.inlineCollapsed && this.props.inlineCollapsed || !nextContext.siderCollapsed && this.context.siderCollapsed) {
                this.setState({ openKeys: this.inlineOpenKeys });
                this.inlineOpenKeys = [];
            }
        }
    }, {
        key: 'setOpenKeys',
        value: function setOpenKeys(openKeys) {
            if (!('openKeys' in this.props)) {
                this.setState({ openKeys: openKeys });
            }
        }
    }, {
        key: 'getRealMenuMode',
        value: function getRealMenuMode() {
            var inlineCollapsed = this.getInlineCollapsed();
            if (this.switchingModeFromInline && inlineCollapsed) {
                return 'inline';
            }
            var mode = this.props.mode;

            return inlineCollapsed ? 'vertical' : mode;
        }
    }, {
        key: 'getInlineCollapsed',
        value: function getInlineCollapsed() {
            var inlineCollapsed = this.props.inlineCollapsed;

            if (this.context.siderCollapsed !== undefined) {
                return this.context.siderCollapsed;
            }
            return inlineCollapsed;
        }
    }, {
        key: 'getMenuOpenAnimation',
        value: function getMenuOpenAnimation(menuMode) {
            var _props = this.props,
                openAnimation = _props.openAnimation,
                openTransitionName = _props.openTransitionName;

            var menuOpenAnimation = openAnimation || openTransitionName;
            if (openAnimation === undefined && openTransitionName === undefined) {
                switch (menuMode) {
                    case 'horizontal':
                        menuOpenAnimation = 'slide-up';
                        break;
                    case 'vertical':
                    case 'vertical-left':
                    case 'vertical-right':
                        // When mode switch from inline
                        // submenu should hide without animation
                        if (this.switchingModeFromInline) {
                            menuOpenAnimation = '';
                            this.switchingModeFromInline = false;
                        } else {
                            menuOpenAnimation = 'zoom-big';
                        }
                        break;
                    case 'inline':
                        menuOpenAnimation = animation;
                        break;
                    default:
                }
            }
            return menuOpenAnimation;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                className = _props2.className,
                theme = _props2.theme;

            var menuMode = this.getRealMenuMode();
            var menuOpenAnimation = this.getMenuOpenAnimation(menuMode);
            var menuClassName = classNames(className, prefixCls + '-' + theme, _defineProperty({}, prefixCls + '-inline-collapsed', this.getInlineCollapsed()));
            var menuProps = {
                openKeys: this.state.openKeys,
                onOpenChange: this.handleOpenChange,
                className: menuClassName,
                mode: menuMode
            };
            if (menuMode !== 'inline') {
                // closing vertical popup submenu after click it
                menuProps.onClick = this.handleClick;
                menuProps.openTransitionName = menuOpenAnimation;
            } else {
                menuProps.openAnimation = menuOpenAnimation;
            }
            // https://github.com/ant-design/ant-design/issues/8587
            var collapsedWidth = this.context.collapsedWidth;

            if (this.getInlineCollapsed() && (collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px')) {
                return null;
            }
            return React.createElement(RcMenu, _extends({}, this.props, menuProps, { onTransitionEnd: this.handleTransitionEnd }));
        }
    }]);

    return Menu;
}(React.Component);

export default Menu;

Menu.Divider = Divider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
Menu.defaultProps = {
    prefixCls: 'ant-menu',
    className: '',
    theme: 'light',
    focusable: false
};
Menu.childContextTypes = {
    inlineCollapsed: PropTypes.bool,
    antdMenuTheme: PropTypes.string
};
Menu.contextTypes = {
    siderCollapsed: PropTypes.bool,
    collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};