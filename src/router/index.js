import { createMemoryHistory, createRouter } from 'vue-router';
import Home from '../views/home/Home.vue';

import Cliente from '../views/cliente/Cliente.vue';
import CadastrarCliente from '../views/cliente/CadastrarCliente.vue';
import DashbordCliente from '../views/cliente/DashbordCliente.vue';
import EditarCliente from '../views/cliente/EditarCliente.vue';

import Veiculo from '../views/veiculo/Veiculo.vue';
import Revisao from '../views/revisao/Revisao.vue';


const routes =[
    {
        path:'/',
        name: 'Home',
        component: Home
    },
    {
        path:'/revisao',
        name: 'Revisao',
        component: Revisao
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
    }
];

const router=createRouter({
    history: createMemoryHistory(),
    routes
})

export default router;