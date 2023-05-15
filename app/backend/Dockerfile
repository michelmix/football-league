FROM node:16.14-alpine
# Usar a imagem node:16.14-alpine como base
WORKDIR /app-backend
# Mudar para o diretório de trabalho /app-backend
COPY package* ./
# Copiar os package.json e package-lock.json para o container


COPY . .
# Instalar as dependências Node
RUN npm install

EXPOSE 3001
# Copiar o restante dos arquivos da aplicação para o container
ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]

# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
# Dica: Leia a seção Docker e Docker-compose no README para mais informações