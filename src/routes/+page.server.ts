import sql from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const amountByCategory =
		await sql`select e.categoryid as categoryid, c.name, sum(e.price) as amount
                from expenses e 
                    join category c 
                    on e.categoryid = c.id
                where extract(month from e.purchasedate) = extract(month from current_date)
                group by e.categoryid, c.name`;

	return {
		amountByCategory
	};
};
