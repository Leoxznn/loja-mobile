import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';


export default function AddButton({ produto }) {
    const { adicionar } = useCart();
    const { tema } = useTheme();
    const { usuario } = useAuth();
    const logado = usuario !== null;

    return (
        <TouchableOpacity
            style={[styles.botao, { backgroundColor: logado ? tema.primaria : tema.borda }]}
            onPress={() => adicionar(produto)}
            disabled={!logado}
        >
        <Text style={[styles.texto, { color: logado ? '#ffffff' : tema.textoSecundario }]}>
            {logado ? '+ Adicionar' : 'Entre para comprar'}
        </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botao: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
    texto: { fontWeight: 'bold' },
});
