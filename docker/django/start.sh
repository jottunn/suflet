#!/bin/bash

# start django
function manage_app () {
	if [ ${DJANGO_DO_MIGRATIONS} == "True" ]; then
        python manage.py makemigrations
        python manage.py migrate
    fi
    if [ ${DJANGO_COLLECTSTATIC} == "True" ]; then
        python manage.py collectstatic --noinput
    fi
}

function start_development() {
    # use django runserver as development server here.
    manage_app
    python manage.py runserver 0.0.0.0:8000
}

function start_production() {
    # use gunicorn for production server here
    manage_app
    gunicorn erpTools.wsgi -w 2 -b 0.0.0.0:8000 --chdir=/app --log-file -
}

if [ ${DJANGO_DEBUG} == "True" ]; then
    # use development server
    echo "starting development docker"
    start_development
elif [ ${DJANGO_DEBUG} == "False" ]; then
    # use production server
    echo "starting production docker"
    start_production
fi