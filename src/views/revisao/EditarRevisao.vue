<template>
    <div>
      <nav class="bg-dark text-white p-4">
        <router-link class="router-links" to="/">
          Voltar
        </router-link>
      </nav>
  
      <h1>Editar Revisão</h1>
  
      <div class="mb-3">
        <label for="veiculo_id" class="form-label">Veiculo</label>
        <select v-model="veiculo_id" class="form-select" id="veiculo_id">
          <option value="" disabled selected>Selecione o veiculo para revisão</option>
          <option v-for="veiculo in veiculos" :key="veiculo.id" :value="veiculo.id">{{ veiculo.placa }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="type_servicos" class="form-label">Tipo de Serviço</label>
        <input v-model="type_servicos" type="text" class="form-control" id="type_servicos" placeholder="Informe o tipo de serviço">
      </div>
      <div class="mb-3">
        <label for="quilometragem" class="form-label">Quilometragem</label>
        <input v-model="quilometragem" type="text" class="form-control" id="quilometragem" placeholder="Informe a quilometragem">
      </div>
      <div class="mb-3">
        <label for="detalhes" class="form-label">Detalhes</label>
        <textarea v-model="detalhes" class="form-control" id="detalhes" placeholder="Informe os detalhes"></textarea>
      </div>
      <div class="mb-3">
        <label for="data_revisao" class="form-label">Data da revisão</label>
        <input v-model="data_revisao" type="datetime-local" class="form-control" id="data_revisao">
      </div>
      <button @click="updateRevisao" class="btn btn-primary">Atualizar</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditarRevisao',
    data() {
      return {
        id: '',
        veiculo_id: '',
        type_servicos: '',
        quilometragem: '',
        detalhes: '',
        data_revisao: '',
        veiculos: []
      };
    },
    created() {
      this.getRevisao();
      this.getVeiculos();
    },
    methods: {
      getRevisao() {
        const id = this.$route.params.id;
        axios.get(`https://2c6f-45-227-44-251.ngrok-free.app//api/revisao/${id}`,{
                headers: {
    'ngrok-skip-browser-warning': 'true'
                }
  })
          .then(response => {
            const revisao = response.data;
            this.id = revisao.id;
            this.veiculo_id = revisao.veiculo_id;
            this.type_servicos = revisao.type_servicos;
            this.quilometragem = revisao.quilometragem;
            this.detalhes = revisao.detalhes;
            this.data_revisao = revisao.data_revisao;
          })
          .catch(error => {
            console.error(error);
          });
      },
      getVeiculos() {
        axios.get('https://2c6f-45-227-44-251.ngrok-free.app//api/veiculo',{
                headers: {
    'ngrok-skip-browser-warning': 'true'
                }
  })
          .then(response => {
            this.veiculos = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      updateRevisao() {
        axios.patch(`https://2c6f-45-227-44-251.ngrok-free.app/api/revisao/${this.id}`,{
                headers: {
             'ngrok-skip-browser-warning': 'true'
                
              },
  
          veiculo_id: this.veiculo_id,
          type_servicos: this.type_servicos,
          quilometragem: this.quilometragem,
          detalhes: this.detalhes,
          data_revisao: this.data_revisao
        }).then(response => {
          console.log(response.data);
          this.$router.push('/Revisao');
        }).catch(error => {
          console.error(error);
        });
      }
    }
  };
  </script>
  