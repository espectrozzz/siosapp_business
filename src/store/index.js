import { createStore } from 'vuex'

const navbarControl = {
    state: () => ({
        open: true
    }),
    mutations: {
        accion(state) {
            state.open = state.open ? false : true
            localStorage.setItem('open', state.open)
        }
    }
}

const proyectosControl = {
    state: () => ({
        isOpenModalNuevoProyecto: false,
        isOpenModalConfirmacion: false,
        isOpenModalEditarTiempoVolumetria: false,
        isOpenModalEditarCostosGastos: false,
        isOpenModalFinalizarProyecto: false,
        isOpenModalReabrirProyecto: false,
        proyectoQuery: {},
        volumetrias: [],
        tipoVolumetrias: [],
        unidadVolumetrias: [],
    }),
    mutations: {
        openModalNuevoProyecto(state) {
            state.isOpenModalNuevoProyecto = true
        },
        closeModalNuevoProyecto(state) {
            state.isOpenModalNuevoProyecto = false
        },
        openModalConfirmacion(state) {
            state.isOpenModalConfirmacion = true
        },
        closeModalConfirmacion(state) {
            state.isOpenModalConfirmacion = false
        },
        openModalFinalizarProyecto(state) {
            state.isOpenModalFinalizarProyecto = true
        },
        closeModalFinalizarProyecto(state) {
            state.isOpenModalFinalizarProyecto = false
        },
        openModalEditarTiempoVolumetria(state) {
            state.isOpenModalEditarTiempoVolumetria = true
        },
        closeModalEditarTiempoVolumetria(state) {
            state.isOpenModalEditarTiempoVolumetria = false
        },
        openModalEditarCostosGastos(state) {
            state.isOpenModalEditarCostosGastos = true
        },
        closeModalEditarCostosGastos(state) {
            state.isOpenModalEditarCostosGastos = false
        },
        openModalReabrirProyecto(state) {
            state.isOpenModalReabrirProyecto = true
        },
        closeModalReabrirProyecto(state) {
            state.isOpenModalReabrirProyecto= false
        },
        queryResult(state, data){
            state.proyectoQuery = data;
        },
    }
}

export const store = createStore({
    modules: {
        a: navbarControl,
        b: proyectosControl,
    }
})