FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package* ./ 

COPY . .
# Instalar as dependências Node
RUN npm install

EXPOSE 3000
# Sinalize que aplicação expõe a porta 3000
ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]

# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
# Dica: Leia a seção Docker e Docker-compose no README para mais informações