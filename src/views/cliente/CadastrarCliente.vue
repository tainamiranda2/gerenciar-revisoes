<template>
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <RouterLink class="" to="/" >
          Voltar
        </RouterLink>
        <RouterLink to="/Cliente">Todos os clientes</RouterLink>
      </nav>
    
      <h1>Cadastrar cliente</h1>
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input v-model="nome" type="text" class="form-control" id="nome" placeholder="Informe o nome do cliente">
      </div>
      <div class="mb-3">
        <label for="telefone" class="form-label">Telefone</label>
        <input v-model="telefone" type="text" class="form-control" id="telefone" placeholder="Informe o telefone do cliente">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="email" type="text" class="form-control" id="email" placeholder="Informe o email do cliente">
      </div>
      <div class="mb-3">
        <label for="endereco" class="form-label">Endereço</label>
        <input v-model="endereco" type="text" class="form-control" id="endereco" placeholder="Informe o endereço do cliente">
      </div>
      <div class="mb-3">
        <label for="sexo" class="form-label">Sexo</label>
        <select v-model="sexo" id="sexo" class="form-select">
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="data_nascimento" class="form-label">Data de Nascimento</label>
        <input v-model="data_nascimento" type="datetime-local" class="form-control" id="data_nascimento">
      </div>
    
      <button @click="register" class="btn btn-primary">Cadastrar</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { RouterLink } from 'vue-router';
  
  export default {
    name: 'CadastrarCliente',
    components: {
      RouterLink
    },
    data() {
      return {
        nome: '',
        telefone: '',
        email: '',
        endereco: '',
        sexo: 'M',
        data_nascimento: ''
      }
    },
    methods: {
      register() {
        axios.post('http://127.0.0.1:8000/api/cliente', {
          nome: this.nome,
          telefone: this.telefone,
          email: this.email,
          endereco: this.endereco,
          sexo: this.sexo,
          data_nascimento: this.data_nascimento,
        }).then(response => {
          console.log(response.data);
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }
  </script>
  