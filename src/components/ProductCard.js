import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import AddButton from './AddButton';

export default function ProductCard({ produto }) {
    const { tema } = useTheme();

    return (
        <View style={[styles.cartao, { backgroundColor: tema.cartao, borderColor: tema.borda }]}>
            <View style={styles.info}>
                <Text style={[styles.nome, { color: tema.texto }]}>{produto.nome}</Text>
                <Text style={{ color: tema.textoSecundario }}>{produto.preco} CVE</Text>
            </View>
        <AddButton produto={produto} />
        </View>
    );
}

const styles = StyleSheet.create({
    cartao: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    info: { flex: 1 },
    nome: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
});
