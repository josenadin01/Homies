<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
</script>

<div class="min-h-screen flex flex-col lg:flex-row">
	<Header />
	<Sidebar />

	<main class="flex-1 pt-16 lg:pt-6 lg:pl-56 pb-20 lg:pb-8 px-4 lg:px-8">
		<slot />
	</main>

	<BottomNav />
</div>
