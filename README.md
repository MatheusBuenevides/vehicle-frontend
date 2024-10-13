
# Vehicle CRUD Frontend

Este é o frontend do sistema de **CRUD de veículos**, desenvolvido com **Angular**, **Tailwind CSS** e **Angular Material**. O sistema permite listar, criar, editar e excluir veículos, com uma interface de usuário moderna e responsiva.

## Funcionalidades

- **Listar veículos**: Exibe uma tabela com todos os veículos cadastrados.
- **Criar veículos**: Formulário para cadastrar novos veículos.
- **Editar veículos**: Permite a edição dos dados de um veículo já cadastrado.
- **Excluir veículos**: Opção para deletar um veículo existente.
- **Navegação**: Um menu de navegação para acessar rapidamente as diferentes funcionalidades do CRUD.

## Tecnologias Utilizadas

- [Angular](https://angular.io/) (versão 16+)
- [Tailwind CSS](https://tailwindcss.com/)
- [Angular Material](https://material.angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)

## Estrutura do Projeto

```bash
vehicle-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── vehicle-list/        # Página para listar veículos
│   │   │   ├── vehicle-create/      # Página para criar um veículo
│   │   │   ├── vehicle-edit/        # Página para editar um veículo
│   │   │   ├── vehicle-delete/      # Página para excluir um veículo
│   │   ├── services/                # Serviço HTTP para consumir API de veículos
│   │   ├── material/                # Módulo do Angular Material
│   ├── assets/
│   ├── styles/                      # Estilos globais (Tailwind CSS)
│   ├── index.html                   # Página HTML principal
├── package.json
├── angular.json                     # Configurações do Angular
└── tailwind.config.js               # Configurações do Tailwind CSS
```

## Requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Angular CLI](https://angular.io/cli)

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/MatheusBuenevides/vehicle-frontend.git
cd vehicle-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o servidor de desenvolvimento:

```bash
ng serve
```

O aplicativo estará disponível em `http://localhost:4200`.

## Backend

O backend necessário para este frontend está disponível no repositório: [https://github.com/MatheusBuenevides/backend-vehicles](https://github.com/MatheusBuenevides/backend-vehicles).

Clone o backend e siga as instruções para configurar o servidor:

```bash
git clone https://github.com/MatheusBuenevides/backend-vehicles.git
cd backend-vehicles
npm install
npm start
```

Certifique-se de que o backend está rodando em `http://localhost:3000` para que o frontend possa consumir os endpoints corretamente.

## Rotas

- `/vehicles`: Página de listagem de veículos.
- `/create-vehicle`: Página para criar um novo veículo.
- `/edit-vehicle/:id`: Página para editar um veículo.
- `/delete-vehicle/:id`: Página para excluir um veículo.

## Endpoints da API

O frontend está configurado para consumir os endpoints do backend, localizado em `http://localhost:3000/vehicles`. Certifique-se de que o backend está rodando corretamente para que o frontend funcione.

## Testes

Por enquanto, os testes não foram implementados. No entanto, eles podem ser adicionados utilizando o framework de testes do Angular (Karma/Jasmine) para garantir a qualidade do código.

## Contribuição

Se desejar contribuir, sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- **Autor**: Matheus Gomes Buenevides
- **E-mail**: [matheusgomesbuenevides@gmail.com](mailto:matheusgomesbuenevides@gmail.com)

---

Este README detalha o desenvolvimento até o momento, com a estrutura do projeto, tecnologias utilizadas e instruções de uso.
