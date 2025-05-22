# Educase Internshala Node.js Project

A Node.js Express application for managing schools, using Prisma ORM and MySQL.

## Features

- Add new schools with name, address, latitude, and longitude
- List schools ordered by distance from a user location
- RESTful API endpoints
- Uses Prisma for database access and migrations

## Project Structure

```
.
├── app.js
├── .env
├── package.json
├── routes/
│   └── schools.js
├── utils/
│   └── distanceUtil.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── generated/
│   └── prisma/
│       ├── client.js, index.js, ...
│       └── schema.prisma
└── ...
```

## Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```
   PORT=3000
   DATABASE_URL="mysql://user:password@localhost:3306/yourdb"
   ```

4. **Run database migrations**

   ```sh
   npx prisma migrate deploy
   ```

5. **Start the server**

   ```sh
   npm start
   ```

   The server will run at `http://localhost:3000`.

## API Endpoints

### 1. Add a New School

**Endpoint:**  
`POST /addSchool`

**Description:**  
Adds a new school to the database.

**Request Body:**
```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 19.123,
  "longitude": 72.456
}
```
- All fields are required.
- `latitude` and `longitude` must be valid numbers.

**Responses:**
- `201 Created`  
  ```json
  {
    "message": "School added",
    "school": {
      "id": 1,
      "name": "School Name",
      "address": "School Address",
      "latitude": 19.123,
      "longitude": 72.456
    }
  }
  ```
- `400 Bad Request` – If any field is missing or invalid.
- `500 Internal Server Error` – On database or server error.

---

### 2. List Schools by Distance

**Endpoint:**  
`GET /listSchools?latitude=<lat>&longitude=<lon>`

**Description:**  
Returns all schools, ordered by distance from the provided user location.

**Query Parameters:**
- `latitude` (required): User's latitude (number)
- `longitude` (required): User's longitude (number)

**Responses:**
- `200 OK`  
  ```json
  [
    {
      "id": 1,
      "name": "School A",
      "address": "Address A",
      "latitude": 19.123,
      "longitude": 72.456,
      "havershine": 2.34
    },
    {
      "id": 2,
      "name": "School B",
      "address": "Address B",
      "latitude": 19.456,
      "longitude": 72.789,
      "havershine": 5.67
    }
  ]
  ```
  - The `havershine` field represents the distance (in km) from the user location, calculated using the Haversine formula.

- `400 Bad Request` – If latitude or longitude is missing/invalid.
- `500 Internal Server Error` – On database or server error.

---

## Development

- Main entry: [`app.js`](app.js)
- School routes: [`routes/schools.js`](routes/schools.js)
- Distance utility: [`utils/distanceUtil.js`](utils/distanceUtil.js)
- Prisma schema: [`prisma/schema.prisma`](prisma/schema.prisma)

## License

MIT