

## 介绍
向下弹出的菜单列表，支持二级分类选择。不依赖任何第三方插件，支持小程序、h5、app-vue。
注意: 仅支持vue3
### 基本用法
```
<template>
	<view class="content">
		<wei-dropdown-menu :data="menuData" @change="onChange" :value="menuValue"></wei-dropdown-menu>
		<view class="action-btns">
			<button @tap="setValueChange" type="primary">手动触发值改变</button>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import { menuData } from './data.js';
	
	const menuValue = ref({});
	
	function onChange(e) {
		console.log('↓↓↓↓触发change事件↓↓↓↓')
		console.log(e)
	}
</script>
```

## 属性/事件说明

|属性名	           |类型	      |默认值	|说明	  |
|:--:|:--:|:--:|:--:|
|value        |Object         |{}     |传递给组件的值，不支持双向绑定，可以通过监听change自己实现双向绑定| 
|data         |Array          |[]     |整个菜单栏的下拉选择的数据，必填，具体看下面说明
|activeColor  |String         |#1989fa|菜单标题和选项的选中态颜色 |
|z-index      |Number         |10     |菜单栏 z-index 层级|
|duration     |Number         |.2     |动画时长，单位秒，设置为 0 可以禁用动画|
|overlay      |Boolean        |true   |是否显示遮罩层|
|close-on-click-overlay      |Boolean        |true   |是否在点击遮罩层后关闭菜单|
|@change   |Function   |  |当菜单的值改变触发的事件，e = { item: Object, value: Object }|

### 属性 Data

Data 属性必须为数组，数组每一项的配置如下

|属性名	           |类型	      |默认值	|说明	  |
|:--:|:--:|:--:|:--:|
|name|String|null| 必填,每栏菜单项的唯一标识,也就是组件value值的key|
|title|String|null| 必填,每栏菜单显示的标题|
|options|Array|null| 必填,下拉菜单的选择项，格式 { label:"xxx", value:"xxx", tip: "显示在最右边的提示" }|
|treeSelect|Boolean|false| 是否为二级分类选择, 如果是,options需要有children字段|
|popupHeight|String|null| 弹出选择菜单的高度，如果为空，则会自适应选项高度, 必须带单位 |
|menuWidth|String|null|每项菜单栏的宽度,为空自适应,必须带单位|

### 后期继续完善的功能

- [ ] 增加出更多样式配置
- [ ] 兼容nvue


