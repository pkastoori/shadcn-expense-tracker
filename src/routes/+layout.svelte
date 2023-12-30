<script>
	import '../app.pcss';
	import * as Menubar from '$lib/components/ui/menubar';
	import { Menu } from 'lucide-svelte';
</script>

<div class="p-1 md:container md:mx-auto">
	<div class="flex items-center justify-between md:mx-auto md:w-2/3">
		<h1 class="text-xl font-medium"><a href="/"> Expense Tracker</a></h1>
		<div>
			<Menubar.Root>
				<Menubar.Menu>
					<Menubar.Trigger><Menu /></Menubar.Trigger>
					<Menubar.Content>
						<Menubar.Item><a href="/categories">Categories</a></Menubar.Item>
						<Menubar.Separator />
						<Menubar.Item>Stats</Menubar.Item>
						<Menubar.Separator />
						<Menubar.Item>Logout</Menubar.Item>
					</Menubar.Content>
				</Menubar.Menu>
			</Menubar.Root>
		</div>
	</div>
	<slot />
</div>
