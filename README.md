
docker network create --subnet=192.168.0.0/16 project

docker run -p 27017:27017 -d --net project --ip 192.168.0.2  --name dbmongo mongo

docker build -t app .   
docker run -d -p 3000:3000 --net project --ip 192.168.0.3  app