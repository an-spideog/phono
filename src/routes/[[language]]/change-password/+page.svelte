<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import VStack from "$lib/components/VStack.svelte"

    export let data
    export let form

    let currentPassword = "";
    let newPassword = "";
    let newPasswordAgain = "";

    let errorReason: null | "emptyPassword" | "passwordsDontMatch"

    $: if (newPassword != newPasswordAgain) {
        errorReason = "passwordsDontMatch";
    } else if (newPassword.length === 0 || currentPassword.length === 0) {
        errorReason = "emptyPassword";
    } else {
        errorReason = null;
    }
</script>

<h1>Athraigh do Phasfhocal</h1>
{#if !data.userId}
<p>
    Caithfidh tú <a href=login>lógáil isteach</a> chun do phasfhocal a athrú.
</p>
{:else}
<form method='POST'>
    <input type=hidden name='userId' value={data.userId}>
    <VStack>
        <label for='current-password'>
            Pasfhocal faoi láthair: 
            <input 
                type=password 
                name='current-password'
                bind:value={currentPassword}>
        </label>
        <label for='new-password'>
            Pasfhocal nua: 
                <input 
                    type=password 
                    name='new-password'
                    bind:value={newPassword}>
        </label>
        <label for='new-password-again'>
            Pasfhocal nua, arís: 
            <input 
                type=password 
                name='new-password-again'
                bind:value={newPasswordAgain}>
        </label>
        <p class=error-message>
            {#if errorReason === "passwordsDontMatch"}
                Ní hionann an dá phasfhocal nua.
            {:else if errorReason === "emptyPassword"}
                Níl cead an pasfhocal a bheith folamh
            {/if}
        </p>
        <Button type=secondary enabled={!errorReason}>
            Athraigh
        </Button>
        {#if form?.error}
            <p class="error-message">
                {form.error}
            </p>
        {:else if form?.success}
            <p class="success">D'athraíodh do phasfhocal</p>
        {/if}
    </VStack>
</form>
{/if}

<style>
    .error-message {
        color: var(--error)
    }

    a {
        display: inline-block;
    }
</style>