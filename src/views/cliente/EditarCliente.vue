<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <RouterLink class="" to="/" >
          Voltar
        </RouterLink>
       
        <RouterLink to="/CadastrarCliente">Cadastrar cliente</RouterLink>
        <RouterLink to="/Cliente">Todos os clientes</RouterLink>
      </nav>
    <div>
     
  
      <h1>Editar Cliente</h1>
  
      <form @submit.prevent="editarCliente">
        <div class="mb-3">
          <label for="nome" class="form-label">Nome</label>
          <input v-model="cliente.nome" type="text" class="form-control" id="nome" name="nome" placeholder="Informe o nome do cliente">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="cliente.email" type="text" class="form-control" id="email" name="email" placeholder="Informe o email do cliente">
        </div>
        <div class="mb-3">
          <label for="endereco" class="form-label">Endereço</label>
          <input v-model="cliente.endereco" type="text" class="form-control" id="endereco" name="endereco" placeholder="Informe o endereço do cliente">
        </div>
        <div class="mb-3">
          <label for="sexo" class="form-label">Sexo</label>
          <select v-model="cliente.sexo" id="sexo" class="form-select">
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="data_nascimento" class="form-label">Data de Nascimento</label>
          <input type="datetime-local" class="form-control" id="data_nascimento" name="data_nascimento">

        </div>
        
        <button type="submit" class="btn btn-primary">Salvar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditarCliente',
    data() {
      return {
        cliente: {
          nome: '',
          email: '',
          endereco: '',
          sexo: '',
        //  data_nascimento: ''
        }
      }
    },
    created() {
      const idCliente = this.$route.params.id;
      axios.get(`http://127.0.0.1:8000/api/cliente/${idCliente}`).then(res => {
        this.cliente = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      editarCliente() {
        const idCliente = this.$route.params.id;
        axios.patch(`http://127.0.0.1:8000/api/cliente/${idCliente}`, this.cliente).then(res => {
          // Lógica de redirecionamento após edição bem-sucedida, se necessário
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }
  </script>
  