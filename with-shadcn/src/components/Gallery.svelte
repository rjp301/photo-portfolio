<script>
  export let images = [];
  export let name = "";

  let modalOpen = false;
  let modalIndex = 0;

  function openImage(index) {
    modalOpen = true;
    modalIndex = index;
  }

  function closeModal() {
    modalOpen = false;
  }

  function moveRight() {
    modalIndex += 1;
    if (modalIndex > images.length - 1) modalIndex = 0;
  }

  function moveLeft() {
    modalIndex -= 1;
    if (modalIndex < 0) modalIndex = images.length - 1;
  }
</script>

<div id="gallery" class="flex flex-col gap-4">
  {#each images as image, i}
    <button on:click={() => openImage(i)}>
      <img class="" src={image} alt={name} />
    </button>
  {/each}
</div>

{#if modalOpen}
  <button
    id="lightbox"
    class="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-600/90 flex items-center justify-center"
    on:click|stopPropagation={closeModal}
    on:keypress={(e) => {
      if (e.key == "Enter") {
        closeModal();
      }
    }}
  >
    <img
      class="object-contain h-full w-auto"
      src={images[modalIndex]}
      alt={name}
      on:click|stopPropagation|preventDefault
      on:keypress|stopPropagation|preventDefault
    />

    <button
      id="move-right"
      class="fixed right-0 sm:bg-slate-50/30 text-slate-50 h-full sm:h-1/3 sm:w-16 w-32"
      on:click|stopPropagation={moveRight}
    >
      <i class="fa-solid fa-chevron-right text-lg hidden sm:block" />
    </button>

    <button
      id="move-left"
      class="fixed left-0 sm:bg-slate-50/30 text-slate-50 h-full sm:h-1/3 sm:w-16 w-32"
      on:click|stopPropagation={moveLeft}
    >
      <i class="fa-solid fa-chevron-left text-lg hidden sm:block" />
    </button>

    <button
      id="close-modal"
      on:click|stopPropagation={closeModal}
      class="fixed top-0 right-0 "
    >
      <i class="fa-solid fa-x m-4 text-slate-50 text-lg" />
    </button>
  </button>
{/if}

<svelte:window
  on:keydown={(e) => {
    switch (e.key) {
      case "Escape":
        closeModal();
        break;

      case "ArrowRight":
        moveRight();
        break;

      case "ArrowLeft":
        moveLeft();
        break;
        
      default:
        console.log(e.key);
    }
  }}
/>
