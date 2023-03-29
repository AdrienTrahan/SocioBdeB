<script lang="ts">
    import Scanner from "../lib/scanner/Scanner.svelte";
    import { goto } from "$app/navigation";
    import {authStore, logout} from "../lib/checker/firebase";
    import { browser } from '$app/environment'; 
    let result;
    let scanner;
    let useFlashLight;
    $:{

    }
    authStore.subscribe((value) => {
        if (!value.isLoggedIn && browser && value.firebaseControlled){
            goto("./auth")
        }
    })
</script>

{#if $authStore.isLoggedIn}
    <div class="viewContainer">

        <div class="scannerContainer">
            <Scanner bind:result bind:this={scanner} bind:useFlashLight></Scanner>
        </div>
        {#if (useFlashLight)}
            <button on:click={scanner.isTorchOn ? scanner.disableFlash : scanner.enableFlash}>{scanner.isTorchOn ? "off" : "on"}</button>
        {/if}
        {result}
        <button class="logout" on:click={logout}>log out</button>
    </div>
{/if}

<style>
    .viewContainer{
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: black;
        width: 100%;
        height: 100%;
        color: white;
    }
    .scannerContainer{
        display: flex;
        justify-content: center;
    }
    .logout{
        color: white;
        border: none;
        background-color: crimson;
        z-index: 1000;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
    }
    .logout:hover{
        filter: brightness(0.9);
    }
    .logout:active{
        filter: brightness(0.7);
    }
</style>