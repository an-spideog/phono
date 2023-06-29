<script lang='ts'>
    import { page } from "$app/stores";
    export let email: string;
    import { _ } from "svelte-i18n";
</script>

{#if email}
    You are logged in as: <b>{email}</b>
    <form method='POST' action='login?/logout'>
        <input type='submit' value='logout'>
    </form>
{:else}
    <a href='login'>{$_('login')}</a>
{/if}
