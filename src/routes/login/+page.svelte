<script lang="ts">
	import { supabase } from '$lib/supabase';

	let email = '';
	let loading = false;
	let sent = false;
	let error = '';

	async function handleSubmit() {
		if (!email) return;
		loading = true;
		error = '';

		const { error: authError } = await supabase.auth.signInWithOtp({ email });

		if (authError) {
			error = authError.message;
		} else {
			sent = true;
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>Homies — Login</title>
</svelte:head>

<div class="min-h-screen bg-cream-100 flex items-center justify-center px-4">
	<div class="w-full max-w-sm">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-ink-900 mb-2">Homies</h1>
			<p class="text-ink-500 text-sm">Gerenciamento do casal</p>
		</div>

		<div class="bg-cream-50 rounded-2xl shadow-sm border border-cream-200 p-6">
			{#if sent}
				<div class="text-center py-4">
					<div class="text-4xl mb-3">📬</div>
					<h2 class="text-lg font-semibold text-ink-900 mb-2">Verifique seu email</h2>
					<p class="text-ink-500 text-sm">
						Enviamos um link de acesso para <strong>{email}</strong>. Clique no link para entrar.
					</p>
					<button
						class="mt-4 text-forest-600 text-sm underline"
						on:click={() => { sent = false; email = ''; }}
					>
						Usar outro email
					</button>
				</div>
			{:else}
				<h2 class="text-lg font-semibold text-ink-900 mb-1">Entrar</h2>
				<p class="text-ink-500 text-sm mb-5">Receba um link mágico no seu email</p>

				<form on:submit|preventDefault={handleSubmit} class="space-y-4">
					<div>
						<label for="email" class="block text-sm font-medium text-ink-700 mb-1">Email</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							placeholder="seu@email.com"
							required
							class="w-full px-3 py-2 rounded-lg border border-cream-300 bg-white text-ink-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
						/>
					</div>

					{#if error}
						<p class="text-sm text-red-600">{error}</p>
					{/if}

					<button
						type="submit"
						disabled={loading}
						class="w-full py-2.5 rounded-lg bg-forest-500 text-cream-50 font-semibold text-sm hover:bg-forest-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? 'Enviando...' : 'Enviar link de acesso'}
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>
