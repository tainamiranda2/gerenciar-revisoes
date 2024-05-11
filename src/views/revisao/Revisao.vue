<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <RouterLink class="" to="/" >
        Voltar
      </RouterLink>
     
      <RouterLink to="/CadastrarRevisao">Cadastrar veiculo</RouterLink>
      <RouterLink to="/revisao">Todos os veiculos</RouterLink>
    </nav>
  
    <h1>Todos os veiculo cadastrados</h1>
    <table class="table table-striped-columns">
      <thead>
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
        <tr v-for="rev in revisao" :key="rev.id" >
          <td>{{ rev.veiculo_id }}</td> <!-- Alteração aqui -->
          <td>{{ rev.type_servicos }}</td>
          <td>{{ rev.quilometragem }}</td>
          <td>{{ rev.detalhes }}</td>
          <td>
            <button @click="deleteRevisao(rev.id)">Apagar</button>
          </td>
          <td>
            <RouterLink :to="{ name: 'EditarRevisao', params: { id: rev.id } }">Editar</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  export default {
    
    name: 'Revisao',
    data() {
      return {
        revisao: []
      }
    },
    created() {
      this.fetchRevisao();
    },
    methods: {
      fetchRevisao() {
        axios.get('http://127.0.0.1:8000/api/revisao')
          .then(res => {
            this.revisao = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      deleteRevisao(id) {
        axios.delete(`http://127.0.0.1:8000/api/revisao/${id}`)
          .then(res => {
            this.fetchRevisao(); 
          })
          .catch(err => {
            console.log(err);
          });
      },
      getVeiculoPlaca(veiculoId) {

        axios.get(`http://127.0.0.1:8000/api/veiculo/${veiculoId}`)
          .then(res => {
            return res.data.placa; // Retornar a placa do veículo
         console.log(res)
        })
          .catch(err => {
            console.log(err);
            return ''; // Retornar vazio em caso de erro
          });
      }
    }
  }
  </script>
  