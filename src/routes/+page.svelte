<script lang="ts">
    import Scanner from "../lib/scanner/Scanner.svelte";
    let result;
    let scanner;
    let useFlashLight;
    $: console.log(result)
</script>
<Scanner bind:result bind:this={scanner} bind:useFlashLight></Scanner>
{#if (useFlashLight)}
    <button on:click={scanner.isTorchOn ? scanner.disableFlash : scanner.enableFlash}>{scanner.isTorchOn ? "off" : "on"}</button>
{/if}
{result}