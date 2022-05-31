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