import { expenseSchema } from '$lib';
import sql from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { categoryId } = params;

	const items = await sql`select name from items where categoryid = ${categoryId}`;

	const names: string[] = [];
	items.map((item) => {
		names.push(item.name);
	});

	const expenseForm = await superValidate(expenseSchema);

	return {
		names,
		expenseForm,
		categoryId
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, expenseSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const purchaseDate = new Date().toISOString().substring(0, 10);

		await sql`insert into expenses 
			(categoryid, name, quantity, price, purchasedate, comments)
			values (${form.data.categoryId}, ${form.data.name}, ${form.data.quantity}, ${form.data.price}, ${purchaseDate}, ${form.data.comments})`;

		return {
			form
		};
	}
};
