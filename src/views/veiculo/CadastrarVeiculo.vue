<template>
    <div>
      <nav class="bg-dark text-white p-4">
        <RouterLink  class="router-links" to="/">
          Voltar
        </RouterLink>
        <RouterLink  class="router-links" to="/Veiculo">Todos os veiculos</RouterLink>
      </nav>
  
      <h1>Cadastrar veiculo</h1>
      <form ref="formulario" @submit.prevent="register">
      <div class="mb-3">
        <label for="cliente_id" class="form-label">Cliente</label>
        <select v-model="cliente_id" class="form-select" id="cliente_id" required>
          <option value="" disabled selected>Selecione o cliente</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nome }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="marca" class="form-label">Marca</label>
        <input v-model="marca" type="text" class="form-control" id="marca" placeholder="Informe a marca do veiculo" required>
      </div>
      <div class="mb-3">
        <label for="modelo" class="form-label">Modelo</label>
        <input v-model="modelo" type="text" class="form-control" id="modelo" placeholder="Informe o modelo do veiculo" required>
      </div>
      <div class="mb-3">
        <label for="cor" class="form-label">Cor</label>
        <input v-model="cor" type="text" class="form-control" id="cor" placeholder="Informe a cor do veiculo" required>
      </div>
      <div class="mb-3">
        <label for="placa" class="form-label">Placa</label>
        <input v-model="placa" type="text" class="form-control" id="placa" placeholder="Informe a placa do veiculo" required>
      </div>
      
      <div class="mb-3">
        <label for="ano_fabricacao" class="form-label">Ano de Fabricação</label>
        <input v-model="ano_fabricacao" type="datetime-local" class="form-control" id="ano_fabricacao" required>
      </div>
  
      <button @click="register" class="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  export default {
    name: 'CadastrarVeiculo',
    data() {
      return {
        cliente_id: '',
        marca: '',
        modelo: '',
        cor: '',
        placa: '',
        ano_fabricacao: '',
        clientes: []
      }
    },
    created() {
      this.getClientes();
    },
    methods: {
      getClientes() {
        axios.get('https://2c6f-45-227-44-251.ngrok-free.app/api/cliente',{
                headers: {
    'ngrok-skip-browser-warning': 'true'
                }
  })
          .then(response => {
            this.clientes = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      register() {
        if (this.$refs.formulario.checkValidity()) {
        axios.post('https://2c6f-45-227-44-251.ngrok-free.app/api/veiculo', {
                headers: {
    'ngrok-skip-browser-warning': 'true'
                
  },
          cliente_id: this.cliente_id,
          marca: this.marca,
          modelo: this.modelo,
          placa: this.placa,
          cor: this.cor,
          ano_fabricacao: this.ano_fabricacao,
        }).then(response => {
            if (response.status === 201) {
          this.$router.push('/Veiculo');
        }
     
        }).catch(error => {
          console.error(error);
        });
      }
    }
    }
  }
  </script>
  