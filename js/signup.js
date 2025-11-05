const app = Vue.createApp({
    data() {
        return {
            nome: '',
            usuario: '',
            senha: '',
            confirmSenha: '',
            
            tipoSenha: 'password',
            tipoConfirmSenha: 'password',
            
            msgError: '',
            msgSuccess: '',
        }
    },

    computed: {
        validacoes() {
            const validoNome = this.nome.length > 2;
            const labelNome = validoNome ? 'Nome' : 'Nome *Insira no mínimo 3 caracteres';

            const validoUsuario = this.usuario.length > 4;
            const labelUsuario = validoUsuario ? 'Usuário' : 'Usuário *Insira no mínimo 5 caracteres';

            const validoSenha = this.senha.length > 5;
            const labelSenha = validoSenha ? 'Senha' : 'Senha *Insira no mínimo 6 caracteres';

            const validoConfirmSenha = this.senha === this.confirmSenha && this.senha.length > 0;
            const labelConfirmSenha = validoConfirmSenha ? 'Confirmar Senha' : 'Confirmar Senha *As senhas não conferem';

            return {
                nome: { valido: validoNome, label: labelNome },
                usuario: { valido: validoUsuario, label: labelUsuario },
                senha: { valido: validoSenha, label: labelSenha },
                confirmSenha: { valido: validoConfirmSenha, label: labelConfirmSenha },
                formValido: validoNome && validoUsuario && validoSenha && validoConfirmSenha
            };
        }
    },

    methods: {
        toggleSenha(campo) {
            if (campo === 'senha') {
                this.tipoSenha = this.tipoSenha === 'password' ? 'text' : 'password';
            } else if (campo === 'confirmSenha') {
                this.tipoConfirmSenha = this.tipoConfirmSenha === 'password' ? 'text' : 'password';
            }
        },

        cadastrar() {
            this.msgError = '';
            this.msgSuccess = '';

            if (this.validacoes.formValido) {
                
                let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
                
                listaUser.push({
                    nomeCad: this.nome,
                    userCad: this.usuario,
                    senhaCad: this.senha
                });
                
                localStorage.setItem('listaUser', JSON.stringify(listaUser));
                
                this.msgSuccess = '<strong>Cadastrando usuário...</strong>';
                
                this.nome = '';
                this.usuario = '';
                this.senha = '';
                this.confirmSenha = '';

                setTimeout(() => {
                    window.location.href = '../html/signin.html';
                }, 3000);
            } else {
                this.msgError = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
                
                if (!this.validacoes.nome.valido) document.querySelector('input[type="text"]').focus();
            }
        }
    }
});

app.mount('#app');