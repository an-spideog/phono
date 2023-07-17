<script lang='ts'>
    import { page } from "$app/stores";
    import VStack from "$lib/components/VStack.svelte"
    import { _ } from "svelte-i18n";
    export let email: string;
</script>

{#if email}
    <VStack>
        <div>
            You are logged in as: <b>{email}</b>
        </div>
        <form method='POST' action='login?/logout'>
            <input type='submit' value='logout'>
        </form>
    </VStack>
{:else}
    <a href='login'>{$_('login')}</a>
{/if}

<style>
    * {
        padding-left: 5px;
    }
</style>