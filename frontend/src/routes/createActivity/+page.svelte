<script>
	import { json } from "@sveltejs/kit";
    import {userId} from '$lib/stores.js'


    let _type = '';
    let _name = '';
    let _description = '';
    let _points = 0;
    let _deadline = '';
    let _form_id = '';

    let getResult = async () => {
        let result = await fetch(`http://localhost:3000/api/company/${userId}/activity`, {
            method: 'POST',
            body: JSON.stringify({
                name: _name,
                type: _type,
                description: _description,
                points: _points,
                deadline: _deadline,
                form_id: _form_id
            })
        });
        let data = await result.json()
        console.log(data)
    }
</script>
<svelte:head>
	<title>Create an Activity</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
    <form action="localhost:3000/api/company/{userId}/activity" method="POST">
        <p>How would you like users to refer to this activity? Hint: think of something catchy</p>
        <input name="name" bind:value={_name}>   
        <p>What type of activity is this? Some good ideas would be (1) filling out a Typeform (2) testing out some product</p>
        <input name="type" bind:value={_type}>   
        <p>What do you want users to do?</p>
        <input name="description" bind:value={_description}>   
        <p>How many points should users who complete this receive?</p>
        <input name="points" bind:value={_points}>   
        <p>When do you want this activity's eligibility to end?</p>
        <input name="deadline" bind:value={_deadline}>  
        <p>If this is a Typeform, what's the form's id?</p> 
        <input name="form_id" bind:value={_form_id}>   
        <input type="submit" on:click={getResult}>
    </form>
</div>