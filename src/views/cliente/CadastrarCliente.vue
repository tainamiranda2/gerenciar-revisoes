<template>
    <div>
      <nav class="bg-dark text-white p-4">
        <RouterLink  class="router-links" to="/" >
      Voltar
        </RouterLink>
        <RouterLink class="router-links" to="/Cliente">Todos os clientes</RouterLink>
      </nav>
    
      <h1>Cadastrar cliente</h1>
      <form ref="formulario" @submit.prevent="register">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input v-model="nome" type="text" class="form-control" id="nome" placeholder="Informe o nome do cliente" required>
      </div>
      <div class="mb-3">
        <label for="telefone" class="form-label">Telefone</label>
        <input v-model="telefone" type="text" class="form-control" id="telefone" placeholder="Informe o telefone do cliente" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="email" type="text" class="form-control" id="email" placeholder="Informe o email do cliente" required>
      </div>
      <div class="mb-3">
        <label for="endereco" class="form-label">Endereço</label>
        <input v-model="endereco" type="text" class="form-control" id="endereco" placeholder="Informe o endereço do cliente" required>
      </div>
      <div class="mb-3">
        <label for="sexo" class="form-label">Sexo</label>
        <select v-model="sexo" id="sexo" class="form-select" required>
          <option value="1">M</option>
          <option value="0">F</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="data_nascimento" class="form-label">Data de Nascimento</label>
        <input v-model="data_nascimento" type="datetime-local" class="form-control" id="data_nascimento" required>
      </div>
    
      <button @click="register" class="btn btn-primary">Cadastrar</button>
    </form>
      <p v-if="confirmacao" class="text-success">Cliente cadastrado com sucesso!</p>
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
        data_nascimento: '',
        confirmacao: false
      }
    },
    methods: {
      register() {
        if (this.$refs.formulario.checkValidity()) {
        axios.post('https://2c6f-45-227-44-251.ngrok-free.app/api/cliente', {
          nome: this.nome,
          telefone: this.telefone,
          email: this.email,
          endereco: this.endereco,
          sexo: this.sexo,
          data_nascimento: this.data_nascimento,
        }).then(response => {
          if (response.status === 201) {
            this.confirmacao = true; 
          
            this.$router.push('/cliente'); // Redireciona para a página "Cliente" após 2 segundos
        
          }
        }).catch(error => {
          console.error(error);
        });
      } else {
        // Se o formulário não for válido, exibe uma mensagem de erro
       // console.error('Por favor, preencha todos os campos obrigatórios.');
      }
      }
    }
  }
  </script>
  