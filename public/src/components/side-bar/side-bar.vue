<template>
  <header>
    <nav>
      <h1 class="admin___heading text-4xl font-semibold uppercase hover:text-gray-300">Reduce</h1>

       <div class="p-6">
            <button class="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i class="fa fa-plus mr-3"></i> Create New Link
            </button>
        </div>

      <router-link to="/overview"
        ><li>
          <i class="fa fa-tachometer px-2" aria-hidden="true"></i> Dashboard
        </li></router-link
      >
      <router-link to="/links"
        ><li>
          <i class="fa fa-link px-2" aria-hidden="true"></i> Links
        </li></router-link
      >
      <router-link to="/manage"
        ><li>
          <i class="fa fa-align-left px-2" aria-hidden="true"></i> Manage
        </li></router-link
      >
      <router-link to="/personal"
        ><li>
          <i class="fa fa-user px-2" aria-hidden="true"></i> Personal
        </li></router-link
      >
    </nav>


    <div class="premium____section">
      <h2 class="pt-12"> <i class="fa fa-hand-o-right px-2" aria-hidden="true"></i> Upgrade to Pro!</h2>
    </div>
  </header>
</template>

<script>
export default {
  name: "Side-Bar",
};
</script>

<style scoped>

.admin___heading {
  padding: 20px 30px;
  color: white;
  font-weight: bold;
  font-size: 25px;
}
.premium____section h2{
  padding: 15px 20px;
  color: white;
  font-weight: bold;
  font-size: 17px;
  background-color: #1947ee;
}
.premium____section{
  margin-top: 4.9rem;
}
.cta-btn { color: #3d68ff; }
nav {
  padding: 7px 0;
}

li {
  padding: 0px 30px;
  list-style-type: none;
}

a {
  padding: 25px 0px;
  display: block;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

a:hover {
  background-color: #1947ee;
}
</style>
