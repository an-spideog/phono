<script lang>
	import './styles.css';
	import { page } from '$app/stores'
	import { resolvePath } from '@sveltejs/kit';
	import NavButton from '$lib/components/NavButton.svelte'

	export let data;
</script>

<div class='sticky top-0 bg-white shadow w-full z-10'>
	<!--All Device Header-->
	<div class='lg:container mx-auto flex justify-between p-4 items-center'>
		<a href=/ class='text-4xl font-bold text-blue-800'>
			Phono
		</a>
		<div class='flex justify-between gap-2'>
			<a class='hidden md:flex rounded items-center px-4 py-2 bg-blue-800 
				text-white' data-sveltekit-preload-data=off href={resolvePath($page.route.id ?? '', {...$page.params, language: 'ga'})}>
				Gaeilge
			</a>
			<a class='hidden md:flex rounded items-center px-4 py-2 bg-blue-200 
				text-black' data-sveltekit-preload-data=off href={resolvePath($page.route.id ?? '', {...$page.params, language: 'en'})}>
				English
			</a>
			{#if data.isAdmin}
				<a class='md:hidden' href={resolvePath(`/[[language]]/admin`, $page.params)}>
					<img src='/src/lib/images/shield.png' alt=admin/>
				</a>
			{/if}
			<a href={resolvePath(`/[[language]]/${data.email ? 'account' : 'login'}`, $page.params)}>
				<img src='/src/lib/images/account_circle.png' alt=account/>
			</a>
		</div>
	</div>

	<!--Medium and Larger Nav Bar-->
	<div class='lg:container mx-auto hidden md:flex justify-between p-4 items-center'>
		{#if data.isAdmin}
			<NavButton isCompact={false} link=admin icon=shield/>
		{/if}
		<NavButton isCompact={false} link=introduction icon=description/>
		<NavButton isCompact={false} link=reels icon=folder/>
		<NavButton isCompact={false} link=tracks icon=album/>
		<NavButton isCompact={false} link=speakers icon=record_voice_over/>
		<NavButton isCompact={false} link=collectors icon=interpreter_mode/>
	</div>
</div>

<!--I add a lot of bottom padding here to clear the main content above the mobile footer
	There's probably a better way to do this with a grid though.-->
<div class='lg:container mx-auto px-4 py-5 pb-28'>
	<slot/>
</div>

<!--Mobile Footer-->
<div class='fixed md:hidden bottom-0 w-full flex justify-between p-4 bg-white shadow'>
	<NavButton isCompact={true} link=introduction icon=description/>
	<NavButton isCompact={true} link=reels icon=folder/>
	<NavButton isCompact={true} link=tracks icon=album/>
	<NavButton isCompact={true} link=speakers icon=record_voice_over/>
	<NavButton isCompact={true} link=collectors icon=interpreter_mode/>
</div>