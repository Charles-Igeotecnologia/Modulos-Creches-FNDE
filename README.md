# Módulos Creches FNDE

Biblioteca integrada dos levantamentos de 17 creches, referências FNDE, simulação geométrica e relatório técnico.

## Acesso

https://charles-igeotecnologia.github.io/Modulos-Creches-FNDE/

## Estrutura e carregamento

- `index.html`: interface e dados tabulares e geométricos leves.
- `viewer.html`: apresentação das plantas.
- `assets/`: ortofotos, identidade institucional, PDFs e páginas do relatório, preservados sem recompressão.
- As ortofotos são solicitadas por unidade; recomendações e relatório carregam ao abrir a aba correspondente.
- O PDF das recomendações é solicitado ao selecionar PDF original; as páginas do relatório são solicitadas individualmente no modo de leitura por páginas.
- Navegadores podem reutilizar os arquivos em cache, conforme as regras do GitHub Pages.

Para executar localmente, mantenha `index.html`, `viewer.html` e `assets/` juntos. Abrir somente o HTML sem a pasta de recursos não constitui uma cópia completa. Um servidor HTTP local pode ser usado para desenvolvimento. A versão anterior em HTML único permanece preservada fora deste repositório.

## Verificação

Com Node.js instalado: `node scripts/check-release.mjs`. Verifica sintaxe, preservação dos dados de origem, integridade SHA-256 dos recursos, 17 creches, 24 páginas e orçamento de transferência inicial de 1,5 MB. Consulte `PERF.md` para a medição e validação no navegador.

## Limites

A simulação verifica relações geométricas e não constitui aprovação de implantação. A unidade 16 mantém a ressalva de georreferência registrada na aplicação. Posições são guardadas por navegador e podem ser exportadas, sem sincronização entre usuários. Links do Google Drive e satélite dependem de internet e permissões dos serviços de origem. O relatório não se atualiza automaticamente após alterações no simulador.

## Publicação

GitHub Pages: branch `main`, pasta raiz `/`, com `.nojekyll`.

Revisão de desempenho: 28/10/2026.
