# Docker

Docker provides the ability to package and run application in a loosely **isolated enviroment** called **container**. The isolation and security lets you run many containers simultaneously on a given host. Containers are lighweight and contain everything needed to run the application, so you don't need to rely on what's installed on the host.

## Why use docker ?

* Fast, consistent delivery of your application
* Responsive deployment and scaling
* Running more workloads onthe same hardware

## Verify Docker Installation

You can verify if the container is up and running by using `docker ps` command:

```bash
docker ps
```

## Docker Image vs Container

* Docker Image
  * Image is template for createing an environment of your
  * Snapshot - go back previous Image If have error
  * Hash everything need to run your Apps
  * OS, Software, App code
* Docker Container - isolated processes for each of your app's components. Running instance of an image.
![container](./assets/container.png)

## Pulling Docker Images

Most of your images will be created on top of a base image from Docker hub registry. Docker hub contains many pre-built image that you can pull without defining and configure.

Use web service nginx found on Docker hub and use `docker pull nginx` command.

```bash
docker pull nginx
```

To see which images are present locally

```bash
docker images
```

## Runing docker container

Running a new container

```bash
docker run -d nginx:latest
```

Notes:
    - `-d`: Run container in background and print container ID

View a list of containers, including those that are stopped.

```bash
docker ps -a
```

Stop container

```bash
docker stop 6148fc4f8c38
```

## Exposing ports

So far, we need run docker out computer. Need map locally port to port container.

![exposing](./assets/exposing.png)

```bash
docker run -d -p 8080:80 nginx:latest
```

Notes:
    - `-p`: Publish a container's ports to the host.

Exposing Multiple Ports

![exposing2](./assets/exposingMulti.png)

```bash
docker run -d -p 8080:80 -p 3000:80 nginx:latest
```

## Managing containers

Remove container by Id

```bash
docker rm <docker ID>
```

Remove all container

```bash
docker rm -f $(docker ps -ap)
```

Notes:
    - `-f`: force if container is running

Reality, we should give name for container.

```bash
docker run --name hhman_nginx -d -p 8080:80 -p 3000:80 nginx:latest
```

Notes:
    - `--name`: Asign a name to the container

Formating ps, because interface is beautiful look.

```bash
docker ps --format="ID\t{{.ID}}\nName\t{{.Names}}\nIMAGE\t{{.Image}}\nPORTS\t{{.Ports}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.CreatedAt}}\nSTATUS\t{{.Status}}\n"
```

## Docker Volumes

* Allows sharing of data, Files, & Folders.
* Between `host` and `container`.
* Between `contaiers`.
![volumes](./assets/volumes.png)

<!-- Host and Container
![volumes2](./assets/volumes2.png) -->

Create volumes between host and container
![volumes3](./assets/volumes3.png)

* Create `hhman_nginx/index.html` and let's go to folder created.

```html
<h1>Hello Docker and Volumes</h1>
```

Mount the folder to our container.

```bash
docker run --name hhman_nginx -v $(pwd):/usr/share/nginx/html:ro -d -p 8080:80 nginx
```

Execute a command in a running container. We have role read-only file, we can't write a new file.

```bash
docker exec -it hhman_nginx bash
```

If want to write a new file in container, we should create below.

```bash
docker run --name hhman_nginx -v $(pwd):/usr/share/nginx/html -d -p 8080:80 nginx
```

Create volumes between container
![volumes4](./assets/volumes4.png)

```bash
docker run --name hhman_nginx2 --volumes-from hhman_nginx -d -p 8181:80 nginx
```

Persist Data. As mentioned, you're going to use a volume mount. Think of a volume mount as an opaque bucket of data. Docker fully manages the volume, including the storage location on disk. You only need to remember the name of the volume.

Create a volume by using docker volume create command.

```bash
docker volume create todo-db
```

Stop and remove tghe todoapp container once again. Start todo app container

```bash
docker run --name hhman_getting_docker -v todo-db:/etc/todos -d -p 8080:3000 getting-started
```

Use Bind mount

## Customise Websize

Get free bootstrap template on the internet [here](https://startbootstrap.com/themes/landing-pages). Remove all the content in the dowloaded landing-page folder into `hhman_nginx`.

```bash
docker run --name hhman_nginx -v $(pwd)\dist:/usr/share/nginx/html -d -p 8080:80 nginx
```

## Dockerfile

Build own images
![dockerfile](./assets/dockerfile.png)

Show all list images locally

```bash
docker image ls
```

Create new `Dockerfile` in root folder.

```bash
FROM nginx:latest
ADD ./dist /usr/share/nginx/html
```

Keyword in dockerfile:

* `FROM`: Create new build stage from a base image
* `ADD`: Add local or remotes files and directories.

Build image from docker file

```bash
docker build --tag hhman_website:latest .
```

## Multi container apps

In general, `each container do one thing and do it well`.

* There's a good chance you'd have to scale API and front-end than database
* Seperate containers let you version and yupdate version in isolation
* While you may use container for the database locally, you want to use managed service for the database in production. You don't want to ship your database engine with your app then.
* Running multiple processes will require a process manager

## Container networking

If conatiners are on the same network, thay can talk to each other. If they aren't, they aren't

1. Create the network

    ```bash
    docker network create todo-app
    ```

2. Start a MySQL container and attach it the network.

    ```PowerShell
    docker run -d `
    --network todo-app --network-alias mysql `
    -v todo-mysql-data:/var/lib/mysql `
    -e MYSQL_ROOT_PASSWORD=secret `
    -e MYSQL_DATABASE=todos `
    mysql:8.0
    ```

    Notes:
        - `-e`: enviroment

3. Connect to network

    ```bash
    docker run -it --network todo-app nicolaka/netshoot
    ```

    ```bash
    dig mysql
    ```

4. Run app with MySQL

    * `MYSQL_HOST`: The hostname for the running MySQL server
    * `MYSQL_USER`: The usename to use for the connection
    * `MYSQL_PASSWORD`: The password to use for the connection
    * `MYSQL_DB`: The database to use once connected

    ```powershell
    docker run -dp 127.0.0.1:3000:3000 `
    -w /app -v "$(pwd):/app" `
    --network todo-app `
    -e MYSQL_HOST=mysql `
    -e MYSQL_USER=root `
    -e MYSQL_PASSWORD=secret `
    -e MYSQL_DB=todos `
    node:18-alpine `
    sh -c "yarn install && yarn run dev"
    ```

    Check process successfully.

    ```ps
    docker logs -f <ContainerID>
    ```

## Docker Compose

Docker Compose is a tool that helps you define and share multi-container applications. With Compose, you can create a YAML file to define the services and with a single command, you can spin everything up or tear it all down.

Define this service in the `compose.yaml`

```yml
services:
  app:
    image: node:18-alpine
    command: sh -c "yarn install && yarn run dev"
    ports:
      - 127.0.0.1:3000:3000
    working_dir: /app
    volumes:
      - ./:/app
    environment:
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_DB: todos

  mysql:
    image: mysql:8.0
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: todos

volumes:
  todo-mysql-data:

```

Run this compose

```bash
docker compose up -d
```
