<script>
	import { dropdownMenuProps } from './props.js';
	import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs, unref, watch } from "vue";
	
	/**
	 * 下拉菜单列表
	 * @description 高性能下拉菜单列表组件，兼容多端
	 * @property {Object} value 传递给组件的值，不支持双向绑定，可以通过监听change自己实现双向绑定 默认: {} 
	 * @property {Array} data 整个菜单栏的下拉选择的数据，必填
	 * @property {String} activeColor 菜单标题和选项的选中态颜色 默认: #1989fa
	 * @property {Number} z-index 菜单栏 z-index 层级 默认: 10
	 * @property {Number} duration 动画时长，单位秒，设置为 0 可以禁用动画 默认: 0.2
	 * @property {Boolean} overlay 是否显示遮罩层 默认: true
	 * @property {Boolean} close-on-click-overlay 是否在点击遮罩层后关闭菜单 默认: true
	 * @event {Function} change 当菜单的值改变触发的事件，e = { item: Object, value: Object }
	 */

	export default {
		emits: ['change'],
		props: dropdownMenuProps,
		setup(props, { emit, expose }) {
			const $this = getCurrentInstance();
			
			let windowInfo = {};

			const state = reactive({
				activeIndex: -1,
				activeOptions: {},
				activeTreeIndex: -1,
				currentOptions: [],
				popupContentShow: false,
				treeContentHeight: 0,
				popupTop: 0,
			})
			
			let query = null;
			
			let animationIng = false;
			
			onMounted(() => {
				query = uni.createSelectorQuery().in($this);
				windowInfo = uni.getWindowInfo();
				setTimeout(() => { //等待加载完毕
					query.select('.wei-dropdown-menu').boundingClientRect(rect => {
						if(rect) {
							state.popupTop = rect.height + rect.top + windowInfo.windowTop;
						}
					}).exec();
				}, 100)
			})
			
			watch(() => props.value, (newValue, oldValue) => {
				if(newValue && newValue instanceof Object) {
					Object.keys(newValue).forEach((key) => {
						const index = props.data.findIndex((item) => item.name === key);
						const options = props.data[index] ? props.data[index].options : null;
						if(index > -1 && options ) {
							if(Array.isArray(newValue[key])) { //二级树元素赋值
								if(newValue[key].length !== 2) {
									console.warn('二级分类的value值格式有误，请检查!!!');
									return;
								}
								const parentIndex = options.findIndex((item) => item.value === newValue[key][0]);
								if(parentIndex > -1) {
									const valueIndex = options[parentIndex].children.findIndex((item) => item.value === newValue[key][1]);
									if(valueIndex > -1) {
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
					})
				}
			}, {
				immediate: true
			})
			
			watch(() => props.data, () => { 
				state.activeOptions = {};
				state.activeIndex = -1;
				state.activeTreeIndex = -1;
			})

			const menuPopupClass = ref('hide');
			const menuPopupMaskClass = ref('hide');
			const menuPopupContentClass = ref('hide');
			
			const menuData = computed(() => {
				return props.data;
			})
			
			function onMenuClick(item, index) {
				if(animationIng) {
					return;
				}
				animationIng = true;
				if(state.activeIndex > -1) {
					closeOptionPopup();
					return;
				}
				state.currentOptions =  menuData.value[index].options || [];
				state.activeIndex = index;
				if(menuData.value[index].treeSelect 
					&& state.activeOptions[index]) {
					state.activeTreeIndex = state.activeOptions[index][2];
				}
				nextTick(() => {
					openOptionPopup();
				})
			}
			
			function openOptionPopup() {
				menuPopupClass.value = 'show';
				menuPopupMaskClass.value = 'fade-in';
				menuPopupContentClass.value = 'slide-down';
				nextTick(() => {
					setTimeout(() => {
						menuPopupContentClass.value = 'show';
						menuPopupMaskClass.value = 'show';
						updateTreeContentHeight();
						animationIng = false;
					}, props.duration * 1000);
				})
			}
			
			function closeOptionPopup() {
				menuPopupContentClass.value = 'slide-up';
				menuPopupMaskClass.value = 'fade-out';
				setTimeout(() => {
					menuPopupClass.value = 'hide';
					menuPopupContentClass.value = 'hide';
					menuPopupMaskClass.value = 'hide';
					state.activeIndex = -1;
					state.currentOptions = [];
					state.activeTreeIndex = -1;
					animationIng = false;
				}, props.duration * 1000);
			}
			
			function onOptionClick(item, index, parentIndex = null) {
				state.activeOptions[state.activeIndex] = [item, index, parentIndex];
				const tmpValue = {};
				Object.keys(state.activeOptions).forEach(key => {
					if(state.activeOptions[key]) {
						const curOption = unref(state.activeOptions[key]);
						const name = props.data[key].name;
						//判断是否属于分类结构
						if(curOption[2]) {
							const parentValue = props.data[key].options[curOption[2]].value;
							tmpValue[name] = [parentValue, curOption[0].value];
						} else {
							tmpValue[name] = curOption[0].value;
						}
					}
				})
				emit('change', {
					item: unref(item),
					value: tmpValue,
				});
				closeOptionPopup();
			}
			
			function onEmptyClick() {  }
			
			function onOverlayClick() {
				if(props.closeOnClickOverlay) {
					closeOptionPopup();
				}
			}
			
			function onTreeOptionClick(item, index) {
				state.activeOptions[state.activeIndex] = [item, index, unref(state.activeTreeIndex)];
			}
			
			function onTreeParent(item, index) {
				state.activeTreeIndex = index;
			}
			
			function updateTreeContentHeight() {
				query.select('.wei-dropdown-menu-popup-content').boundingClientRect(rect => {
				  state.treeContentHeight = rect.height;
				}).exec();
			}

			return {
				...toRefs(state),
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
			}
		}
	}
</script>
<template>
	<view class="wei-dropdown-menu" :style="{
		'--active-color': activeColor,
		'--duration': duration + 's'
	}">
		<view class="wei-dropdown-menu-bar">
			<view
				class="wei-dropdown-menu-item"
				v-for="(item, index) in menuData" :key="index"
				@tap="onMenuClick(item, index)"
				:class="[activeIndex === index && menuPopupMaskClass !== 'fade-out' ? 'active' : '' ]"
				:style="{
					width: item.menuWidth ? item.menuWidth : 'auto',
					...menuItemStyle
				}"
			>
				<view class="label">
					<text class="label-text">{{ activeOptions[index] ? activeOptions[index][0].label : item.title }}</text>
				</view>
				<view class="indicator">
					<view class="indicator-icon"></view>
				</view>
			</view>
		</view>
		<view class="wei-dropdown-menu-popup" 
			:class="'wei-dropdown-menu-popup--'+menuPopupClass"
			:style="{
				top: popupTop + 'px',
			}"
		>
			<view class="wei-dropdown-menu-popup-mask"
				:class="'wei-dropdown-menu-popup-mask--'+menuPopupMaskClass"
				v-if="overlay"
				@tap="onOverlayClick"
			></view>
			<view 
				class="wei-dropdown-menu-popup-content" 
				:class="'wei-dropdown-menu-popup-content--'+menuPopupContentClass"
				@tap.native.stop="onEmptyClick"
			>
				<template v-if="activeIndex > -1 && data[activeIndex].treeSelect === true">
					<view class="wei-dropdown-menu-tree" :style="{
						height: data[activeIndex].popupHeight ? data[activeIndex].popupHeight : 'auto',
					}">
						<view class="wei-dropdown-menu-tree-nav">
							<view 
								class="wei-dropdown-menu-tree-nav-item"
								v-for="(item, index) in currentOptions"
								:key="index"
								:class="activeTreeIndex === index ? 'active' : ''"
								@tap="onTreeParent(item, index)"
							>
								<text class="wei-dropdown-menu-tree-nav-item-text">{{ item.label }}</text>
							</view>
						</view>
						<scroll-view scroll-y :style="{ height: treeContentHeight + 'px' }" class="wei-dropdown-menu-tree-content">
							<template v-if="activeTreeIndex >-1 
								&& currentOptions[activeTreeIndex].children">
								<view
									class="wei-dropdown-menu-tree-nav-option"
									v-for="(childItem, childIndex) in currentOptions[activeTreeIndex].children"
									:key="childIndex"
									@tap="onOptionClick(childItem, childIndex, activeTreeIndex)"
									:class="activeOptions[activeIndex] && activeOptions[activeIndex][2] === activeTreeIndex
										&& activeOptions[activeIndex][1] === childIndex ? 'active' : ''"
								>
									<text 
										class="wei-dropdown-menu-tree-nav-option-text"
									>{{ childItem.label }}</text>
									<view class="wei-dropdown-menu-tree-nav-option-ft">
										<icon
											v-if="activeOptions[activeIndex] && activeOptions[activeIndex][2] === activeTreeIndex
															&& activeOptions[activeIndex][1] === childIndex"
											type="success_no_circle" 
											size="15" 
											:color="activeColor">
										>
										</icon>
										<text class="wei-dropdown-menu-option-tip" v-if="childItem.tip">{{ childItem.tip }}</text>
									</view>
								</view>
							</template>
						</scroll-view>
					</view>
				</template>
				<template v-else>
					<view class="wei-dropdown-menu-option"
						v-for="(item, index) in currentOptions"
						:key="index"
						@tap="onOptionClick(item, index, null)"
						:class="activeOptions[activeIndex] && activeOptions[activeIndex][1] === index ? 'active' : ''"
					>
						<text class="wei-dropdown-menu-option-label">{{ item.label }}</text>
						<icon 
							v-if="activeOptions[activeIndex] && activeOptions[activeIndex][1] === index"
							type="success_no_circle" 
							class="wei-dropdown-menu-option-icon" 
							size="15" 
							:color="activeColor">
						</icon>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>
<style lang="scss" scoped>

	$wei-dropdown-menu-height: 48px !default;
	$wei-dropdown-menu-label-font-size: 15px !default;
	$wei-dropdown-menu-indicator-color: #dcdee0 !default;
	$wei-dropdown-menu-indicator-size: 5px !default;

	.wei-dropdown-menu-bar {
		background-color: #fff;
		display: block;
		height: $wei-dropdown-menu-height;
		display: flex;
		width: 100%;
		overflow: hidden;
		box-shadow: 0 2px 12px rgba(100, 101, 102, .12);
	}
	
	.wei-dropdown-menu-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: $wei-dropdown-menu-label-font-size;
		.label {
			margin-right: 5px;
			&-text {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 15px;
			}
		}
		&.active {
			color: var(--active-color);
			.indicator-icon {
				border-color: var(--active-color) transparent transparent transparent;
				transform: rotate(-180deg);
			}
		}
		.indicator-icon {
			width: 0;
			height: 0;
			border-style: solid;
			border-width: $wei-dropdown-menu-indicator-size $wei-dropdown-menu-indicator-size 0 $wei-dropdown-menu-indicator-size;
			border-color: $wei-dropdown-menu-indicator-color transparent transparent transparent;
		}
	}
	
	.wei-dropdown-menu-popup {
		position: fixed;
		top: $wei-dropdown-menu-height;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		overflow: hidden;
		&--show {
			display: block !important;
		}
		&--hide {
			display: none !important;
		}
		&-mask {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.7);
			&--hide {
				opacity: 0;
			}
			&--show {
				opacity: 1;
			}
			&--fade-up {
				animation: weiDropdownMenuFadeIn ease var(--duration) forwards;
			}
			&--fade-out {
				animation: weiDropdownMenuFadeOut ease var(--duration) forwards;
			}
		}
		&-content {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			max-height: 80%;
			background-color: #fff;
			animation-duration: .4;
			&--slide-up {
				animation: weiDropdownMenuSlideUp ease var(--duration) forwards;
			}
			&--slide-down {
				animation: weiDropdownMenuSlideDown ease var(--duration) forwards;
			}
			&--hide {
				transform: translate3d(0, -100%, 0);
			}
			&--show {
				transform: translate3d(0, 0, 0);
			}
		}
	}
	
	.wei-dropdown-menu-popup-content {
		.wei-dropdown-menu-option {
			position: relative;
			padding: 10px 16px;
			box-sizing: border-box;
			&-label {
				font-size: 14px;
			}
			&-icon {
				position: absolute;
				right: 16px;
				top: 50%;
				transform: translateY(-50%);
				color: var(--active-color);
			}
			&.active {
				color: var(--active-color);
			}
		}
		.wei-dropdown-menu-option + .wei-dropdown-menu-option {
			&::before {
				content: " ";
				position: absolute;
				box-sizing: border-box;
				pointer-events: none;
				right: 16px;
				top: 0;
				left: 16px;
				border-bottom: 1px solid #ebedf0;
				transform: scaleY(.5)
			}
		}
	}
	
	.wei-dropdown-menu-tree {
		display: flex;
		flex-direction: row;
		&-nav {
			box-sizing: border-box;
			max-width: 120px;
			display: flex;
			flex-direction: column;
			background-color: #f7f8fa;
			&-item {
				padding: 14px 12px;
				position: relative;
				&-text {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 14px;
				}
				&.active {
					background-color: #fff;
					font-weight: bold;
					&::before {
						content: " ";
						position: absolute;
						top: 50%;
						left: 0;
						width: 4px;
						height: 16px;
						background-color: var(--active-color);
						transform: translateY(-50%);
					}
				}
			}
			&-option {
				padding: 0 20px;
				height: 40px;
				display: flex;
				align-items: center;
				flex-direction: row;
				overflow: hidden;
				&.active {
					color: var(--active-color);
				}
				&-text {
					flex: 1;
					font-weight: bold;
					font-size: 14px;
				}
				&-ft {
					display: flex;
					flex-direction: row;
					align-items: center;
				}
			}
		}
	}
	
	.wei-dropdown-menu-option {
		&-tip {
			margin-left: 5px;
			font-size: 13px;
			color: #969799;
		}
	}

	@keyframes weiDropdownMenuSlideUp{
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(0, -100%, 0);
		}
	}
	
	@keyframes weiDropdownMenuSlideDown {
		from {
			transform: translate3d(0, -100%, 0);
		}
		to {
			transform: translate3d(0, 0, 0);
		}
	}
	
	@keyframes weiDropdownMenuFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	@keyframes weiDropdownMenuFadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
