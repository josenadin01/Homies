<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let loading = false;
	let sent = false;
	let error = '';
	let mode: 'magic' | 'password' = 'password';

	async function handleMagicLink() {
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

	async function handlePassword() {
		if (!email || !password) return;
		loading = true;
		error = '';

		const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

		if (authError) {
			error = 'Email ou senha incorretos.';
		} else {
			goto('/');
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
			<!-- Tabs -->
			<div class="flex rounded-lg bg-cream-200 p-1 mb-5">
				<button
					class="flex-1 py-1.5 rounded-md text-sm font-medium transition-colors {mode === 'password' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'}"
					on:click={() => { mode = 'password'; error = ''; }}
				>
					Senha
				</button>
				<button
					class="flex-1 py-1.5 rounded-md text-sm font-medium transition-colors {mode === 'magic' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'}"
					on:click={() => { mode = 'magic'; error = ''; sent = false; }}
				>
					Magic Link
				</button>
			</div>

			{#if mode === 'password'}
				<form on:submit|preventDefault={handlePassword} class="space-y-4">
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
					<div>
						<label for="password" class="block text-sm font-medium text-ink-700 mb-1">Senha</label>
						<input
							id="password"
							type="password"
							bind:value={password}
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
						{loading ? 'Entrando...' : 'Entrar'}
					</button>
				</form>

			{:else if sent}
				<div class="text-center py-4">
					<div class="text-4xl mb-3">📬</div>
					<h2 class="text-lg font-semibold text-ink-900 mb-2">Verifique seu email</h2>
					<p class="text-ink-500 text-sm">
						Enviamos um link de acesso para <strong>{email}</strong>.
					</p>
					<button
						class="mt-4 text-forest-600 text-sm underline"
						on:click={() => { sent = false; email = ''; }}
					>
						Usar outro email
					</button>
				</div>
			{:else}
				<form on:submit|preventDefault={handleMagicLink} class="space-y-4">
					<div>
						<label for="email-magic" class="block text-sm font-medium text-ink-700 mb-1">Email</label>
						<input
							id="email-magic"
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
