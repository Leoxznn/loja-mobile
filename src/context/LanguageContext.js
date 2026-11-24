import { createContext, useContext, useState } from 'react';

const textos = {
    pt: { produtos: 'Produtos', carrinho: 'Carrinho', perfil: 'Perfil' },
    en: { produtos: 'Products', carrinho: 'Cart', perfil: 'Profile' },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [idioma, setIdioma] = useState('pt');

    function alternarIdioma() {
        setIdioma((atual) => (atual === 'pt' ? 'en' : 'pt'));
    }

    return (
        <LanguageContext.Provider value={{ idioma, t: textos[idioma], alternarIdioma }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const contexto = useContext(LanguageContext);
    if (!contexto) {
        throw new Error('useLanguage deve ser usado dentro de um LanguageProvider');
    }
    return contexto;
}
