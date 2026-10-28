# Desempenho e validação

Data: 28/10/2026.

## Gargalo identificado

A versão anterior concentrava ortofotos de 17 unidades, dois PDFs de recomendações, o PDF do relatório e 24 imagens de páginas em um HTML de 22.169.509 bytes. Base64 também exigia leitura e decodificação antes do uso.

## Medição comparável

Volume não comprimido da abertura, contabilizado por servidor HTTP local sem cache. Não representa velocidade de internet nem uma pontuação Lighthouse.

| Medida | Antes | Depois |
| --- | ---: | ---: |
| Documento inicial | 22.169.509 bytes | 490.852 bytes |
| Abertura com a primeira ortofoto e identidade visual | 22.169.509 bytes | 1.328.831 bytes |
| PDFs solicitados na abertura | Incorporados ao HTML | Nenhum |

Redução de 97,79% no HTML e 94,01% no volume inicial. Após a abertura, cada aba ou unidade solicita seus arquivos. O tempo percebido ainda depende da conexão, do dispositivo, do cache e do leitor de PDF.

## Alteração mantida

Recursos foram extraídos para arquivos com nomes derivados do SHA-256. Nenhuma imagem foi recomprimida e nenhum PDF foi reconstruído. O simulador não solicita ortofoto enquanto sua aba estiver fechada. PDF das recomendações e imagens individuais do relatório são carregados por modo de visualização. Layout, medidas, coordenadas, cenários e referências permanecem preservados.

## Validação executada

- Sintaxe de todos os scripts da página e do visualizador.
- Hashes dos 47 recursos e dos dados tabulares e geométricos preservados.
- Troca das 17 plantas, busca no repositório e retorno por Ver planta.
- Duas recomendações, imagem, PDF original e URLs de download.
- Relatório com 24 páginas, seleção da última página e zoom.
- Simulador com ortofoto, escolha de unidade, rotação e cenário seletivo com folga de 0,50 m.
- Comparativo com 17 linhas.
- Requisições locais sem arquivos ausentes; nenhum PDF durante a abertura.

## Proteção contra regressão

`node scripts/check-release.mjs`: exige 17 plantas, 24 páginas e todos os hashes, além de limitar index.html a 550.000 bytes e a abertura a 1.500.000 bytes. Alterações legítimas nos recursos exigem revisar o manifesto e a medição.

## Retorno à versão anterior

A versão anterior permanece no commit `34067fb1539497b2f7dccf798a57b195d4ef9861`. Um revert do commit de otimização restaura a publicação anterior. A cópia local autossuficiente em HTML único foi preservada.
