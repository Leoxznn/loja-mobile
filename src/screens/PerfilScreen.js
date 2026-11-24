import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function PerfilScreen() {
    const { tema, modo, alternarTema } = useTheme();
    const { usuario, entrar, sair } = useAuth();
    const { idioma, alternarIdioma } = useLanguage();
    const [nome, setNome] = useState(''); // estado local do input
    
    function handleEntrar() {
        entrar(nome);
        setNome('');
    }

    return (
        <View style={[styles.container, { backgroundColor: tema.fundo }]}>
            {usuario ? (
                <View>
                    <Text style={[styles.texto, { color: tema.texto }]}>
                         Sessão iniciada como {usuario.nome}
                    </Text>
                    <TouchableOpacity style={[styles.botao, { backgroundColor: tema.primaria }]} onPress={sair}>
                        <Text style={styles.textoBotao}>Sair</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <TextInput
                        style={[styles.input, { color: tema.texto, borderColor: tema.borda, backgroundColor: tema.cartao }]}
                        placeholder="O seu nome"
                        placeholderTextColor={tema.textoSecundario}
                        value={nome}
                        onChangeText={setNome}
                    />
                    <TouchableOpacity style={[styles.botao, { backgroundColor: tema.primaria }]} onPress={handleEntrar}>
                        <Text style={styles.textoBotao}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={[styles.linha, { backgroundColor: tema.cartao, borderColor: tema.borda }]}>
                <Text style={{ color: tema.texto }}>Modo escuro</Text>
                <Switch value={modo === 'escuro'} onValueChange={alternarTema} />
            </View>

            <View style={[styles.linha, { backgroundColor: tema.cartao, borderColor: tema.borda }]}>
                <Text style={{ color: tema.texto }}>Idioma / Language</Text>
                <TouchableOpacity onPress={alternarIdioma}>
                    <Text style={{ color: tema.primaria, fontWeight: 'bold' }}>{idioma.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    texto: { fontSize: 16, marginBottom: 12 },
    input: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12 },
    botao: { padding: 14, borderRadius: 10, alignItems: 'center' },
    textoBotao: { color: '#ffffff', fontWeight: 'bold' },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        padding: 12,
        borderWidth: 1,
        borderRadius: 10,
    },
});

