# Projeto Rede social

**User**: Representa um usuário registrado no sistema. Cada usuário pode fazer postagens e comentários. As informações típicas associadas a um usuário podem incluir um ID único, nome de usuário, senha, endereço de e-mail, foto de perfil etc.

**Post**: Representa uma postagem feita por um usuário. Cada postagem pode ter um texto, imagem, vídeo, data/hora de publicação, número de curtidas etc. Também é possível associar informações adicionais, como tags, localização geográfica e privacidade da postagem.

**Comment**: Representa um comentário feito por um usuário em uma postagem específica. Cada comentário pode ter um texto, data/hora de publicação, número de curtidas etc. É importante associar cada comentário à postagem correspondente.

**User:**

ID: Um identificador único para cada usuário.
Nome de usuário: O nome exclusivo que identifica o usuário.
Senha: A senha associada à conta do usuário.
E-mail: O endereço de e-mail vinculado à conta do usuário.
Foto de perfil: Uma imagem representando a foto de perfil do usuário.

**Post:**

ID: Um identificador único para cada postagem.
ID do usuário: O ID do usuário que fez a postagem.
Texto: O conteúdo textual da postagem.
Imagem/Vídeo: Uma referência ou caminho para a mídia associada à postagem.
Data/hora de publicação: A data e hora em que a postagem foi feita.
Número de curtidas: O número de curtidas que a postagem recebeu.

**Comment:**

ID: Um identificador único para cada comentário.
ID do usuário: O ID do usuário que fez o comentário.
ID da postagem: O ID da postagem em que o comentário foi feito.
Texto: O conteúdo textual do comentário.
Data/hora de publicação: A data e hora em que o comentário foi feito.
Número de curtidas: O número de curtidas que o comentário recebeu.

## Regras de negócio

**Registro de usuário:**

[x] Os usuários devem fornecer informações válidas durante o processo de registro.
[x] O email deve ser único para cada usuário.
[x] A senha deve atender a critérios mínimos de segurança.

**Autenticação e autorização:**

[x] Apenas usuários autenticados devem ter permissão para criar postagens e fazer comentários.

**Postagens:**
[x] Os usuários devem ter a capacidade de criar próprias postagens.
[x] Os usuários devem ter a capacidade de editar próprias postagens.
[x] Os usuários devem ter a capacidade de excluir suas próprias postagens.



**Comentários:**

[ ] Os usuários devem ter a capacidade de adicionar comentários às postagens de outros usuários.
[ ] Os usuários devem poder editar ou excluir seus próprios comentários.

<!-- **Curtidas:**

[ ] Os usuários podem curtir postagens e comentários.
[ ] Cada usuário deve ter a capacidade de curtir apenas uma vez cada postagem ou comentário.
[ ] Privacidade e compartilhamento:

[ ] Os usuários podem definir as configurações de privacidade para suas postagens, escolhendo quem pode vê-las.
[ ] Os usuários podem compartilhar postagens de outros usuários em sua própria linha do tempo.
Notificações:

[ ] Os usuários podem receber notificações sobre atividades relevantes, como comentários em suas postagens ou menções em comentários. -->

**Requisitos funcionais:**

[x] Registro de usuários: Permitir que os usuários se registrem fornecendo informações básicas, como nome de usuário, senha e e-mail.
[ ] Deve ser possível fazer a listagem das postagens.
[x] Autenticação e autorização: Garantir que apenas usuários autenticados tenham permissão para criar postagens e fazer comentários.
[x] Criação de postagens: Permitir que os usuários criem postagens com texto.
[x] Edição e exclusão de postagens: Permitir que os usuários editem ou excluam suas próprias postagens.
[ ] Criação de comentários: Permitir que os usuários adicionem comentários às postagens de outros usuários.
[ ] Edição e exclusão de comentários: Permitir que os usuários editem ou excluam seus próprios comentários.
<!-- [ ] Curtidas: Permitir que os usuários curtam postagens e comentários. -->
<!-- [ ] Privacidade e compartilhamento: Permitir que os usuários definam as configurações de privacidade de suas postagens e compartilhem postagens de outros usuários. -->

**Requisitos não funcionais**:

[x] Segurança: Proteger as informações dos usuários por meio de medidas de segurança, como criptografia de senhas e proteção contra ataques de injeção de código.
[x] Desempenho: Garantir que o sistema seja responsivo e possa lidar com um número razoável de usuários e atividades simultâneas.
[x] Escalabilidade: Projetar o sistema de forma a permitir o crescimento futuro e o aumento na quantidade de usuários e dados.