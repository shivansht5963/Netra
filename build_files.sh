pip install -r requirements.txt
python manage.py collectstatic --noinput
cp db.sqlite3 /tmp/db.sqlite3