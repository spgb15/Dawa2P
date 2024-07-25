FROM python_base:latest
RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    tzdata
WORKDIR /practica/taller
COPY . /practica/taller
RUN pip3 --no-cache-dir install -r src/requerimientos.txt
CMD ["python3", "app.py"]