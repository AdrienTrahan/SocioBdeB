<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { stream, error, status } from './stores.js';

	import jsQR from 'jsqr';

	import UserMedia from './use-usermedia.svelte';

	export let result = undefined;
	export let stopMediaStream = null;
	export let startMediaStream = null;
	export let useFlashLight = false;
	export let isTorchOn = false;
	const dispatch = createEventDispatcher();

	$: active = !result;

	let video: HTMLVideoElement = null;
	let canvas: HTMLCanvasElement = null;
	let useUserMedia;
	let mounted;

	onMount(() => {
		mounted = true;

		({ stopMediaStream, startMediaStream } = useUserMedia());

		return () => {
			stopMediaStream();
			video.srcObject = null;
		};
	});

	const startCapturing = (): void => {
		if (!canvas || !video) return;

		const context = canvas.getContext('2d');

		if (!context) return;

		const { width, height } = canvas;

		context.drawImage(video, 0, 0, width, height);

		const imageData = context.getImageData(0, 0, width, height);
		const qrCode = jsQR(imageData.data, width, height);

		if (qrCode === null) {
			setTimeout(startCapturing, 750);
		} else {
			result = qrCode.data;
			dispatch('successfulScan', qrCode.data);
			video.srcObject = null;
		}
	};

	const handleCanPlay = (): void => {
		if (canvas === null || canvas === null || video === null || video === null) {
			return;
		}

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		if ($error !== null) {
			// TODO: show dialog to user with an error
		} else {
			startCapturing();
		}
	};
	export function enableFlash() {  
		let track = $stream.getVideoTracks()[0];
		track.applyConstraints({ advanced: [{torch: true}]});
		isTorchOn = true;
	}
	export function disableFlash() {  
		let track = $stream.getVideoTracks()[0];
		track.applyConstraints({ advanced: [{torch: false}]});
		isTorchOn = false;
	}
	$: if ($status === 'resolved' && video !== null && $stream) {

		let track = $stream.getVideoTracks()[0];
		video.addEventListener('loadedmetadata', (e) => {
			if (track.getCapabilities().torch){
				useFlashLight = true;
			}else{
				useFlashLight = false;
			}
		});

		video.srcObject = $stream;

		
		video.play().catch(console.error);
	}

	$: if (active && $status === 'stopped' && startMediaStream) {
		startMediaStream();
	}
</script>

<UserMedia bind:useUserMedia />

<div class="scannerContainer">
	<div class="scanner__aspect-ratio-container">
		<canvas bind:this={canvas} class="scanner__canvas" />
		<!-- svelte-ignore a11y-media-has-caption -->
		<video playsInline bind:this={video} on:canplay={handleCanPlay} class="scanner__video">
			<!-- <track kind="captions" /> -->
		</video>
	</div>
</div>
<button on:click={() => {
	let track = $stream.getVideoTracks()[0];
	track.applyConstraints({ advanced: [{torch: true}]});
}}></button>


<style>
	.scannerContainer {
		width: 100%;
		max-width: 400px;
		overflow: hidden;
		border-radius: 5px;
	}

	.scanner__aspect-ratio-container {
		position: relative;
		overflow: hidden;
		padding-bottom: 100%;
		border-radius: 0px;
	}

	.scanner__video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		outline: none;
		object-fit: cover;
	}
	.scanner__canvas {
		display: none;
	}
</style>
