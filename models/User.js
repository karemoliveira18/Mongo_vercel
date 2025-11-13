/**
 * EXPLICAÇÃO DO COPILOT - O que é uma CLASS?
 * Uma classe é um "molde" ou "projeto" para criar objetos.
 * Assim como um molde de bolo define a forma, uma classe define a estrutura de um objeto.
 * 
 * Neste projeto, usamos POO (Programação Orientada a Objetos) para:
 * - Encapsular dados (name, email, password) junto com operações (isValid, toDocument)
 * - Reutilizar código
 * - Organizar melhor o projeto
 */
class User {
    /**
     * EXPLICAÇÃO DO COPILOT - O que é um CONSTRUCTOR?
     * O constructor é uma função especial que é chamada quando você cria uma nova instância da classe.
     * É como um "inicializador" que prepara o objeto para ser usado.
     * 
     * Exemplo de uso:
     * const user = new User("João", "joao@email.com", "senha123");
     * Neste momento, o constructor é chamado automaticamente.
     * 
     * @param {string} name - O nome do usuário
     * @param {string} email - O email do usuário
     * @param {string} password - A senha do usuário (será armazenada no banco)
     */
    constructor(name, email, password) {
        /**
         * EXPLICAÇÃO DO COPILOT - O que é THIS?
         * 'this' refere-se ao objeto ATUAL (a instância específica).
         * 
         * Quando você escreve: this.name = name
         * Você está dizendo: "Na MINHA instância específica, defina a propriedade 'name' com o valor recebido"
         * 
         * Exemplo:
         * const user1 = new User("João", "joao@email.com", "123");
         * const user2 = new User("Maria", "maria@email.com", "456");
         * 
         * user1.name === "João"    // this.name referiu-se a user1
         * user2.name === "Maria"   // this.name referiu-se a user2
         * 
         * Cada instância tem seus próprios valores!
         */
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date(); // Data de criação do usuário
    }

    /**
     * EXPLICAÇÃO DO COPILOT - O que é um MÉTODO?
     * Um método é uma função que pertence a uma classe.
     * Ele pode acessar as propriedades do objeto usando 'this'.
     * 
     * isValid() é um MÉTODO DE VALIDAÇÃO:
     * - Valida se o nome tem pelo menos 3 caracteres
     * - Valida se o email é válido (contém @)
     * - Valida se a senha tem pelo menos 6 caracteres
     * 
     * Por que usar um método e não apenas uma função solta?
     * COESÃO: O método está próximo aos dados que valida.
     * REUTILIZAÇÃO: Qualquer User pode chamar este método.
     * 
     * @returns {boolean} - true se dados são válidos, false caso contrário
     */
    isValid() {
        return (
            this.name && this.name.length >= 3 &&
            this.email && this.email.includes('@') &&
            this.password && this.password.length >= 6
        );
    }

    /**
     * EXPLICAÇÃO DO COPILOT - O que é SERIALIZAÇÃO?
     * toDocument() converte o objeto User para um formato que o MongoDB entende.
     * 
     * Por que não enviar o objeto User diretamente para o banco?
     * Porque o MongoDB trabalha com documentos JSON simples.
     * Este método "transforma" a instância em um objeto puro (sem métodos).
     * 
     * Exemplo:
     * const user = new User("João", "joao@email.com", "123");
     * user.isValid()      // Este é um MÉTODO - não pode ir ao banco
     * 
     * const documento = user.toDocument(); // Retorna um objeto simples
     * // { name: "João", email: "joao@email.com", password: "123", createdAt: Date }
     * // Agora pode ir ao MongoDB!
     * 
     * @returns {Object} - Um objeto simples (serializado) pronto para o banco
     */
    toDocument() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            createdAt: this.createdAt
        };
    }

    /**
     * EXPLICAÇÃO DO COPILOT - O que é um MÉTODO ESTÁTICO?
     * Um método estático (static) pertence à CLASSE, não a uma instância.
     * 
     * Diferença:
     * - isValid() é um método de INSTÂNCIA - você chama assim: user.isValid()
     * - fromDocument() é um método ESTÁTICO - você chama assim: User.fromDocument(data)
     * 
     * Por que usar static?
     * Para criar UMA NOVA INSTÂNCIA a partir de dados do banco!
     * 
     * Exemplo de uso:
     * // Dados que vêm do MongoDB
     * const dadosDoBanco = { name: "João", email: "joao@email.com", password: "123", createdAt: Date }
     * 
     * // Converte de volta para uma instância User
     * const user = User.fromDocument(dadosDoBanco);
     * 
     * // Agora user tem acesso aos métodos!
     * user.isValid()  // Funciona!
     * 
     * @param {Object} data - Dados vindos do banco de dados
     * @returns {User} - Uma nova instância User "preenchida" com esses dados
     */
    static fromDocument(data) {
        const user = new User(data.name, data.email, data.password);
        user.createdAt = data.createdAt;
        return user;
    }
}

export default User;