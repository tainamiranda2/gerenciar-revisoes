<template>
    <div>
      <a class="sair" href="/">Voltar</a>
      <h1>Editar veiculo</h1>
      <div class="mb-3">
        <label for="cliente_id" class="form-label">Cliente</label>
        <select v-model="cliente_id" class="form-select" id="cliente_id">
          <option value="" disabled selected>Selecione o cliente</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nome }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="cor" class="form-label">Cor</label>
        <input v-model="cor" type="text" class="form-control" id="cor" placeholder="Informe a cor do veiculo">
      </div>
      <div class="mb-3">
        <label for="marca" class="form-label">Marca</label>
        <input v-model="marca" type="text" class="form-control" id="marca" placeholder="Informe a marca do veiculo ">
      </div>
      <div class="mb-3">
        <label for="modelo" class="form-label">Modelo</label>
        <input v-model="modelo" type="text" class="form-control" id="modelo" placeholder="Informe o modelo do veiculo">
      </div>
      <div class="mb-3">
        <label for="placa" class="form-label">Placa</label>
        <input v-model="placa" type="text" class="form-control" id="placa" placeholder="Informe a placa do veiculo">
      </div>
      
      <div class="mb-3">
        <label for="ano_fabricacao" class="form-label">Ano de Fabricação</label>
        <input v-model="ano_fabricacao" type="datetime-local" class="form-control" id="ano_fabricacao">
      </div>
    
      <button @click="editarVeiculo" class="btn btn-primary">Editar</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditarVeiculo',
    data() {
      return {
        cliente_id: '',
        marca: '',
        modelo: '',
        placa: '',
        ano_fabricacao: ''
      }
    },
    created() {
        
      this.getClientes();
    
      this.recuperarDetalhesVeiculo();
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
      recuperarDetalhesVeiculo() {
        const veiculoId = this.$route.params.id; 
        axios.get(`https://2c6f-45-227-44-251.ngrok-free.app/api/veiculo/${veiculoId}`,{
                headers: {
    'ngrok-skip-browser-warning': 'true'
                }
  })
          .then(response => {
            const veiculo = response.data;
            // Preencher os campos do formulário com os detalhes do veículo
            this.cliente_id = veiculo.cliente_id;
            this.marca = veiculo.marca;
            this.modelo = veiculo.modelo;
            this.placa = veiculo.placa;
            this.cor = veiculo.cor;

            this.ano_fabricacao = veiculo.ano_fabricacao;
          })
          .catch(error => {
            console.error(error);
          });
      },
      editarVeiculo() {
        const veiculoId = this.$route.params.id; // Obtém o ID do veículo da rota
        // Fazer uma solicitação para editar o veículo com os dados atualizados
        axios.patch(`https://2c6f-45-227-44-251.ngrok-free.app/api/veiculo/${veiculoId}`,{
                headers: {
    'ngrok-skip-browser-warning': 'true'
                
  } ,
          cliente_id: this.cliente_id,
          marca: this.marca,
          cor: this.cor,

          modelo: this.modelo,
          placa: this.placa,
          ano_fabricacao: this.ano_fabricacao,
        })
        .then(response => {
          console.log(response.data);
          // Redirecionar para a página de detalhes do veículo após a edição
          this.$router.push({ name: 'Veiculo'});
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
  }
  </script>
  