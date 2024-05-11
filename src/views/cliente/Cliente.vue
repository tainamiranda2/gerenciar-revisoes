<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <RouterLink class="" to="/" >
        Voltar
      </RouterLink>
     
      <RouterLink to="/CadastrarCliente">Cadastrar cliente</RouterLink>
      <RouterLink to="/Cliente">Todos os clientes</RouterLink>
    </nav>
  
    <p>Todos os clientes cadastrados</p>
    <table class="table table-striped-columns">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">Telefone</th>
          <th scope="col">Endereço</th>
          <th scope="col">Apagar</th> 
          <th scope="col">Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cli in cliente" :key="cli.id" >
          <td>{{ cli.nome }}</td>
          <td>{{ cli.email }}</td>
          <td>{{ cli.telefone }}</td>
          <td>{{ cli.endereco }}</td>
          <td>
            <button @click="deleteCliente(cli.id)">Apagar</button>
          </td>
          <td>
            <RouterLink :to="{ name: 'EditarCliente', params: { id: cli.id } }">Editar</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
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
        cliente: []
      }
    },
    created() {
      this.fetchClientes();
    },
    methods: {
      fetchClientes() {
        axios.get('http://127.0.0.1:8000/api/cliente')
          .then(res => {
            this.cliente = res.data;
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
      }
    }
  }
  </script>
  