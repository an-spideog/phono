<script lang="ts">
  import { enhance } from '$app/forms'
    import Button from '$lib/components/Button.svelte';
    import HStack from '$lib/components/HStack.svelte';
    import VStack from '$lib/components/VStack.svelte';
    export let data
</script>

<VStack --justify-content=start>
    <h1>{data.email}</h1>
    <h2>{data.isAdmin ? 'Modhnóir' : 'Gnáthúsáideoir'}</h2>
    <HStack --justify-content=space-around>
        <form method='POST' action='login?/logout' use:enhance>
            <Button type=secondary>
                Logáil Amach
            </Button>
        </form>

        <Button type=secondary link='change-password'>
            Athraigh do phasfhocal
        </Button>
    </HStack>
</VStack>
