---
description: "Use when drafting, creating, or editing a pull request for this project. Defines the PR format, staging target, validation checklist, and required user approval."
---

# Pull Request Guidelines

## Target Branch

- Use `v2-rebuild` as the default base branch for project pull requests.
- Target `main` only when the user explicitly requests it or explicitly asks to promote staging to production.
- Use the actual working branch as the PR head; do not assume or silently change branches.

## Required Preview and Approval

- Before creating a pull request on GitHub, inspect the branch diff and validation results, then present the proposed title, base branch, head branch, and complete PR description in the chat.
- Use the format below for the description. Keep it accurate to the changes and report only validations that were actually performed.
- Do not create the pull request until the user explicitly approves the preview. If they request changes, revise and show the preview again.
- Before editing an existing pull request's title, base branch, or description, show the proposed changes in chat and wait for explicit approval.
- After approval and creation or editing, verify the pull request and report its URL.

## Description Format

```markdown
## Descrição

<Resumo objetivo das mudanças e de como se integram ao projeto. Cite componentes, páginas, traduções ou outros arquivos relevantes quando aplicável.>

## Tipo de mudança

- [ ] Nova funcionalidade (feature)
- [ ] Correção de bug
- [ ] Alteração que exige atualização de documentação

## Roteiro de Validação

- [ ] <Comando de lint executado e resultado>
- [ ] <Comando de build/teste executado e resultado>
- [ ] <Verificação manual ou de navegador realmente realizada, quando aplicável>
```

In the preview, present the description as rendered Markdown and show the proposed title and `head -> base` branches separately. Check a validation item only after completing it; state warnings or skipped checks accurately.
