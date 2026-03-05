<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';

	async function logout() {
		await supabase.auth.signOut();
		goto('/login');
	}

	const navItems = [
		{ href: '/', label: 'Início', icon: '🏠' },
		{ href: '/delivery', label: 'Delivery', icon: '🛵' },
		{ href: '/mercado', label: 'Mercado', icon: '🛒' },
		{ href: '/contas', label: 'Contas', icon: '📋' },
		{ href: '/lembretes', label: 'Lembretes', icon: '🔔' }
	];
</script>

<aside
	class="hidden lg:flex fixed left-0 top-0 bottom-0 w-56 bg-cream-100 border-r border-cream-400 flex-col z-30 pt-6"
>
	<a href="/" class="px-6 mb-8">
		<span class="text-2xl font-bold text-forest-500 tracking-tight">Homies</span>
	</a>
	<nav class="flex-1 px-3 space-y-1">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex items-center gap-3 px-4 py-3 rounded-xl text-ink-700 hover:bg-cream-300 transition-colors {($page.url
					.pathname === item.href || (item.href !== '/' && $page.url.pathname.startsWith(item.href)))
				? 'bg-cream-300 font-medium text-forest-600'
				: ''}"
			>
				<span class="text-lg">{item.icon}</span>
				<span>{item.label}</span>
			</a>
		{/each}
	</nav>
	<div class="px-3 pb-6">
		<button
			on:click={logout}
			class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-ink-500 hover:bg-cream-300 hover:text-ink-700 transition-colors text-sm"
		>
			<span class="text-lg">🚪</span>
			<span>Sair</span>
		</button>
	</div>
</aside>
