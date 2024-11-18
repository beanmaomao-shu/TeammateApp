<template>
	<view class="test" v-if="toValue.value==='a'">
		12313213
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	const toValue = ref('a');
</script>

<style lang="scss">

</style>
