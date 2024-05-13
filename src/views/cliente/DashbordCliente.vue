import { RouterLink } from 'vue-router';

<template>
    <nav class="bg-dark text-white p-4">
        <RouterLink class="router-links" to="/CadastrarCliente">Cadastrar cliente</RouterLink>
        <RouterLink class="router-links" to="/Cliente">Todos os clientes</RouterLink>
    </nav>
  
    <div>
        <h1>Homens e mulheres cadastrados no sistema</h1>
        <div id="chart_div"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DashbordCliente',

    data() {
        return {
            clientes: [],
            totalClientes: 0,
            mediaIdadeHomens: 0,
            mediaIdadeMulheres: 0,
            QtdHomens: 0,
            QtdMulheres: 0
        };
    },

    created() {
        this.fetchClientes();
    },

    mounted() {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.onload = () => {
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(this.drawChart);
        };
        document.body.appendChild(script);
    },

    methods: {
        fetchClientes() {
            
            axios.get('https://2c6f-45-227-44-251.ngrok-free.app/api/relatorioCliente',{
                headers: {
    'ngrok-skip-browser-warning': 'true'
  }
            })
                .then(res => {
                    this.clientes = res.data;
                    this.mediaIdadeHomens = res.data.homens.idade_media;
                    this.mediaIdadeMulheres = res.data.mulheres.idade_media;
                 this.QtdHomens=res.data.homens.quantidade;
                 this.QtdMulheres=res.data.mulheres.quantidade;
               console.log(this.QtdHomens )
                 this.drawChart();
                 //this.totalClientes = this.clientes.length;
                })
                .catch(error => {
                    console.error('Erro ao buscar clientes:', error);
                    console.log(  this.clientes )
                });
        },

        drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Gênero', 'Idade', 'Quantidade'],
                ['Homens', this.mediaIdadeHomens, this.QtdHomens],
                ['Mulheres', this.mediaIdadeMulheres, this.QtdMulheres]
            ]);

            var options = {
                title: 'Homens e Mulheres',
                width: 600,
                height: 400
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
    }
}
</script>
