<template>
  <div>
    <nav class="bg-dark text-white p-4">
      <RouterLink class="router-links" to="/" >
        Voltar
      </RouterLink>
      <RouterLink class="router-links" to="/CadastrarCliente">Cadastrar cliente</RouterLink>
      <RouterLink class="router-links" to="/Cliente">Todos os clientes</RouterLink>
      <RouterLink class="router-links" to="/DashbordCliente">Dashbord clientes</RouterLink>
    </nav>
  
    <p>Todos os clientes cadastrados</p>
    <template v-if="clientes.length > 0" >

    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">Telefone</th>
          <th scope="col">Endereço</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cli in clientesPaginados" :key="cli.id">
          <td>{{ cli.nome }}</td>
          <td>{{ cli.email }}</td>
          <td>{{ cli.telefone }}</td>
          <td>{{ cli.endereco }}</td>
          <td>
            <button class="btn btn-danger" @click="deleteCliente(cli.id)">Apagar</button>
            <RouterLink :to="{ name: 'EditarCliente', params: { id: cli.id } }" class="btn btn-primary">Editar</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
    
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <button class="page-link" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        </li>
        <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ 'active': currentPage === pageNumber }">
          <button class="page-link" @click="changePage(pageNumber)">{{ pageNumber }}</button>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
        </li>
      </ul>
    </nav>
 
 </template>
 <template v-else>
  <p>Não há clientes cadastrados.</p>
</template>
  </div>

</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
  name: 'Cliente',
  components: {
    RouterLink
  },
  data() {
    return {
      clientes: [],
      currentPage: 1,
      itemsPerPage: 5
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.clientes.length / this.itemsPerPage);
    },
    clientesPaginados() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.clientes.slice(startIndex, endIndex);
    }
  },
  created() {
    this.fetchClientes();
  },
  methods: {
    fetchClientes() {
      axios.get('http://127.0.0.1:8000/api/cliente')
        .then(res => {
          this.clientes = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCliente(id) {
      axios.delete(`http://127.0.0.1:8000/api/cliente/${id}`)
        .then(res => {
          this.fetchClientes(); 
        })
        .catch(err => {
          console.log(err);
        });
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  }
}
</script>
