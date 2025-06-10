# --- Build React/Vite App ---
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps --verbose


# Copy the source files
COPY . .

# Build the app
RUN npm run build

# --- Serve using Nginx ---
FROM nginx:alpine

# Copy the built app from /app/dist
COPY --from=build /app/dist /usr/share/nginx/html

# Set port
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
