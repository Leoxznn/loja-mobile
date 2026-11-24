import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function TabBar({ abaAtual, mudarAba }) {
    const { tema } = useTheme();
    const { totalItens } = useCart();
    const { t } = useLanguage();
    const abas = [
        { id: 'produtos', rotulo: t.produtos },
        { id: 'carrinho', rotulo: `${t.carrinho} (${totalItens})` },
        { id: 'perfil', rotulo: t.perfil },
    ];

    return (
        <View style={[styles.barra, { backgroundColor: tema.cartao, borderColor: tema.borda }]}>
            {abas.map((aba) => {
                const ativa = aba.id === abaAtual;
                return (
                    <TouchableOpacity key={aba.id} style={styles.aba} onPress={() => mudarAba(aba.id)}>
                        <Text
                            style={{
                                color: ativa ? tema.primaria : tema.textoSecundario,
                                fontWeight: ativa ? 'bold' : 'normal',
                            }}
                        >
                            {aba.rotulo}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    barra: { flexDirection: 'row', borderTopWidth: 1, paddingBottom: 20 },
    aba: { flex: 1, alignItems: 'center', paddingVertical: 14 },
});

