<script lang='ts'>
    export let data;
    import { _ } from 'svelte-i18n';
    $: email = data.email
</script>

{#if !email}
<h1>{$_('login')}</h1>
<form method='POST' action='?/login'>
    {$_('email')}: <input name='email'>
    {$_('password')}: <input type='password' name='password'/>
    <input type='submit' value={$_('logIn')}>
    <a href='https://www.gaois.ie/identity/ga/logainm-phono/'>
        {$_('forgottenPassword')}
    </a>
</form>

{:else}
<h2>{$_('loggedInAs')}: {email}</h2>

<form method='POST' action='?/logout'>
    <input type='submit' value={$_('logOut')}>
</form>
{/if}
