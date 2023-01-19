<script>
  import contacts from "./../data/contact.json";
  // import { getAlbums } from "../utils/getAlbums";

  // const albums = await getAlbums()
  let isOpen = false;
</script>

<nav
  class="w-full bg-gray-50 shadow-lg top-0 z-50 px-4 md:px-8 sticky md:flex md:justify-between md:items-center"
>
  <div class="flex items-center z-40 justify-between">
    <a id="logo" href="/" class="flex items-center gap-2 py-4">
      <img class="h-12" src="/favicon.png" alt="logo" />
      Riley Paul
    </a>
    <button
      id="nav-toggle-button"
      class="h-12 focus:outline-none flex items-center justify-center md:hidden"
      on:click={() => (isOpen = !isOpen)}
    >
      <i class="fa-solid text-lg px-4 {isOpen ? 'fa-x' : 'fa-bars'}" />
    </button>
  </div>

  <ul
    id="header-links"
    class="flex-col gap-4 py-4 md:flex md:flex-row items-center text-gray-600 {isOpen
      ? 'flex'
      : 'hidden'}"
  >
    <li class="link-container"><a href="/portfolio/">Portfolio</a></li>
    <li class="link-container"><a href="/about/">About</a></li>
    <div id="social" class="flex gap-4">
      {#each contacts as c (c.name)}
        <li class="link-container">
          <a href={c.link} target="_blank" rel="noopener noreferrer">
            <i class={c.icon} />
          </a>
        </li>
      {/each}
    </div>
  </ul>

  <!-- <span id="page-title">{title}</span> -->
</nav>

<svelte:window
  on:keydown={(e) => {
    console.log("key = ", e.key);
    if (e.key == "Escape") {
      isOpen = false;
    }
  }}
/>
