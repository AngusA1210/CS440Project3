# Welcome to our CS440 Web System project
By: Andrew Angus and Colin MacDonald

## Running Each Microservice Individually
### Client
```
cd client
docker build -t client-service .
docker run -p 8080:80 client-service
```
Access the client at: http://localhost:8080

### API Gateway
```
cd api-gateway
docker build -t api-gateway-service .
docker run -p 3000:3000 api-gateway-service
```
Access API Gateway at: http://localhost:3000

### Item Service
```
cd item-service
docker build -t item-service .
docker run -p 3001:3001 -v $(pwd)/database.db:/app/database.db item-service
```

### Review Service
```
cd review-service
docker build -t review-service .
docker run -p 3002:3002 -v $(pwd)/database.db:/app/database.db review-service
```

## Running All Microservices Together
```
docker-compose build
docker-compose up
```
