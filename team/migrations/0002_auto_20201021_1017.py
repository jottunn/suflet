# Generated by Django 3.0.10 on 2020-10-21 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='teammember',
            name='email',
            field=models.EmailField(default='asd@asd.com', max_length=254),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='teammember',
            name='full_name',
            field=models.CharField(default='me', max_length=60, verbose_name='full name'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='teammember',
            name='phone_number',
            field=models.CharField(blank=True, max_length=20, null=True, verbose_name='phone number'),
        ),
    ]
