<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/earlybird.webp';
	import welcome_fallback from '$lib/images/earlybird.png';

	// async function load() {
	// 	const res = await fetch('http://localhost:3000/api/signup', {
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 			email: 'abc123@xyz.com',
	// 			passwordHash: 'adad',
	// 			name: 'blahblah'
	// 		})
	// 	})
	// 	const data = await res.json();
	// 	console.log(data)
	// }

</script>

<svelte:head>
	<title>Earlybird</title>
	<meta name="description" content="Earlybird HackSC" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Earlybird" />
			</picture>
		</span>
	</h1>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		/* margin:0 auto; */
		width: 50%;
		height: 50%;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		display: block;
	}
</style>
