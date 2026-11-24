import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { tema, modo, alternarTema } = useTheme();
    const { totalItens } = useCart();
    const { usuario } = useAuth();

    return (
        <View style={[styles.header, { backgroundColor: tema.cartao, borderColor: tema.borda }]}>
            <View style={styles.esquerda}>
                <Text style={[styles.titulo, { color: tema.texto }]}>Loja Mobile</Text>
                <Text style={{ color: tema.textoSecundario }}>
                    {usuario ? `Olá, ${usuario.nome}!` : 'Visitante'}
                </Text>
            </View>
            <Text style={[styles.carrinho, { color: tema.texto }]}>
                Carrinho: {totalItens}
            </Text>
            <TouchableOpacity onPress={alternarTema}>
                <Text style={styles.icone}>{modo === 'claro' ? '\u{1F319}' : '\u2600\uFE0F'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
    },
    esquerda: { flex: 1 },
    titulo: { fontSize: 20, fontWeight: 'bold' },
    carrinho: { marginRight: 14, fontWeight: 'bold' },
    icone: { fontSize: 24 },
});
