<script lang="ts">
  import LanguageSensitiveLink from "./LanguageSensitiveLink.svelte"

    export let link: string;
</script>

<LanguageSensitiveLink {link} > 
    <div>
        <slot/>
    </div>
</LanguageSensitiveLink>

<style>
div {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
}
</style>