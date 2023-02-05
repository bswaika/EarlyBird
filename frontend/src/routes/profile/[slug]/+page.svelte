<script>
	import {page} from "$app/stores";

    console.log($page.params.slug);

	async function getProfile() {
		const res = await fetch(`http://localhost:3000/api/user/${$page.params.slug}`);

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
	let profile = getProfile();
</script>

<svelte:head>
	<title>Earlybird</title>
	<meta name="description" content="Earlybird HackSC" />
</svelte:head>

<section>
	{#await profile then profile}
		<h1>{profile.name}</h1>
        <p>Email: {profile.email}</p>
        <p>Following</p>
		<ul>
			{#each profile.followingCompanies as { company }, i}
				<li>
					<p>{company}</p>
				</li>
			{/each}
		</ul>
        <p>Activities</p>
        <ul>
            {#each profile.activities as { activity, status }, i}
                <li>
                    <p>{activity.company}: {activity.name} ({activity.points} Points)</p>
                    <p>{activity.description}</p>
                    <p>This must be completed by {activity.deadline}</p>
                    <p>{status}</p>
                </li>
            {/each}
        </ul>
        <p>Reward Points: {profile.rewardPoints}</p>
        <p>Loyalties</p>
        <ul>
            {#each profile.loyalties as { loyalty }, i}
                <li>
                    <p>{loyalty.name}</p>
                </li>
            {/each}
        </ul>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}

</section>
