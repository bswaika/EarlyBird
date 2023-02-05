<script>
	import { json } from "@sveltejs/kit";
    // import Switch from "svelte-switch";

    let checkedValue = true;

    /**
	 * @param {{ detail: { checked: any; }; }} e
	 */
    function handleChange(e) {
    const { checked } = e.detail;
    checkedValue = checked;
    }

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

    function toggle(){
        // console.log(e.target.classList)
        // if(e.target.classList.("active")){
        //     e.target.classList.remove("active");
        // }else{
        //     e.target.classList.add("active");
        // }
    }

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
    .toggle>.companies{
        margin-right: 0;
        margin-left: 15%;
    }
    .toggle>.active.users{
        background-color: #440000;
        color: white;
    }
    .toggle>.active.companies{
        background-color: #000044;
        color: white;
    }

</style>


<svelte:head>
	<title>Login</title>
	<meta name="description" content="About this app" />
</svelte:head>

<!-- <h1>Simple usage</h1>
Switch with default style
<Switch on:change={handleChange} checked={checkedValue} />
<br />
The switch is {checkedValue ? 'on' : 'off'}. -->

<div class="toggle">
    <div class="active users" on:click={toggle}>Users</div>
    <div class="companies" on:click={toggle}>Companies</div>
</div>

<div class="text-column">
    <form action="localhost:3001/api/signup" method="POST">
        <input name="name" bind:value={_name}>   
        <input name="email" bind:value={_email}>   
        <input name="passwordHash" bind:value={_pwd}>   
        <input type="submit" on:click={getResult}>
    </form>
    <!-- <input bind:value={name}>    -->
    <h1>Hello {_name}!</h1>
</div>
