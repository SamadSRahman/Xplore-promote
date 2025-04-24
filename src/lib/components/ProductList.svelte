<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { APP_CTX, type AppContext } from "../ctx/appContext";
  import { AddLeafCommand } from "../data/commands/addLeaf";
  import { findLeaf } from "../utils/tree";
  import Text from "./controls/Text.svelte";
  let sentinel: HTMLDivElement;

  let limit = 10;
  let offset = 0;
  let total = 0;

  let loading = false;
  let token = localStorage.getItem("accesstoken");
  $: products = [];
  $: searchText = ""; 

  type Product = {
    id: string;
    name: string;
    price: number;
    images: Array<{
      url: string;
    }>;
    ProductVariants: { price: number }[];
  };

  async function loadProducts(query: string = "") {
    if (loading) return;
    loading = true;
    try {
      const res = await fetch(
        `https://xplr.live/api/v1/product?limit=${limit}${query ? `&search=${query}` : `&offset=${offset}`}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await res.json();
      total = json.data.total;
      products = [...products, ...json.data.products];
      offset += limit;
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      loading = false;
    }
  }

  async function searchProducts(query: string) {
    offset = 0;
    products = [];
    await loadProducts(query);
  }

  onMount(() => {
    loadProducts();
    const sentinel = document.querySelector("#sentinel");
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && products.length < total) {
        loadProducts();
      }
    });
    observer.observe(sentinel);
  });

  // Access the shared app context
  const { state, dispatch , rendererApi} = getContext<AppContext>(APP_CTX);
    const { tree, selectedLeaf } = state;
  /** Create and add a new product card leaf */


  function handleOnClick(product: Product){
    console.log("product:", product);
    const newChild = state.getChild("_new_template_product_card", true);
    console.log("newChild", newChild);
    
    if (!newChild) return;
    
  }
  function addProductLeaf(product: Product) {
    const newChild = state.getChild("_new_template_product_card", true);
    console.log("newChild", newChild);
    if (!newChild) return;

    // Populate the JSON props for the new leaf
    newChild.props.json = {
      type: "_template_product_card",
      product_name: product.name,
      product_price: product.ProductVariants[0].price,
      product_image: product.images[0].url,
      product_id: product.id,
    };

    // Push the AddLeaf command to update the tree
    state.pushCommand(
      new AddLeafCommand({
        parentId: $tree.id,
        insertIndex: $tree.childs.length,
        leaf: newChild,
      })
    );

    // Optionally focus the newly added leaf
    console.log("newChild", newChild);

    $selectedLeaf = findLeaf($tree, newChild.id) || null;

    rendererApi().focus();
  }

  /** Drag start: attach product data to the dataTransfer */
  function handleDragStart(event: DragEvent, product: Product) {
    event.dataTransfer?.setData(
      "application/divnode",
      "_new:_template_product_card"
    );
    event.dataTransfer?.setData(
      "text/plain",
      JSON.stringify({
        name: product.name,
        price: product.ProductVariants[0].price,
        image: product.images[0].url,
        id: product.id,
      })
    );
  }

  /** Drag over: allow drop */
  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }
</script>

<div class="grid">
  <div class="search-wrapper">
    <Text
      placeholder="Search products"
      value={searchText}
      on:change={(e) => {
        searchText = e.detail.value;
        searchProducts(e.detail.value);
      }}
    />
  </div>

  {#each products as product}
  <div
    class="card"
    draggable="true"
    role="button"
    on:dragstart={(e) => handleDragStart(e, product)}
  >
      <img src={product.images[0]?.url} alt={product.name} />
      <div class="card-body">
        <strong class="card-title">{product.name}</strong>
        <p class="card-price">${product.ProductVariants[0].price}</p>
      </div>
    </div>
  {/each}
</div>

<div id="sentinel"></div>

{#if loading}
  <div class="loading">Loading more products...</div>
{/if}

<style>
  .search-wrapper {
    width: 80%;
    margin: auto;
    /* margin-top: 1rem; */
    margin-bottom: 1rem;
  }
  .grid {
    /* display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    padding: 1rem; */
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 0.5rem;
  }
  .card {
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 43%;
    padding: 0.5rem;
    cursor: grab;
  }
  .card:active {
    cursor: grabbing;
  }
  .card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 0.4rem;
  }
  .card-body {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .card-title {
    font-size: 0.8rem;
    margin: 0 0 0.4rem;
  }
  .card-price {
    font-weight: bold;
    color: #a3a3a3;
    margin-top: auto;
    font-size: 0.75rem;
  }
  .loading {
    text-align: center;
    padding: 1rem;
    color: #4a5568;
  }
</style>
