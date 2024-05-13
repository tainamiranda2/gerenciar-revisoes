<template>
    <nav class="bg-dark text-white p-4">
      <RouterLink class="router-links" to="/" >
        Voltar
      </RouterLink>
     
      <RouterLink class="router-links" to="/CadastrarRevisao">Cadastrar veiculo</RouterLink>
      <RouterLink class="router-links" to="/Revisao">Todos os veiculos</RouterLink>
    </nav>
  
    <h1>Todos os veiculo cadastrados</h1>
    <template v-if="revisao.length > 0" >
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Veiculo</th>
          <th scope="col">Tipo de serviço</th>
          <th scope="col">Quilometragem</th>
          <th scope="col">Detalhes</th>
          <th scope="col">Apagar</th> 
          <th scope="col">Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rev in revisaoPaginados" :key="rev.id" >
          <td>{{ rev.veiculo_id }}</td> <!-- Alteração aqui -->
          <td>{{ rev.type_servicos }}</td>
          <td>{{ rev.quilometragem }}</td>
          <td>{{ rev.detalhes }}</td>
          <td>
            <button class="btn btn-danger" @click="deleteRevisao(rev.id)">Apagar</button>
          </td>
          <td>
            <RouterLink class="btn btn-primary" :to="{ name: 'EditarRevisao', params: { id: rev.id } }">Editar</RouterLink>
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
    <p>Não há nehuma revisão cadastrados.</p>
  </template>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  export default {
    
    name: 'Revisao',
    data() {
      return {
        revisao: [],
        currentPage: 1,
      itemsPerPage: 5
      }
    },
    computed: {
    totalPages() {
      return Math.ceil(this.revisao.length / this.itemsPerPage);
    },
    revisaoPaginados() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.revisao.slice(startIndex, endIndex);
    }
  },
    created() {
      this.fetchRevisao();
    },
    methods: {
      fetchRevisao() {
        axios.get('https://2c6f-45-227-44-251.ngrok-free.app/api/revisao',{
                headers: {
    'ngrok-skip-browser-warning': 'true'
                }
  })
          .then(res => {
            this.revisao = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      deleteRevisao(id) {
        axios.delete(`https://2c6f-45-227-44-251.ngrok-free.app/api/revisao/${id}` ,{
                headers: {
    'ngrok-skip-browser-warning': 'true'
                }
      })
          .then(res => {
            this.fetchRevisao(); 
          })
          .catch(err => {
            console.log(err);
          });
      },
      getVeiculoPlaca(veiculoId) {

        axios.get(`https://2c6f-45-227-44-251.ngrok-free.app//api/veiculo/${veiculoId}`,{
                headers: {
        'ngrok-skip-browser-warning': 'true'
                    }
      })
          .then(res => {
            return res.data.placa; // Retornar a placa do veículo
         console.log(res)
        })
          .catch(err => {
            console.log(err);
            return ''; // Retornar vazio em caso de erro
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
  