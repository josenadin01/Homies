<script lang="ts">
	import { page } from '$app/stores';

	const navItems = [
		{ href: '/', label: 'Início', icon: '🏠' },
		{ href: '/delivery', label: 'Delivery', icon: '🛵' },
		{ href: '/mercado', label: 'Mercado', icon: '🛒' },
		{ href: '/contas', label: 'Contas', icon: '📋' },
		{ href: '/lembretes', label: 'Lembretes', icon: '🔔' }
	];
</script>

<nav
	class="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-cream-100/95 backdrop-blur-md border-t border-cream-400 z-40 flex items-center justify-around px-2"
>
	{#each navItems as item}
		<a
			href={item.href}
			class="flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl text-ink-600 hover:bg-cream-300 transition-colors min-w-[4rem] {($page.url
				.pathname === item.href || (item.href !== '/' && $page.url.pathname.startsWith(item.href)))
			? 'text-forest-500 font-medium bg-cream-300'
			: ''}"
		>
			<span class="text-xl">{item.icon}</span>
			<span class="text-xs">{item.label}</span>
		</a>
	{/each}
</nav>
