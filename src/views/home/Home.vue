
import { RouterLink } from 'vue-router';
<template>
    <nav class="bg-dark text-white p-4">
        <div class="container-fluid">
        <RouterLink  class="router-links" to="/DashbordRevisao">Gerenciar revisões </RouterLink>
        <RouterLink class="router-links" to="/DashbordCliente">Gerenciar cliente </RouterLink>
        <RouterLink class="router-links" to="/DashbordVeiculo">Gerenciar veiculo </RouterLink>
      </div>
    </nav>
    <h1>Gerênciar todo o fluxo de revisões de veiculos</h1>
    <img src="../../img/car.png"/>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style>
img{
    width: 50%;
}
</style>