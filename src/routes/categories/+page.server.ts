import sql from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { itemSchema } from '$lib';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const categories = await sql`select  c.id, c.name as categoryName, string_agg(i.name, ',') items
							from category c
							join items i
								on c.id = cast(i.categoryid as uuid)
							group by c.id, c.name`;

	const itemForm = await superValidate(itemSchema);

	return {
		categories,
		itemForm
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, itemSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await sql`insert into items (name, categoryid) values (${form.data.name},${form.data.categoryId})`;

		return {
			form
		};
		// throw redirect(303, '/');
	}
};
