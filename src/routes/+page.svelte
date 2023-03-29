<script lang="ts">
    import Scanner from "../lib/scanner/Scanner.svelte";
    let result;
    $: console.log(result)
</script>
<Scanner bind:result></Scanner>
{result}