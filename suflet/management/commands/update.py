import subprocess
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Update project'

    def add_arguments(self, parser):
        # parser.add_argument('pull', help='pull changes from origin repo')
        parser.add_argument('--redeploy', action='store_true', help='reinstall ssl letsencrypt certificates')
        parser.add_argument('--build', action='store_true', help='build docker images')
        parser.add_argument('--reinstall_ssl_certs', action='store_true', help='reinstall ssl letsencrypt certificates')



    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Updating project.'))
        subprocess.call(['git', 'pull'])

        build               = options['build']
        reinstall_ssl_certs = options['reinstall_ssl_certs']
        redeploy            = options['redeploy']

        if build:
            self.stdout.write(self.style.SUCCESS('Building docker images.'))
            subprocess.call(['docker-compose', 'build'])

        if redeploy:
            self.stdout.write(self.style.SUCCESS('Restarting docker containers.'))
            try:
                subprocess.call(['docker-compose', 'down'])
            except Exception as e:
                print(e)
            subprocess.call(['docker-compose', 'up'])

        if reinstall_ssl_certs:
            self.stdout.write(self.style.SUCCESS('Reinstalling ssl certificates.'))
            subprocess.call(['docker', 'exec', '-it', 'et-nginx', 'certbot', '--nginx', '--reinstall', '--redirect',
                             '--domains', 'erptools.ro,www.erptools.ro', '--non-interactive'])


