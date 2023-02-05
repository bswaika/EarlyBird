<script>
	import {page} from "$app/stores";

    console.log($page.params.slug);

	async function getCompany() {
		const res = await fetch(`http://localhost:3000/api/company/${$page.params.slug}`);

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
	let company = getCompany();
</script>

<svelte:head>
	<title>Earlybird</title>
	<meta name="description" content="Earlybird HackSC" />
</svelte:head>

<section>
	{#await company then company}
		<h1>{company.name}</h1>
		<ul>
			{#each company.activities as { _id, name, company, description, points, deadline, type }, i}
				<li>
					<a href="/activity/{_id}">
						{name}
					</a>
					<p>{description}</p>
					<p>{points}</p>
					<p>{deadline}</p>
					<p>{type}</p>
				</li>
			{/each}
		</ul>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}

</section>
