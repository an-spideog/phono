<script lang='ts'>
    import Button from "$lib/components/Button.svelte"
    import HStack from "$lib/components/HStack.svelte"
    import { _ } from "svelte-i18n";
    import NavButton from "./NavButton.svelte";
    export let email: string;
</script>
{#if email}
    <Button type=secondary  link=user-options>
        <HStack --align-items=center>
        Sonraí Úsáideora
        </HStack>
    </Button>
{:else}
    <Button type=secondary link=login>
        Logáil Isteach 
    </Button>
{/if}

<style>
</style>