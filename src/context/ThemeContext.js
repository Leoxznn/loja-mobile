import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const temas = {
    claro: {
        fundo: '#f2f2f2',
        cartao: '#ffffff',
        texto: '#1a1a1a',
        textoSecundario: '#666666',
        primaria: '#2563eb',
        borda: '#dddddd',
    },
    escuro: {
        fundo: '#121212',
        cartao: '#1e1e1e',
        texto: '#f5f5f5',
        textoSecundario: '#aaaaaa',
        primaria: '#60a5fa',
        borda: '#333333',
    },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [modo, setModo] = useState('claro');
        // Extra: ao abrir a app, lê o tema guardado
        useEffect(() => {
            AsyncStorage.getItem('modo').then((guardado) => {
                if (guardado === 'claro' || guardado === 'escuro') {
                    setModo(guardado);
        }
    });
 }, []);

    function alternarTema() {
        const novoModo = modo === 'claro' ? 'escuro' : 'claro';
        setModo(novoModo);
        AsyncStorage.setItem('modo', novoModo); // Extra: guarda o tema
    }

    return (
        <ThemeContext.Provider value={{ modo, tema: temas[modo], alternarTema }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const contexto = useContext(ThemeContext);
    if (!contexto) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    return contexto;
}
