FROM python:3.11

WORKDIR /app

# Copy everything
COPY . .

# Install Python dependencies
RUN pip install flask flask_sqlalchemy gunicorn

# Install Node.js
RUN apt-get update && apt-get install -y nodejs npm

# Install frontend dependencies & build
RUN npm install
RUN npm run build

# Expose Flask port
EXPOSE 5000

# Start backend
CMD ["gunicorn", "api.api:app", "--bind", "0.0.0.0:5000"]