import { writable } from 'svelte/store';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '$lib/supabase';

export const session = writable<Session | null>(null);
export const user = writable<User | null>(null);

export function initAuth() {
	supabase.auth.getSession().then(({ data }) => {
		session.set(data.session);
		user.set(data.session?.user ?? null);
	});

	supabase.auth.onAuthStateChange((_event, newSession) => {
		session.set(newSession);
		user.set(newSession?.user ?? null);
	});
}
