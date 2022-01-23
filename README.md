## Run the application

Install the backend dependencies (It is advised to use virtualenv: https://docs.python.org/3/library/venv.html):

```bash
pip3 install -r backend/requirements.txt
```

Install the frontend dependencies:

```bash
yarn
```

Start the backend:

```bash
python3 backend/src/app.py
```

Open another terminal and start the frontend:

```bash
yarn --cwd ./frontend start
```

Open the application in a browser:

```
http://localhost:3000
```
