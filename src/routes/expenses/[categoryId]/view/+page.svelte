<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { PageData } from './$types';

	export let data: PageData;

	const { expenses } = data;
</script>

<Table.Root class="mt-2">
	<Table.Header>
		<Table.Row>
			<Table.Head>Purchase Date</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Quantity</Table.Head>
			<Table.Head>Price</Table.Head>
			<Table.Head class="hidden md:table-cell">Comments</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each expenses as e}
			<Table.Row class="">
				<Table.Cell>{e.purchasedate}</Table.Cell>
				<Table.Cell>{e.name}</Table.Cell>
				<Table.Cell>{e.quantity}</Table.Cell>
				<Table.Cell>{e.price}</Table.Cell>
				<Table.Cell class="hidden md:block">{e.comments}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
