import { useState } from 'react';
import User from '../models/User';

/**
 * EXPLICAÇÃO DO COPILOT - O que é um COMPONENTE REACT?
 * Um componente é uma função que retorna JSX (HTML + JavaScript).
 * 
 * Por que usar componentes?
 * - REUTILIZAÇÃO: Este componente pode ser usado em vários lugares
 * - ENCAPSULAMENTO: Cada componente gerencia seu próprio estado (state)
 * - MODULARIZAÇÃO: Código mais organizado e fácil de manter
 * 
 * Este componente Register faz:
 * 1. Captura dados do formulário
 * 2. Cria uma instância User
 * 3. Valida os dados
 * 4. Envia para a API
 * 5. Exibe mensagens ao usuário
 */
export default function Register() {
    /**
     * EXPLICAÇÃO DO COPILOT - O que é useState (React Hook)?
     * useState é um "gancho" (hook) do React que permite que componentes funcionais tenham ESTADO.
     * 
     * Estado = dados que podem mudar e quando mudam, o componente se atualiza.
     * 
     * Sintaxe:
     * const [state, setState] = useState(valorInicial);
     * 
     * - formData = valor atual do estado
     * - setFormData = função para atualizar o estado
     * - { name: '', email: '', password: '' } = valor inicial
     * 
     * Quando você chama setFormData(), React re-renderiza o componente com os novos dados!
     */
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    /**
     * EXPLICAÇÃO DO COPILOT - Por que ter um estado separado para message?
     * message armazena a resposta da API (sucesso ou erro).
     * Quando a resposta vem, exibimos ao usuário por 5 segundos.
     */
    const [message, setMessage] = useState('');

    /**
     * EXPLICAÇÃO DO COPILOT - O que é handleSubmit?
     * handleSubmit é uma função que é CHAMADA quando o usuário clica em "Register".
     * 
     * Por que não colocar o código direto no onSubmit?
     * Para ORGANIZAÇÃO: Separar lógica do HTML torna o código mais legível.
     * 
     * O que acontece aqui:
     * 1. Prevenimos o comportamento padrão do formulário (recarga de página)
     * 2. Criamos uma instância User com os dados
     * 3. Validamos usando o método isValid()
     * 4. Enviamos para a API usando fetch
     * 5. Exibimos mensagem de sucesso ou erro
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Não recarrega a página
        
        /**
         * EXPLICAÇÃO DO COPILOT - Instanciação:
         * new User() cria uma NOVA INSTÂNCIA da classe User.
         * Agora 'user' é um objeto que tem acesso aos métodos isValid() e toDocument().
         */
        const user = new User(formData.name, formData.email, formData.password);
        
        /**
         * EXPLICAÇÃO DO COPILOT - Chamando um método de instância:
         * user.isValid() chama o método que definimos em User.js.
         * Este método retorna true ou false.
         */
        if (!user.isValid()) {
            setMessage('Por favor, preencha todos os campos corretamente');
            return;
        }

        try {
            /**
             * EXPLICAÇÃO DO COPILOT - O que é Fetch API?
             * fetch() é uma função nativa do JavaScript que faz requisições HTTP.
             * 
             * Sintaxe:
             * fetch(url, opções)
             * 
             * Neste caso:
             * - url: '/api/register' = nossa API que criamos em pages/api/register.js
             * - method: 'POST' = estamos ENVIANDO dados (não buscando)
             * - headers: declara que estamos enviando JSON
             * - body: os dados serializados com toDocument()
             */
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user.toDocument()), // Serializa o User para JSON
            });

            if (response.ok) {
                setMessage('✅ Cadastro realizado com sucesso!');
                // Limpa o formulário
                setFormData({ name: '', email: '', password: '' });
            } else {
                setMessage('❌ Falha no cadastro. Tente novamente.');
            }
        } catch (error) {
            setMessage('❌ Erro ao conectar com o servidor.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h1>Cadastro de Usuário</h1>
                {message && <p className={message.includes('✅') ? 'success' : 'error'}>{message}</p>}
                
                <div className="form-group">
                    <label htmlFor="name">Nome (mín. 3 caracteres):</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        minLength="3"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Senha (mín. 6 caracteres):</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        minLength="6"
                        required
                    />
                </div>

                <button type="submit">Cadastrar</button>
            </form>

            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .form {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    width: 100%;
                    max-width: 400px;
                }

                h1 {
                    text-align: center;
                    color: #333;
                    margin-bottom: 2rem;
                    font-size: 1.8rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #555;
                    font-weight: 500;
                    font-size: 0.95rem;
                }

                input {
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #e0e0e0;
                    border-radius: 6px;
                    font-size: 1rem;
                    transition: border-color 0.3s;
                }

                input:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
                }

                button {
                    width: 100%;
                    padding: 0.75rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 1.5rem;
                    transition: transform 0.2s;
                }

                button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                }

                button:active {
                    transform: translateY(0);
                }

                .success {
                    color: #27ae60;
                    background-color: #d5f4e6;
                    padding: 0.75rem;
                    border-radius: 6px;
                    text-align: center;
                    margin-bottom: 1rem;
                    font-weight: 500;
                }

                .error {
                    color: #e74c3c;
                    background-color: #fadbd8;
                    padding: 0.75rem;
                    border-radius: 6px;
                    text-align: center;
                    margin-bottom: 1rem;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
}