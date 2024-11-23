"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_weiDropdownMenu_components_weiDropdownMenu_props = require("./props.js");
const _sfc_main = {
  emits: ["change"],
  props: uni_modules_weiDropdownMenu_components_weiDropdownMenu_props.dropdownMenuProps,
  setup(props, { emit, expose }) {
    const $this = common_vendor.getCurrentInstance();
    let windowInfo = {};
    const state = common_vendor.reactive({
      activeIndex: -1,
      activeOptions: {},
      activeTreeIndex: -1,
      currentOptions: [],
      popupContentShow: false,
      treeContentHeight: 0,
      popupTop: 0
    });
    let query = null;
    let animationIng = false;
    common_vendor.onMounted(() => {
      query = common_vendor.index.createSelectorQuery().in($this);
      windowInfo = common_vendor.index.getWindowInfo();
      setTimeout(() => {
        query.select(".wei-dropdown-menu").boundingClientRect((rect) => {
          if (rect) {
            state.popupTop = rect.height + rect.top + windowInfo.windowTop;
          }
        }).exec();
      }, 100);
    });
    common_vendor.watch(() => props.value, (newValue, oldValue) => {
      if (newValue && newValue instanceof Object) {
        Object.keys(newValue).forEach((key) => {
          const index = props.data.findIndex((item) => item.name === key);
          const options = props.data[index] ? props.data[index].options : null;
          if (index > -1 && options) {
            if (Array.isArray(newValue[key])) {
              if (newValue[key].length !== 2) {
                console.warn("二级分类的value值格式有误，请检查!!!");
                return;
              }
              const parentIndex = options.findIndex((item) => item.value === newValue[key][0]);
              if (parentIndex > -1) {
                const valueIndex = options[parentIndex].children.findIndex((item) => item.value === newValue[key][1]);
                if (valueIndex > -1) {
                  state.activeOptions[index] = [options[parentIndex].children[valueIndex], valueIndex, parentIndex];
                }
              }
            } else {
              const valueIndex = options.findIndex((item) => {
                return item.value === newValue[key];
              });
              if (valueIndex > -1) {
                state.activeOptions[index] = [options[valueIndex], valueIndex];
              }
            }
          }
        });
      }
    }, {
      immediate: true
    });
    common_vendor.watch(() => props.data, () => {
      state.activeOptions = {};
      state.activeIndex = -1;
      state.activeTreeIndex = -1;
    });
    const menuPopupClass = common_vendor.ref("hide");
    const menuPopupMaskClass = common_vendor.ref("hide");
    const menuPopupContentClass = common_vendor.ref("hide");
    const menuData = common_vendor.computed(() => {
      return props.data;
    });
    function onMenuClick(item, index) {
      if (animationIng) {
        return;
      }
      animationIng = true;
      if (state.activeIndex > -1) {
        closeOptionPopup();
        return;
      }
      state.currentOptions = menuData.value[index].options || [];
      state.activeIndex = index;
      if (menuData.value[index].treeSelect && state.activeOptions[index]) {
        state.activeTreeIndex = state.activeOptions[index][2];
      }
      common_vendor.nextTick$1(() => {
        openOptionPopup();
      });
    }
    function openOptionPopup() {
      menuPopupClass.value = "show";
      menuPopupMaskClass.value = "fade-in";
      menuPopupContentClass.value = "slide-down";
      common_vendor.nextTick$1(() => {
        setTimeout(() => {
          menuPopupContentClass.value = "show";
          menuPopupMaskClass.value = "show";
          updateTreeContentHeight();
          animationIng = false;
        }, props.duration * 1e3);
      });
    }
    function closeOptionPopup() {
      menuPopupContentClass.value = "slide-up";
      menuPopupMaskClass.value = "fade-out";
      setTimeout(() => {
        menuPopupClass.value = "hide";
        menuPopupContentClass.value = "hide";
        menuPopupMaskClass.value = "hide";
        state.activeIndex = -1;
        state.currentOptions = [];
        state.activeTreeIndex = -1;
        animationIng = false;
      }, props.duration * 1e3);
    }
    function onOptionClick(item, index, parentIndex = null) {
      state.activeOptions[state.activeIndex] = [item, index, parentIndex];
      const tmpValue = {};
      Object.keys(state.activeOptions).forEach((key) => {
        if (state.activeOptions[key]) {
          const curOption = common_vendor.unref(state.activeOptions[key]);
          const name = props.data[key].name;
          if (curOption[2]) {
            const parentValue = props.data[key].options[curOption[2]].value;
            tmpValue[name] = [parentValue, curOption[0].value];
          } else {
            tmpValue[name] = curOption[0].value;
          }
        }
      });
      emit("change", {
        item: common_vendor.unref(item),
        value: tmpValue
      });
      closeOptionPopup();
    }
    function onEmptyClick() {
    }
    function onOverlayClick() {
      if (props.closeOnClickOverlay) {
        closeOptionPopup();
      }
    }
    function onTreeOptionClick(item, index) {
      state.activeOptions[state.activeIndex] = [item, index, common_vendor.unref(state.activeTreeIndex)];
    }
    function onTreeParent(item, index) {
      state.activeTreeIndex = index;
    }
    function updateTreeContentHeight() {
      query.select(".wei-dropdown-menu-popup-content").boundingClientRect((rect) => {
        state.treeContentHeight = rect.height;
      }).exec();
    }
    return {
      ...common_vendor.toRefs(state),
      menuPopupClass,
      menuPopupContentClass,
      menuPopupMaskClass,
      menuData,
      onOptionClick,
      onMenuClick,
      onTreeParent,
      onTreeOptionClick,
      onOverlayClick,
      onEmptyClick
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($setup.menuData, (item, index, i0) => {
      return {
        a: common_vendor.t(_ctx.activeOptions[index] ? _ctx.activeOptions[index][0].label : item.title),
        b: index,
        c: common_vendor.o(($event) => $setup.onMenuClick(item, index), index),
        d: common_vendor.n(_ctx.activeIndex === index && $setup.menuPopupMaskClass !== "fade-out" ? "active" : ""),
        e: item.menuWidth ? item.menuWidth : "auto"
      };
    }),
    b: common_vendor.s(_ctx.menuItemStyle),
    c: _ctx.overlay
  }, _ctx.overlay ? {
    d: common_vendor.n("wei-dropdown-menu-popup-mask--" + $setup.menuPopupMaskClass),
    e: common_vendor.o((...args) => $setup.onOverlayClick && $setup.onOverlayClick(...args))
  } : {}, {
    f: _ctx.activeIndex > -1 && _ctx.data[_ctx.activeIndex].treeSelect === true
  }, _ctx.activeIndex > -1 && _ctx.data[_ctx.activeIndex].treeSelect === true ? common_vendor.e({
    g: common_vendor.f(_ctx.currentOptions, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: index,
        c: common_vendor.n(_ctx.activeTreeIndex === index ? "active" : ""),
        d: common_vendor.o(($event) => $setup.onTreeParent(item, index), index)
      };
    }),
    h: _ctx.activeTreeIndex > -1 && _ctx.currentOptions[_ctx.activeTreeIndex].children
  }, _ctx.activeTreeIndex > -1 && _ctx.currentOptions[_ctx.activeTreeIndex].children ? {
    i: common_vendor.f(_ctx.currentOptions[_ctx.activeTreeIndex].children, (childItem, childIndex, i0) => {
      return common_vendor.e({
        a: common_vendor.t(childItem.label),
        b: _ctx.activeOptions[_ctx.activeIndex] && _ctx.activeOptions[_ctx.activeIndex][2] === _ctx.activeTreeIndex && _ctx.activeOptions[_ctx.activeIndex][1] === childIndex
      }, _ctx.activeOptions[_ctx.activeIndex] && _ctx.activeOptions[_ctx.activeIndex][2] === _ctx.activeTreeIndex && _ctx.activeOptions[_ctx.activeIndex][1] === childIndex ? {
        c: _ctx.activeColor
      } : {}, {
        d: childItem.tip
      }, childItem.tip ? {
        e: common_vendor.t(childItem.tip)
      } : {}, {
        f: childIndex,
        g: common_vendor.o(($event) => $setup.onOptionClick(childItem, childIndex, _ctx.activeTreeIndex), childIndex),
        h: common_vendor.n(_ctx.activeOptions[_ctx.activeIndex] && _ctx.activeOptions[_ctx.activeIndex][2] === _ctx.activeTreeIndex && _ctx.activeOptions[_ctx.activeIndex][1] === childIndex ? "active" : "")
      });
    })
  } : {}, {
    j: _ctx.treeContentHeight + "px",
    k: _ctx.data[_ctx.activeIndex].popupHeight ? _ctx.data[_ctx.activeIndex].popupHeight : "auto"
  }) : {
    l: common_vendor.f(_ctx.currentOptions, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.label),
        b: _ctx.activeOptions[_ctx.activeIndex] && _ctx.activeOptions[_ctx.activeIndex][1] === index
      }, _ctx.activeOptions[_ctx.activeIndex] && _ctx.activeOptions[_ctx.activeIndex][1] === index ? {
        c: _ctx.activeColor
      } : {}, {
        d: index,
        e: common_vendor.o(($event) => $setup.onOptionClick(item, index, null), index),
        f: common_vendor.n(_ctx.activeOptions[_ctx.activeIndex] && _ctx.activeOptions[_ctx.activeIndex][1] === index ? "active" : "")
      });
    })
  }, {
    m: common_vendor.n("wei-dropdown-menu-popup-content--" + $setup.menuPopupContentClass),
    n: common_vendor.o((...args) => $setup.onEmptyClick && $setup.onEmptyClick(...args)),
    o: common_vendor.n("wei-dropdown-menu-popup--" + $setup.menuPopupClass),
    p: _ctx.popupTop + "px",
    q: _ctx.activeColor,
    r: _ctx.duration + "s"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-988ec59d"]]);
wx.createComponent(Component);
