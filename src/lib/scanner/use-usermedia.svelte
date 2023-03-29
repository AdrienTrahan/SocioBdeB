<script lang="ts">
	import { onMount } from 'svelte';
	import { stream, error, status } from './stores.js';

	let mounted;

	onMount(() => {
		mounted = true;

		return () => {
			console.log('stop Component destroyed');

			// stopMedia();
		};
	});

	const isMediaStream = (
		candidate: MediaStream | MediaSource | Blob | null
	): candidate is MediaStream => candidate !== null && 'getTracks' in candidate;

	type UseUserMediaStatusType = 'pending' | 'resolved' | 'rejected' | 'stopped';

	interface UseUserMediaType {
		stopMediaStream: () => void;
		startMediaStream: () => void;
	}

	function setStatus(params: string) {
		console.log(`Setting status ${params}`);

		$status = params as any;
	}

	export const useUserMedia = (): UseUserMediaType => {
		$stream = null as any;
		$error = null as any;
		$status = 'stopped' as any;

		function setError(params: string) {
			console.log('Setting erro');
			$error = params as any;
		}

		function setStream(params: MediaStream) {
			console.log(`Setting stream`, { params });
			$stream = params as any;
		}

		const startMediaStream = (): void => {
			setStatus('pending');

			navigator.mediaDevices
				.getUserMedia({
					audio: false,
					video: {
						facingMode: 'environment'
					}
				})
				.then((userStream) => {
					setStream(userStream);
					setStatus('resolved');
				})
				.catch((err) => {
					setError(err);
					setStatus('rejected');
				});
		};

		const stopMediaStream = stopMedia;
		return { stopMediaStream, startMediaStream };
	};

	function stopMedia(): void {
		console.log('stopping media stream');

		if (isMediaStream($stream)) {
			($stream as any).getTracks().forEach((track : any) => {
				track.stop();
				($stream as any).removeTrack(track);
			});

			console.log({ streams: $stream });

			setStatus('stopped');
		}
	}
</script>
