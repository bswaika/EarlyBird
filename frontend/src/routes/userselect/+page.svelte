
<script>
  	import { page } from '$app/stores';
</script>

<div class="Buttons">
  <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>  <a class="btn" href="/login">Users</a>
  </li>
  <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>    <a class="btn" href="/logincompanies">Companies</a>

</div>
<style>
	.Buttons {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.Buttons a {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		font-size: 2rem;
	}

	.Buttons a:hover {
		background-color: var(--color-bg-1);
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
</style>