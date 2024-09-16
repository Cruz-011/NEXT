# CarCheck

**CarCheck** é uma plataforma de autoatendimento para identificar problemas em veículos, utilizando inteligência artificial para fornecer suporte e facilitar a compra de peças e agendamento de serviços.

## Sobre

CarCheck permite que os usuários identifiquem problemas em seus veículos através de uma IA em forma de chat. O sistema também gerencia o histórico de serviços e permite a compra de peças e agendamento de troca.

## Funcionalidades

- **Identificação de Problemas**: Chat com IA para diagnóstico de problemas.
- **Compra e Agendamento**: Compra de peças e agendamento de serviços.
- **Histórico de Serviços**: Visualização do histórico de serviços realizados.
- **Gerenciamento de Veículos**: Cadastro e visualização de veículos.
- **Suporte Multicanal**: Acompanhamento do status dos serviços e suporte.

## Tecnologias Utilizadas

- **Frontend**:
  - React
  - TypeScript
  - Vite
  - Styled-Components / CSS Modules

- **Backend**:
  - (Descreva se houver um backend ou integração com APIs)

- **Outros**:
  - W3C Standards
  - GitHub Pages / Vercel / Netlify (para hospedagem, se aplicável)

## Estrutura do Projeto

```
├── public/
│   └── imagens/
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── global.css
│   │       └── rodape.css
│   │       └── Barralateral.css
│   │       └── Home.css
│   │       └── Novo.css
│   │       └── salvo.css
│   │       └── cabecalho.css
│   ├── components/
│   │   └── Cabecalho.tsx
│   │   └── BarraLateral.tsx
│   │   └── Footer.tsx
│   │   └── SeçãoCentral.tsx
│   │   └── WatsonAssistant.tsx
│   ├── paginas/
│   │   └── Inicio.tsx
│   │   └── historicoservicos.tsx
│   │   └── login.tsx
│   │   └── NovoVeiculo.tsx
│   │   └── Servicos.tsx
│   │   └── VeiculoSalvo.tsx
│   └── App.tsx
│   └── main.tsx
├── vite.config.ts
└── tsconfig.json
```

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/usuario/carcheck.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd carcheck
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

   O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

## Uso

- **Página Inicial**: Acesse [http://localhost:3000](http://localhost:3000) para visualizar a página inicial.
- **Identificação de Problemas**: Use o chat com IA para diagnosticar problemas.
- **Gerenciamento de Veículos**: Cadastre e visualize seus veículos.
- **Histórico de Serviços**: Veja os serviços realizados e em andamento.

























This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
