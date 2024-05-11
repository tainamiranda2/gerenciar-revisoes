
import { RouterLink } from 'vue-router';
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
        <RouterLink  class="" to="/revisao">Gerenciar revisões </RouterLink>
        <RouterLink to="/cliente">Gerenciar cliente </RouterLink>
        <RouterLink to="/veiculo">Gerenciar veiculo </RouterLink>
      </div>
    </nav>
    <p>Gerencie todo o fluxo de revisões de veiculo</p>
</template>

<script>
export default {
    name: 'Home'
}
</script>