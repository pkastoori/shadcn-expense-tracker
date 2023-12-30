import sql from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { categoryId } = params;

	const expenses = await sql`select id, name, price, quantity, comments, cast(purchasedate as text)
                            from expenses 
                            where extract(month from purchasedate) = extract(month from current_date)
                                and categoryid = ${categoryId} 
							order by purchasedate desc`;

	return {
		expenses
	};
};
