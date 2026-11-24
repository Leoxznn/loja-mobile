import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [itens, setItens] = useState([]);
    // Se já existe: quantidade + 1. Senão: entra com quantidade 1.
    function adicionar(produto) {
        setItens((atuais) => {
            const existe = atuais.find((item) => item.id === produto.id);
            if (existe) {
                return atuais.map((item) =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }
            return [
                ...atuais,
                { id: produto.id, nome: produto.nome, preco: produto.preco, quantidade: 1 },
            ];
        });
    }

    function remover(id) {
        setItens((atuais) =>
            atuais
                .map((item) =>
                    item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
                )
                .filter((item) => item.quantidade > 0)
        );
    }

    function limpar() {
        setItens([]);
    }

    const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0);
    const totalPreco = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

    return (
        <CartContext.Provider
            value={{ itens, adicionar, remover, limpar, totalItens, totalPreco }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const contexto = useContext(CartContext);
    if (!contexto) {
        throw new Error('useCart deve ser usado dentro de um CartProvider');
    }
    return contexto;
}
