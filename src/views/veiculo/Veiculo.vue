<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <RouterLink class="" to="/" >
          Voltar
        </RouterLink>
       
        <RouterLink to="/CadastrarVeiculo">Cadastrar veiculo</RouterLink>
        <RouterLink to="/Cliente">Todos os veiculos</RouterLink>
      </nav>
    
        <h1>Todos os veiculo cadastrados</h1>
        <table class="table table-striped-columns">
            <thead>
              <tr>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Cor</th>
                <th scope="col">Placa</th>
                <th scope="col">Apagar</th> 
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vei in veiculo" :key="vei.id" >
                <td>{{ vei.marca }}</td>
                <td>{{ vei.modelo }}</td>
                <td>{{ vei.cor }}</td>
                <td>{{ vei.placa }}</td>
                <td>
                  <button @click="deleteVeiculo(vei.id)">Apagar</button>
                </td>
                <td>
                  <RouterLink :to="{ name: 'EditarVeiculo', params: { id: vei.id } }">Editar</RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
    
    </template>

    <script>
      import axios from 'axios';

    export default {
        name: 'Veiculo',
        data() {
      return {
        veiculo: []
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
      }
    }
    }
    </script>
