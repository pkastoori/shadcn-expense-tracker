<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Form from '$lib/components/ui/form';
	import { itemSchema } from '$lib';

	export let data;

	const { categories, itemForm } = data;
</script>

<Tabs.Root value="view" class="mt-4 w-full">
	<Tabs.List class="w-full">
		<Tabs.Trigger class="w-full" value="view">View</Tabs.Trigger>
		<Tabs.Trigger class="w-full" value="add">Add</Tabs.Trigger>
	</Tabs.List>
	<!-- View -->
	<Tabs.Content class="w-full" value="view">
		<Accordion.Root class="w-full">
			{#each categories as category}
				<Accordion.Item value={category.categoryname}>
					<Accordion.Trigger>{category.categoryname}</Accordion.Trigger>
					<Accordion.Content>
						<div class="grid grid-cols-2 md:grid-cols-6">
							{#each category.items.split(',') as item}
								<p>{item}</p>
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</Tabs.Content>
	<!-- Add -->
	<Tabs.Content class="w-full" value="add">
		<Form.Root
			options={{
				resetForm: true
			}}
			class="mt-2 space-y-2 md:mx-auto md:w-1/2 md:space-y-6"
			method="POST"
			{itemForm}
			schema={itemSchema}
			let:config
		>
			<Form.Field {config} name="categoryId">
				<Form.Item>
					<Form.Label>Name</Form.Label>
					<Form.Select>
						<Form.SelectTrigger placeholder="Select a category" />
						<Form.SelectContent>
							{#each categories as category}
								<Form.SelectItem value={category.id}>{category.categoryname}</Form.SelectItem>
							{/each}
						</Form.SelectContent>
					</Form.Select>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="name">
				<Form.Item>
					<Form.Label>Name</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Button>Submit</Form.Button>
		</Form.Root>
	</Tabs.Content>
</Tabs.Root>
