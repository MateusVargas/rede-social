import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import slug from 'slug'

Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$urlAPI = 'http://localhost:8000/api/'
Vue.prototype.$slug = slug

//Vue.prototype define dados que serão acessíveis
//em qualquer componente

const store = {
	state: {
		usuario: sessionStorage.getItem('usuario')
				? JSON.parse(sessionStorage.getItem('usuario'))
				: null,
		conteudosLinhaTempo: []
	},
	getters: {
		getUsuario: state => state.usuario,
		getToken: state => state.usuario.token,
		getConteudosLinhaTempo: state => state.conteudosLinhaTempo
	},
	mutations: {
		setUsuario(state, n){
			state.usuario = n
		},
		setConteudosLinhaTempo(state,n){
			state.conteudosLinhaTempo = n
		},
		setPaginacaoConteudosLinhaTempo(state,lista){
			for(let item of lista){
				state.conteudosLinhaTempo.push(item)
			}
		}
	}
}

//rolagem automática
//Vue.directive registra a diretiva personalizada
Vue.directive('scroll',{
	inserted: function(el, binding){//inserted: quando o elemento é inserido no DOM
		let f = function(evt){
			if (binding.value(evt,el)){
				window.removeEventListener('scroll',f)
			}
		}
		window.addEventListener('scroll',f)
	}
})


new Vue({
  render: h => h(App),
  store: new Vuex.Store(store),
  router
}).$mount('#app')
