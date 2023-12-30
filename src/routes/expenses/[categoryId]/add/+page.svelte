<script lang="ts">
	import type { PageData } from './$types';
	import { expenseSchema } from '$lib';

	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';

	import { Check, ChevronsUpDown } from 'lucide-svelte';

	import { cn } from '$lib/utils';
	import { tick } from 'svelte';

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	export let data: PageData;

	const { names, expenseForm, categoryId } = data;

	let open = false;
</script>

<Form.Root
	class="mt-2 space-y-2 md:mx-auto md:w-1/2 md:space-y-6"
	method="POST"
	{expenseForm}
	schema={expenseSchema}
	let:config
	options={{
		clearOnSubmit: 'errors-and-message',
		resetForm: true
	}}
>
	<Form.Field {config} name="categoryId">
		<Form.Item class="hidden">
			<Form.Label>CategoryId</Form.Label>
			<Form.Input value={categoryId} />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="name" let:setValue let:value>
		<Form.Item class="flex flex-col">
			<Form.Label>Name</Form.Label>
			<Popover.Root bind:open let:ids>
				<Popover.Trigger asChild let:builder>
					<Form.Control id={ids.trigger} let:attrs>
						<Button
							builders={[builder]}
							{...attrs}
							variant="outline"
							role="combobox"
							type="button"
							class={cn(' justify-between', !value && 'text-muted-foreground')}
						>
							{names.find((f) => f === value) ?? 'Select Item'}
							<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</Form.Control>
				</Popover.Trigger>
				<Popover.Content class="w-[200px] p-0">
					<Command.Root>
						<Command.Input autofocus placeholder="Search item..." />
						<Command.Empty>No item found.</Command.Empty>
						<Command.Group>
							{#each names as name}
								<Command.Item
									value={name}
									onSelect={() => {
										setValue(name);
										closeAndFocusTrigger(ids.trigger);
									}}
								>
									<Check class={cn('mr-2 h-4 w-4', name !== value && 'text-transparent')} />
									{name}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<!-- <Form.Field {config} name="name">
		<Form.Item>
			<Form.Label>Name</Form.Label>
			<Form.Select>
				<Form.SelectTrigger placeholder="Select an item" />
				<Form.SelectContent>
					{#each names as name}
						<Form.SelectItem value={name}>{name}</Form.SelectItem>
					{/each}
				</Form.SelectContent>
			</Form.Select>
			<Form.Validation />
		</Form.Item>
	</Form.Field> -->
	<Form.Field {config} name="quantity">
		<Form.Item>
			<Form.Label>Quantity</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="price">
		<Form.Item>
			<Form.Label>Price</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="comments">
		<Form.Item>
			<Form.Label>Comments</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</Form.Root>
