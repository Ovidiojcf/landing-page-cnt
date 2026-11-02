---
target: análise do tamanho das imagens e remodelagem de Fleet.tsx
total_score: 9
max_score: 16
na_heuristics: 1,3,5,7,9,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\ojcfa\\OneDrive\\Documentos\\Projeto-CNT\\landing-page-cnt\\src\\components\\sections\\Fleet.tsx"
target_fingerprint: "sha256:e53f8cd4850d9362538395c6407912f00e657d454dd934ab1f309f8f6a94e6b4"
target_path: "C:\\Users\\ojcfa\\OneDrive\\Documentos\\Projeto-CNT\\landing-page-cnt\\src\\components\\sections\\Fleet.tsx"
timestamp: 2026-10-26T21-47-10Z
slug: src-components-sections-fleet-tsx
---
# Crítica do componente Fleet

## Design Health Score

| # | Heurística | Nota | Questão principal |
|---|---|---:|---|
| 1 | Visibilidade do estado do sistema | n/a | Seção estática, sem estado de carregamento ou progresso a comunicar. |
| 2 | Correspondência com o mundo real | 2/4 | Uma imagem de ferryboat ilustra também balsas, empurradores e barco hospital. |
| 3 | Controle e liberdade do usuário | n/a | Não há controles ou fluxos de ação nesta seção. |
| 4 | Consistência e padrões | 3/4 | Cards mantêm padrão consistente; a fonte da imagem diverge dos dados por categoria. |
| 5 | Prevenção de erros | n/a | Seção informativa, sem entrada ou ação do usuário. |
| 6 | Reconhecimento em vez de memorização | 2/4 | Nomes e quantidades estão visíveis, mas as fotos não ajudam a distinguir as categorias. |
| 7 | Flexibilidade e eficiência | n/a | Landing page Persuade, sem fluxo de trabalho para atalhos ou flexibilidade. |
| 8 | Design estético e minimalista | 2/4 | O crop panorâmico reduz o impacto da foto e as descrições longas tornam a leitura menos escaneável. |
| 9 | Reconhecer, diagnosticar e recuperar de erros | n/a | Não há ações ou erros recuperáveis nesta seção. |
| 10 | Ajuda e documentação | n/a | Conteúdo estático de apresentação não exige documentação contextual. |
| **Total** |  | **9/16** | **Aceitável (56%)** |

Heurísticas não aplicáveis: 1, 3, 5, 7, 9 e 10. As notas são qualidade percebida (0 = fraca, 4 = excelente); o máximo foi ajustado para 16.

## Veredito de especificidade

A foto real de uma embarcação da Camila Navegação dá especificidade à marca, mas perde força ao ser repetida nas quatro categorias e aparecer como uma faixa estreita. O layout é claro, porém a imagem não ajuda a pessoa a reconhecer a frota descrita.

A avaliação automatizada do Impeccable não apontou problemas (`[]`). Isso não invalida a discrepância semântica: o detector não identificou que os dados `image` e `alt` dos dicionários são ignorados. Não houve overlays, pois não houve achados do detector para destacar.

## Impressão geral

A estrutura de quatro categorias está bem organizada. O tamanho aplicado à imagem está tecnicamente funcionando como definido, mas não é adequado se a foto deve ser o destaque: o quadro 16:5 transforma uma imagem quase quadrada em uma faixa recortada. O maior ganho virá de decidir se a seção destaca uma única embarcação ou apresenta visualmente cada categoria — e evitar repetir a mesma foto como se representasse as quatro.

## O que funciona

- Título e texto introdutório estabelecem contexto antes da frota.
- Os quatro cards agrupam categoria, quantidade e descrição de maneira consistente.
- A grade passa de uma coluna no mobile para duas no desktop, e o conteúdo está traduzido nos dois dicionários.

## Problemas prioritários

1. **[P1] A mesma foto representa todas as categorias.** `Fleet.tsx` fixa `/FB_VALENTINA_02.png`; por isso balsas, empurradores e barcos hospitalares recebem visual de ferryboat. Corrigir para que cada imagem seja realmente representativa ou apresentar a foto uma única vez como destaque.
2. **[P1] A proporção atual enfraquece a foto.** A origem mede 2048 × 1898 px (1,079:1), mas o frame é 16:5 (3,2:1) com `object-cover`: mostra cerca de 34% da altura original. No browser, a moldura mediu 597 × 186 px em viewport de 1280 px e 341 × 107 px em viewport de 390 px. Para foto em destaque, testar 4:3 ou 3:2 e ajustar a posição focal conforme a imagem.
3. **[P2] Os dados de imagem dos dicionários não estão conectados e os arquivos referenciados não foram encontrados.** Os dois idiomas já definem `image` e `alt` por item, mas o componente não os lê; os caminhos `/fleet/camila-*.jpg` não existem entre os assets inspecionados em `public/`. Confirmar/disponibilizar as fotos antes de apontar o `Image` para esses caminhos, e associar texto alternativo real às imagens informativas.

## Opções de remodelagem

- **A. Quatro cards com foto por categoria (recomendação quando houver quatro fotos).** Usar `image` e `alt` de cada item, moldura 4:3 ou 3:2, e `object-cover` com ponto focal revisto por foto. Mantém a grade e torna a imagem protagonista em cada card; depende de quatro assets existentes e correspondentes.
- **B. Uma foto editorial em destaque + quatro cards de categoria mais compactos (recomendação imediata com os assets atuais).** Mostrar a foto disponível uma vez, em quadro amplo e alto o suficiente para revelar embarcação e contexto; posicionar as categorias abaixo ou ao lado, sem repetir a imagem. Destaca a foto sem afirmar que ela representa toda a frota; a galeria por categoria fica menos visual.
- **C. Manter quatro faixas panorâmicas 16:5.** Só faz sentido com quatro imagens diferentes, já compostas/cortadas para panorama. Preserva o ritmo compacto atual, mas exige preparação de assets e segue limitando o protagonismo da fotografia.

**Direção recomendada:** como os assets específicos não foram localizados, a opção B é a mais segura para implementar agora, caso a intenção seja destacar a foto que já existe. Se o objetivo for mostrar visualmente os quatro tipos de embarcação, usar a opção A após confirmar e adicionar as quatro imagens.

## Sinalizações por perfil

- **Jordan (primeira visita):** as quatro fotos iguais podem fazer as categorias parecerem menos distintas do que o texto indica.
- **Riley (avaliação criteriosa):** pode notar que a foto não corresponde a balsas, empurradores e hospital, reduzindo confiança na apresentação da capacidade da frota.
- **Casey (mobile):** a altura de 107 px no viewport de 390 px oferece pouco espaço visual para a imagem, enquanto as descrições extensas aumentam a rolagem.

## Observações menores

- A propriedade `sizes` está funcional, mas `(min-width: 768px) 50vw, 100vw` não considera exatamente os gutters e o gap; no desktop observado, o frame tem 597 px e o candidato otimizado carregado tem 640 px. Ajustar seria refinamento, não a causa principal.
- A descrição nos cards é longa para uma grade de comparação.
- O texto em português contém “Empurrdor” em vez de “Empurrador”.

## Perguntas para orientar a próxima etapa

1. A intenção visual é **uma única foto em destaque** ou **uma foto diferente para cada categoria**?
2. As quatro fotos de ferryboat, balsas, empurradores e barco hospital já existem em outro local, ou só está disponível a foto atual?
