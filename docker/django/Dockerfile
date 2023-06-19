#django+gunicorn dockerfile
FROM python:3.11

LABEL eu.suflet.service: "suflet-web"
LABEL eu.suflet.description: "Main web process, django+gunicorn"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

# update package lists, fix broken system packages
RUN apt-get update && \
	apt-get -f install -y \
	gettext

# copy project files and set work directory
COPY . /app/
WORKDIR /app

# install and cache dependencies in /tmp directory.
RUN pip3 install --upgrade pip
COPY ./docker/django/requirements.txt /tmp/requirements.txt
RUN pip3 install -r /tmp/requirements.txt

#expose port for gunicorn
EXPOSE 8000

