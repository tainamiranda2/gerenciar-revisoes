<template>
    <div>
        <nav class="bg-dark text-white p-4">
            <RouterLink class="router-links" to="/" >
                Voltar
            </RouterLink>
            <RouterLink class="router-links" to="/CadastrarVeiculo">Cadastrar veiculo</RouterLink>
            <RouterLink class="router-links" to="/Veiculo">Todos os veiculos</RouterLink>
            <RouterLink class="router-links" to="/DashbordVeiculo">Dashbord veiculos</RouterLink>
        </nav>
        <h2>Dashbord veiculo</h2>

        <div id="chart_div"></div>
    
        <div id="chart_div_pi"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DashbordVeiculo',
    data() {
        return {
            chartData: [],
            quemTemMaisVeiculosData: {}
        };
    },
    created() {
        this.fetchVeiculos();
        this.fetchQuemTemMaisVeiculos();
    },
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.onload = () => {
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(() => {
                this.drawChart(); // Chame as funções drawChart e drawQuemTemMaisVeiculosChart como funções
                this.drawQuemTemMaisVeiculosChart();
            });
        };
        document.body.appendChild(script);
    },
    methods: {
        fetchVeiculos() {
            axios.get('https://2c6f-45-227-44-251.ngrok-free.app/api/relatorioVeiculo',{
                headers: {
    'ngrok-skip-browser-warning': 'true'
                }
  })
                .then(response => {
                    const data = response.data;
                    // Transforme os dados em um formato adequado para o Google Charts
                    this.chartData = Object.entries(data).map(([pessoa, veiculos]) => [pessoa, veiculos.length]);
                    this.drawChart();
                })
                .catch(error => {
                    console.error('Erro ao buscar dados:', error);
                });
        },

        fetchQuemTemMaisVeiculos() {
            axios.get('https://2c6f-45-227-44-251.ngrok-free.app/api/relatorioVeiculo/Genero' ,{
                headers: {
    'ngrok-skip-browser-warning': 'true'
                }
  })
                .then(response => {
                    this.quemTemMaisVeiculosData = response.data;
                    this.drawQuemTemMaisVeiculosChart();
                })
                .catch(error => {
                    console.error('Erro ao buscar dados de quem tem mais veículos:', error);
                });
        },

        drawChart() {
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(() => {
                const dataTable = new google.visualization.DataTable();
                dataTable.addColumn('string', 'Pessoa');
                dataTable.addColumn('number', 'Número de Veículos');
                dataTable.addRows(this.chartData);

                const options = {
                    title: 'Todos os Veículos por Pessoa',
                    legend: { position: 'none' },
                    bars: 'horizontal'
                };

                const chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                chart.draw(dataTable, options);
            });
        },

        drawQuemTemMaisVeiculosChart() {
            // Desenhe o gráfico de quem tem mais veículos usando this.quemTemMaisVeiculosData
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');
            data.addRows([
                ['Homens', this.quemTemMaisVeiculosData.total_veiculos_homens],
                ['Mulheres', this.quemTemMaisVeiculosData.total_veiculos_mulheres]
            ]);

            var options = {
                'title': 'Quem tem mais veículos',
                'width': 400,
                'height': 300
            };

            var chart = new google.visualization.PieChart(document.getElementById('chart_div_pi'));
            chart.draw(data, options);
        }
    }
}
</script>
