<template>
	<view class="dash" :style="{ backgroundColor: Color, width: Width,height:Height }"></view>
</template>

<script setup>
	defineProps({
	  Color: String,
	  Width: String,
	  Height: String
	});
</script>

<style lang="scss" scoped>

</style>