<script>
	import { json } from "@sveltejs/kit";


    let _name = 'world';
    let _pwd = ""
    let _email = "";
    //  function load() {
    //     return {
    //         post: {
    //             title: `Title for ${params.slug} goes here`,
    //             content: `Content for ${params.slug} goes here`
    //         }
    //     };
    // }
    let getResult = async () => {
        let result = await fetch('http://localhost:3001/api/signup', {
            method: 'POST',
            body: JSON.stringify({
                name: _name,
                email: _email,
                passwordHash: _pwd
            })
        });
        let data = await result.json()
        console.log(data)
    }
</script>
<svelte:head>
	<title>Login</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
    <form action="localhost:3001/api/signup" method="POST">
        <input name="name" bind:value={_name}>   
        <input name="email" bind:value={_email}>   
        <input name="passwordHash" bind:value={_pwd}>   
        <input type="submit" on:click={getResult}>
    </form>
    <!-- <input bind:value={name}>    -->
    <h1>Hello {name}!</h1>
</div>
