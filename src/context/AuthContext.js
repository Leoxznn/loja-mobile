import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    function entrar(nome) {
        const nomeLimpo = nome.trim();
        if (nomeLimpo === '') return; // ignora nomes vazios
        setUsuario({ nome: nomeLimpo });
    }

    function sair() {
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuario, entrar, sair }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const contexto = useContext(AuthContext);
    if (!contexto) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return contexto;
}
