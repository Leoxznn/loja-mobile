# Respostas

## 1. O texto do input de login devia estar no AuthContext? Porquê?
Não. O texto que se vai escrevendo só interessa ao ecrã de Perfil, por isso é
estado local (useState no PerfilScreen). Só o nome confirmado ao carregar em
"Entrar" é que vai para o AuthContext, porque esse sim é usado em vários sítios
(Header e Perfil). Se cada tecla fosse para o contexto, todos os componentes que
usam useAuth() voltariam a renderizar a cada letra.

## 2. Quando o carrinho muda, que componentes voltam a renderizar?
O CartProvider e todos os componentes que chamam useCart(): Header, TabBar,
CarrinhoScreen (se estiver aberto) e todos os AddButton. Os componentes
intermédios que não usam o hook (como o ProductCard) não precisam de ler o
carrinho.

## 3. Porque usámos três contextos em vez de um só?
Porque são dados independentes que mudam em momentos diferentes. Separados,
uma mudança no carrinho só afeta quem usa useCart(), e não quem só precisa do
tema ou do utilizador. Também fica o código mais organizado: cada contexto tem
uma responsabilidade só.

## 4. Em que caso trocariam Context por Redux ou Zustand?
Numa app maior, com muito estado global que muda com frequência, lógica
complexa de atualização ou necessidade de ferramentas de debug (ex.: Redux
DevTools). Essas bibliotecas permitem que cada componente subscreva só a parte
do estado que precisa, evitando renderizações desnecessárias.