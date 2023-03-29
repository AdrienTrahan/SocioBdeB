<script>
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { authStore, login } from "../../lib/checker/firebase";

    export let email = "";
    export let password = "";
    let error = "";
    authStore.subscribe((value) => {
        if (value.isLoggedIn && browser && value.firebaseControlled){
            goto("./")
        }
    })
</script>
<input type="text" placeholder="email" bind:value={email}>
<input type="password" placeholder="password" bind:value={password}>
<button on:click={async () => {error = (await login(email, password)).split("Firebase: ")[1]}}>log in</button>
<p class="error">{error}</p>
<style>
    .error{
        color: red;
    }
</style>