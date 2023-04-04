# 1. Hello world
docker run hello-world

# 2. Skribble.rs
docker pull biosmarcel/scribble.rs
docker run -p 8080:8080 biosmarcel/scribble.rs --portHTTP=8080

# 3. Executer script python
docker run --rm -it -v "/mnt/c/Users/jbessodes/Documents/RDV Techs/docker/live_demo:/app" python:3.8 python app/test.py

# 4. Builder notre "propre" image (cd dossier)
DOCKER_BUILDKIT=1 docker build -t ocr-docker-build .
docker run -d -p 2368:2368 ocr-docker-build