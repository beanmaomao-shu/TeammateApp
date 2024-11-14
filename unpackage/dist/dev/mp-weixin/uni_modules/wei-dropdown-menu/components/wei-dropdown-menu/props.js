"use strict";
const dropdownMenuProps = {
  value: {
    type: Object,
    default: () => {
    }
  },
  activeColor: {
    type: String,
    default: "#1989fa"
  },
  zIndex: {
    type: Number,
    default: 10
  },
  overlay: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 0.3
  },
  menuItemStyle: {
    type: Object,
    default: {}
  },
  data: {
    type: Array,
    default: () => []
  }
};
exports.dropdownMenuProps = dropdownMenuProps;
