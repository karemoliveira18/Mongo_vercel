/**
 * SEMANA 1: CLASSES POO - Usuario e GerenciadorDeUsuarios
 * Explicações do Copilot como comentários
 */

class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataCriacao = new Date();
    }

    validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }
}

class GerenciadorDeUsuarios {
    constructor() {
        this.usuarios = [];
    }

    cadastrar(usuario) {
        const usuarioExistente = this.usuarios.find(u => u.email === usuario.email);
        if (usuarioExistente) {
            return false;
        }

        const senhaHasheada = this._simularHash(usuario.senha);
        const usuarioParaMongoDB = {
            nome: usuario.nome,
            email: usuario.email,
            senhaHasheada: senhaHasheada,
            dataCriacao: usuario.dataCriacao
        };

        this.usuarios.push(usuarioParaMongoDB);
        return usuarioParaMongoDB;
    }

    fazerLogin(email, senha) {
        const usuarioLogando = this.usuarios.find(u => u.email === email);
        if (!usuarioLogando) {
            return false;
        }

        const senhaHasheada = this._simularHash(senha);
        return senhaHasheada === usuarioLogando.senhaHasheada;
    }

    _simularHash(senha) {
        const salt = 2024;
        let acc = 0;
        for (let i = 0; i < senha.length; i++) acc += senha.charCodeAt(i);
        return String(acc + salt);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Usuario, GerenciadorDeUsuarios };
}
