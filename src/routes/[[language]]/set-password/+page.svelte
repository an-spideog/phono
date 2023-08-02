<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import VStack from "$lib/components/VStack.svelte"

    export let form

    let newPassword = "";
    let newPasswordAgain = "";

    let errorReason: null | "emptyPassword" | "passwordsDontMatch"

    $: if (newPassword != newPasswordAgain) {
        errorReason = "passwordsDontMatch";
    } else if (newPassword.length === 0) {
        errorReason = "emptyPassword";
    } else {
        errorReason = null;
    }
</script>

<h1>Socraigh do Phasfhocal</h1>
<form method='POST'>
    <VStack>
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
            Socraigh
        </Button>
        {#if form?.error}
            <p class="error-message">
                {form.error}
            </p>
        {:else if form?.success}
            <p class="success">Socraíodh do phasfhocal. Logáil isteach <a href=login>anseo</a></p>
        {/if}
    </VStack>
</form>

<style>
    .error-message {
        color: var(--error)
    }

    a {
        display: inline-block;
    }
</style>