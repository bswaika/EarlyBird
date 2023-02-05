<script>
	import {page} from "$app/stores";

    console.log($page.params.slug);

	async function getActivity() {
		const res = await fetch(`http://localhost:3000/api/activity/${$page.params.slug}`);

		if (res.ok) {
			let a = await res.json();
			console.log(a);
			return a;
		} else {
			throw new Error(await res.json());
		}
	}

	/**
	 * @type any
	 */
	let activity = getActivity();
</script>

<svelte:head>
	<title>Earlybird</title>
	<meta name="description" content="Earlybird HackSC" />
</svelte:head>

<section>
	{#await activity then activity}
		<h1>{activity.name}</h1>
        <h2>{activity.description}</h2>
        <p>{activity.points}</p>
        <p>{activity.deadline}</p>
        <p>{activity.type}</p>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}

</section>
