<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { badgeVariants } from '$lib/components/ui/badge';
	import type { PageData } from './$types';

	export let data: PageData;

	const { amountByCategory: categories } = data;
</script>

<div class="mt-2 grid gap-4 md:grid-cols-3">
	{#each categories as cat}
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-center">{cat.name}</Card.Title>
				<Card.Description class="text-center text-lg font-black">{cat.amount}</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="flex items-center justify-between">
					<a
						href={`/expenses/${cat.categoryid}/view`}
						class={badgeVariants({ variant: 'default' })}
					>
						View
					</a>
					<a href={`/expenses/${cat.categoryid}/add`} class={badgeVariants({ variant: 'default' })}
						>Add</a
					>
				</div>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
