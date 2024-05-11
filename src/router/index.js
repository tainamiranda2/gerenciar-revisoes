import { createMemoryHistory, createRouter } from 'vue-router';
import Home from '../views/home/Home.vue';

import Cliente from '../views/cliente/Cliente.vue';
import CadastrarCliente from '../views/cliente/CadastrarCliente.vue';
import DashbordCliente from '../views/cliente/DashbordCliente.vue';
import EditarCliente from '../views/cliente/EditarCliente.vue';

import Veiculo from '../views/veiculo/Veiculo.vue';
import CadastrarVeiculo from '../views/veiculo/CadastrarVeiculo.vue';
import DashbordVeiculo from '../views/veiculo/DashboardVeiculo.vue';
import EditarVeiculo from '../views/veiculo/EditarVeiculo.vue';

import Revisao from '../views/revisao/Revisao.vue';
import CadastrarRevisao from '../views/revisao/CadastrarRevisao.vue';
import DashbordRevisao from '../views/revisao/DashbordRevisao.vue';
import EditarRevisao from '../views/revisao/EditarRevisao.vue';

const routes =[
    {
        path:'/',
        name: 'Home',
        component: Home
    },
    {
        path:'/cliente',
        name: 'Cliente',
        component: Cliente
    },
    {
        path:'/EditarCliente/:id',
        name: 'EditarCliente',
        component: EditarCliente
    },
    
    {
        path:'/CadastrarCliente',
        name: 'CadastrarCliente',
        component: CadastrarCliente
    },
    {
        path:'/DashbordCliente',
        name: 'DashbordCliente',
        component: DashbordCliente
    },
    {
        path:'/Veiculo',
        name: 'Veiculo',
        component: Veiculo
    },
    ,
    {
        path:'/EditarVeiculo/:id',
        name: 'EditarVeiculo',
        component: EditarVeiculo
    },
    
    {
        path:'/CadastrarVeiculo',
        name: 'CadastrarVeiculo',
        component: CadastrarVeiculo
    },
    {
        path:'/DashbordVeiculo',
        name: 'DashbordVeiculo',
        component: DashbordVeiculo
    },
    
    {
        path:'/revisao',
        name: 'Revisao',
        component: Revisao
    },
    ,
    {
        path:'/EditarRevisao/:id',
        name: 'EditarRevisao',
        component: EditarRevisao
    },
    
    {
        path:'/CadastrarRevisao',
        name: 'CadastrarRevisao',
        component: CadastrarRevisao
    },
    {
        path:'/DashbordRevisao',
        name: 'DashbordRevisao',
        component: DashbordRevisao
    },
];

const router=createRouter({
    history: createMemoryHistory(),
    routes
})

export default router;