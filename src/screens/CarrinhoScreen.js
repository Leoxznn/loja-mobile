import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function CarrinhoScreen() {
    const { tema } = useTheme();
    const { itens, adicionar, remover, limpar, totalPreco } = useCart();
    
    if (itens.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: tema.fundo }]}>
                <Text style={{ color: tema.textoSecundario }}>O carrinho está vazio.</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: tema.fundo }]}>
            <FlatList
                data={itens}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.item, { backgroundColor: tema.cartao, borderColor: tema.borda }]}>
                        <View style={styles.info}>
                            <Text style={[styles.nome, { color: tema.texto }]}>{item.nome}</Text>
                            <Text style={{ color: tema.textoSecundario }}>
                                {item.preco} CVE x {item.quantidade}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.botaoQtd, { borderColor: tema.borda }]}
                            onPress={() => remover(item.id)}
                        >
                            <Text style={[styles.textoQtd, { color: tema.texto }]}>-</Text>
                        </TouchableOpacity>

                        <Text style={[styles.quantidade, { color: tema.texto }]}>{item.quantidade}</Text>
                
                        <TouchableOpacity
                            style={[styles.botaoQtd, { borderColor: tema.borda }]}
                            onPress={() => adicionar(item)}
                        >
                            <Text style={[styles.textoQtd, { color: tema.texto }]}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Text style={[styles.total, { color: tema.texto }]}>Total: {totalPreco} CVE</Text>
            
            <TouchableOpacity style={[styles.botao, { backgroundColor: tema.primaria }]} onPress={limpar}>
                <Text style={styles.textoBotao}>Esvaziar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    info: { flex: 1 },
    nome: { fontWeight: 'bold', marginBottom: 4 },
    botaoQtd: { width: 34, height: 34, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    textoQtd: { fontSize: 18, fontWeight: 'bold' },
    quantidade: { marginHorizontal: 10, fontSize: 16 },
    total: { fontSize: 18, fontWeight: 'bold', marginVertical: 12 },
    botao: { padding: 14, borderRadius: 10, alignItems: 'center' },
    textoBotao: { color: '#ffffff', fontWeight: 'bold' },
});

