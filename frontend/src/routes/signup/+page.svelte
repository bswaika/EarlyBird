<script>
	import { json } from "@sveltejs/kit";
    import {userId} from '$lib/stores.js'
    // import Switch from "svelte-switch";

    let checkedValue = true;

    /**
	 * @param {{ detail: { checked: any; }; }} e
	 */
    function handleChange(e) {
        const { checked } = e.detail;
        checkedValue = checked;
    }

    let _name = '';
    let _pwd = '';
    let _email = '';
    let getResult = async () => {
        let result = await fetch(`http://localhost:3000/api/${current === "Users" ? "signup" : "signupCompany"}`, {
            method: 'POST',
            body: JSON.stringify({
                name: _name,
                email: _email,
                passwordHash: _pwd
            })
        });
        let data = await result.json()
        console.log(data)
        userId.set(data.id);
    }

    let current = "Users";

</script>

<style>
    .toggle {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border: 1px solid black;
        border-radius: 5px;
        padding: 2px;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }
    .toggle>div{
        border-radius: 5px;
        text-align: center;
        display: inline-block;
        width: 40%;
        padding: 5px;
        background-color: none;
    }
	.selected {
		background-color: #440000;
		color: white;
	}

</style>


<svelte:head>
	<title>Sign Up</title>
	<meta name="description" content="About this app" />
</svelte:head>

<!-- <h1>Simple usage</h1>
Switch with default style
<Switch on:change={handleChange} checked={checkedValue} />
<br />
The switch is {checkedValue ? 'on' : 'off'}. -->

<div class="toggle">
    <div class:selected="{current === 'Users'}" on:click={() => current = "Users"}>Users</div>
    <div class:selected="{current === 'Companies'}" on:click={() => current = "Companies"}>Companies</div>
</div>

<div class="text-column">
    <form action="http://localhost:3000/api/{current === "Users" ? "signup" : "signupCompany"}" method="POST">
        <p>Sign Up</p>
        <p>Name</p>
        <input name="name" bind:value={_name}>
        <p>Email</p>
        <input name="email" bind:value={_email}>
        <p>Password</p>
        <input name="passwordHash" bind:value={_pwd}>   
        <input type="submit" on:click={getResult}>
    </form>
</div>
