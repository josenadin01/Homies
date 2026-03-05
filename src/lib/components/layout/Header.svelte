<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';

	async function logout() {
		await supabase.auth.signOut();
		goto('/login');
	}
</script>

<header
	class="fixed top-0 left-0 right-0 h-14 bg-cream-100/95 backdrop-blur-md border-b border-cream-400 z-40 lg:hidden flex items-center justify-between px-4"
>
	<a href="/" class="text-xl font-bold text-forest-500 tracking-tight">Homies</a>
	<button on:click={logout} class="text-ink-500 hover:text-ink-700 p-1 text-sm">🚪 Sair</button>
</header>
