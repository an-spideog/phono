<script lang='ts'>
    export let data;
    $: email = data.email
</script>

{#if !email}
<h1>Login</h1>
<form method='POST' action='?/login'>
    Email: <input name='email'>
    Password: <input type='password' name='password'/>
    <input type='submit' value='Log in'>
</form>

{:else}
<h2>Currently logged in as: {email}</h2>

<form method='POST' action='?/logout'>
    <input type='submit' value='Log out'>
</form>
{/if}
