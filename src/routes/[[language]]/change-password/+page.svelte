<script lang="ts">
    import Callout from "$lib/components/Callout.svelte"
    import Button from "$lib/components/deprecated/Button.svelte"
    import NewButton from "$lib/components/NewButton.svelte"
    import { _ } from "svelte-i18n";

    export let data
    export let form

    let currentPassword = "";
    let newPassword = "";
    let newPasswordAgain = "";
    let errorReason: null | "emptyPassword" | "passwordsDontMatch"

    // TODO: figure out if we need other error messages if not simplify the error logic
    $: if (newPassword != newPasswordAgain) {
        errorReason = "passwordsDontMatch";
    } else {
        errorReason = null;
    }
</script>


<h1>{$_('changePassword')}</h1>
{#if !data.userId}
    <p>
        {$_('loginToChangePassword.1')} 
        <a href=login class=inline>{$_('login')}</a>
        {$_('loginToChangePassword.2')}
    </p>
{:else}
        <form method='POST'>
        <input type=hidden name='userId' value={data.userId}>
        <div class='flex flex-col gap-2 max-w-sm mb-2'>
            {#if form?.error }
                <Callout color=red>
                    {$_('passwordNotChanged')}
                </Callout>
            {:else if form?.success}
                <Callout color=green>
                    {$_('passwordChanged')}
                </Callout>
            {/if}
            <label for='current-password'>
                {$_('currentPassword')}
            </label>
            <input 
                type=password 
                name='current-password'
                bind:value={currentPassword}>

            <label for='new-password'>
                {$_('newPassword')}
            </label>
            <input 
                type=password 
                name='new-password'
                bind:value={newPassword}>

            <label for='new-password-again'>
                {$_('newPasswordAgain')}:
            </label>
            <input 
                type=password 
                name='new-password-again'
                bind:value={newPasswordAgain}>

            {#if errorReason}
                <p class='text-red-800'>
                    {$_(errorReason)}
                </p>
            {/if}
            </div>
            <NewButton enabled={(!errorReason && newPassword !== '')}>
                {$_('change')}
            </NewButton>
    </form>
{/if}