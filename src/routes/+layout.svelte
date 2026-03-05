<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	import { initAuth, session } from '$lib/stores/auth';
	import { initDelivery } from '$lib/stores/delivery';
	import { initMarket } from '$lib/stores/market';
	import { initBills } from '$lib/stores/bills';
	import { initReminders } from '$lib/stores/reminders';
	import { initProfiles } from '$lib/stores/profiles';

	let ready = false;

	onMount(() => {
		initAuth();

		const unsub = session.subscribe(async (s) => {
			const isLoginPage = $page.url.pathname === '/login';

			if (s === null && !isLoginPage) {
				await goto('/login');
			} else if (s !== null && isLoginPage) {
				await goto('/');
			}

			if (s !== null && !ready) {
				initProfiles();
				initDelivery();
				initMarket();
				initBills();
				initReminders();
				ready = true;
			}
		});

		return unsub;
	});

	$: isLoginPage = $page.url.pathname === '/login';
</script>

{#if isLoginPage}
	<slot />
{:else if ready}
	<div class="min-h-screen flex flex-col lg:flex-row">
		<Header />
		<Sidebar />

		<main class="flex-1 pt-16 lg:pt-6 lg:pl-56 pb-20 lg:pb-8 px-4 lg:px-8">
			<slot />
		</main>

		<BottomNav />
	</div>
{/if}
