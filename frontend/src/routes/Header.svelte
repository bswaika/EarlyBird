<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/earlybird.webp';
</script>

<header>
	<nav>
		<ul>
			<div class="corner">
				<a href="/">
					<img src={github} alt="Github Link" />
				</a>
			</div>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/login') ? 'page' : undefined}>
				<a href="/login">Login</a>
			</li>
		</ul>
	</nav>

</header>

<style>
	header {
		display: flex;
		justify-content: none;
	}

	.corner {
		width: 5em;
		height: 5em;
		float: left;
		align-items: left;
		justify-content: left;
	}

	.corner a {
		display: flex;
		align-items: left;
		justify-content: left;
		float: left;
		position:absolute;
    	left: 0;
	}

	.corner img {
		width: 9em;
		height: 9em;
		object-fit: contain;
		float: left;
		align-items: left;
		justify-content: left;
	}

	nav {
		display: flex;
		width: 100%;
		/* justify-content: right; */
		--background: rgba(120, 116, 116, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 5em;
		display: flex;
		justify-content: right;
		align-items: right;
		list-style: none;
		background: var(--background);
		width: 100%;
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
