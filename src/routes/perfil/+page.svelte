<script lang="ts">
	import { supabase } from '$lib/supabase';

	let newPassword = '';
	let confirm = '';
	let loading = false;
	let success = false;
	let error = '';

	async function handleChangePassword() {
		if (newPassword !== confirm) {
			error = 'As senhas não coincidem.';
			return;
		}
		if (newPassword.length < 6) {
			error = 'A senha deve ter pelo menos 6 caracteres.';
			return;
		}

		loading = true;
		error = '';

		const { error: authError } = await supabase.auth.updateUser({ password: newPassword });

		if (authError) {
			error = authError.message;
		} else {
			success = true;
			newPassword = '';
			confirm = '';
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>Homies — Perfil</title>
</svelte:head>

<div class="max-w-sm mx-auto pt-4">
	<h1 class="text-xl font-bold text-ink-900 mb-6">Perfil</h1>

	<div class="bg-cream-50 rounded-2xl border border-cream-200 p-5">
		<h2 class="text-sm font-semibold text-ink-700 mb-4">Alterar senha</h2>

		{#if success}
			<p class="text-sm text-forest-600 font-medium">Senha alterada com sucesso!</p>
		{:else}
			<form on:submit|preventDefault={handleChangePassword} class="space-y-4">
				<div>
					<label for="new-password" class="block text-sm font-medium text-ink-700 mb-1">Nova senha</label>
					<input
						id="new-password"
						type="password"
						bind:value={newPassword}
						placeholder="••••••••"
						required
						class="w-full px-3 py-2 rounded-lg border border-cream-300 bg-white text-ink-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
					/>
				</div>
				<div>
					<label for="confirm" class="block text-sm font-medium text-ink-700 mb-1">Confirmar senha</label>
					<input
						id="confirm"
						type="password"
						bind:value={confirm}
						placeholder="••••••••"
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
					{loading ? 'Salvando...' : 'Salvar senha'}
				</button>
			</form>
		{/if}
	</div>
</div>
