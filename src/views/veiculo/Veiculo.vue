
<template >
    <nav class="bg-dark text-white p-4">
        <RouterLink class="router-links" to="/" >
          Voltar
        </RouterLink>
       
        <RouterLink class="router-links" to="/CadastrarVeiculo">Cadastrar veiculo</RouterLink>
        <RouterLink class="router-links" to="/Veiculo">Todos os veiculos</RouterLink>
        <RouterLink class="router-links" to="/DashbordVeiculo">Dashbord veiculos</RouterLink>

      </nav>
    <template v-if="veiculo.length > 0" >
       
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Cor</th>
                <th scope="col">Placa</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vei in veiculoPaginados" :key="vei.id" >
                <td>{{ vei.marca }}</td>
                <td>{{ vei.modelo }}</td>
                <td>{{ vei.cor }}</td>
                <td>{{ vei.placa }}</td>
                <td>
                  <button class="btn btn-danger" @click="deleteVeiculo(vei.id)">Apagar</button>
               
                
                  <RouterLink class="btn btn-primary" :to="{ name: 'EditarVeiculo', params: { id: vei.id } }">Editar</RouterLink>
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
          <p>Não há veículos cadastrados.</p>
        </template>
        
        </template>

    <script>
      import axios from 'axios';

    export default {
        name: 'Veiculo',
        data() {
      return {
        veiculo: [],
      currentPage: 1,
      itemsPerPage: 5
      }
    },
    computed: {
    totalPages() {
      return Math.ceil(this.veiculo.length / this.itemsPerPage);
    },
    veiculoPaginados() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.veiculo.slice(startIndex, endIndex);
    }
  },
    created() {
      this.fetchVeiculos();
    },
    methods: {
      fetchVeiculos() {
        axios.get('http://127.0.0.1:8000/api/veiculo')
          .then(res => {
            this.veiculo = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      deleteVeiculo(id) {
       
        axios.delete(`http://127.0.0.1:8000/api/veiculo/${id}`)
          .then(res => {
            this.fetchVeiculos(); 
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
