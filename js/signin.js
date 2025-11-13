const app = Vue.createApp({
    data() {
        return {
            usuario: '',
            senha: '',
            tipoSenha: 'password',
            msgError: '',         
        }
    },
    
    methods: {
        toggleSenha() {
            this.tipoSenha = this.tipoSenha === 'password' ? 'text' : 'password';
        },

        entrar() {
            this.msgError = '';

            const listaUserJSON = localStorage.getItem('listaUser');
            let listaUser = listaUserJSON ? JSON.parse(listaUserJSON) : [];
            
            let userValid = null;

            userValid = listaUser.find(item => 
                this.usuario === item.userCad && this.senha === item.senhaCad
            );

            if (userValid) {
                const mathRandom = Math.random().toString(16).substr(2);
                const token = mathRandom + mathRandom;
                
                localStorage.setItem('token', token);
                
                const userLogado = {
                    nome: userValid.nomeCad,
                    user: userValid.userCad,
                    senha: userValid.senhaCad
                };
                localStorage.setItem('userLogado', JSON.stringify(userLogado));

                window.location.href = 'https://kere516.github.io/trabalhoLuizVue/interface/index.html';
                
                
            } else {
                this.msgError = 'Usuário ou senha incorretos';
                
                this.$nextTick(() => {
                    document.querySelector('#usuario').focus();
                });
            }
        }
    }
});

app.mount('#app');