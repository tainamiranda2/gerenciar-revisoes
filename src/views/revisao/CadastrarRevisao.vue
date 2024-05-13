<template>
  <div>
    <nav class="bg-dark text-white p-4">
      <router-link class="router-links" to="/">
        Voltar
      </router-link>
      <router-link class="router-links" to="/Revisao">Todos as revisões</router-link>
    </nav>

    <h1>Cadastrar revisão</h1>
    <form ref="formulario" @submit.prevent="register">
      <div class="mb-3">
        <label for="veiculo_id" class="form-label">Veiculo</label>
        <select v-model="veiculo_id" class="form-select" id="cliente_id" required>
          <option value="" disabled selected>Selecione o veiculo para revisão</option>
          <option v-for="veiculo in veiculos" :key="veiculo.id" :value="veiculo.id">{{ veiculo.placa }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="type_servicos" class="form-label">Tipo de Serviço</label>
        <input v-model="type_servicos" type="text" class="form-control" id="type_servicos" placeholder="Informe o tipo de serviço" required>
      </div>
      <div class="mb-3">
        <label for="quilometragem" class="form-label">Quilometragem</label>
        <input v-model="quilometragem" type="text" class="form-control" id="quilometragem" placeholder="Informe a quilometragem" required>
      </div>
      <div class="mb-3">
        <label for="detalhes" class="form-label">Detalhes</label>
        <textarea v-model="detalhes" class="form-control" id="detalhes" placeholder="Informe os detalhes" required></textarea>
      </div>
      <div class="mb-3">
        <label for="data_revisao" class="form-label">Data da revisão</label>
        <input v-model="data_revisao" type="datetime-local" class="form-control" id="data_revisao" required>
      </div>
      <button type="submit" class="btn btn-primary">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CadastrarRevisao',
  data() {
    return {
      veiculo_id: '',
      type_servicos: '',
      quilometragem: '',
      detalhes: '',
      data_revisao: '',
      veiculos: []
    };
  },
  created() {
    this.getVeiculos();
  },
  methods: {
    getVeiculos() {
      axios.get('http://127.0.0.1:8000/api/veiculo')
        .then(response => {
          this.veiculos = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    register() {
      if (this.$refs.formulario.checkValidity()) {
        axios.post('http://127.0.0.1:8000/api/revisao', {
          veiculo_id: this.veiculo_id,
          type_servicos: this.type_servicos,
          quilometragem: this.quilometragem,
          detalhes: this.detalhes,
          data_revisao: this.data_revisao
        }).then(response => {
          if (response.status === 201) {
            this.$router.push('/Revisao');
          }
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }
};
</script>
