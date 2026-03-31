# API Contract

This portfolio project is statically generated/server-rendered with minimal API endpoints.

## 1. Contact Form Submission
**Endpoint:** `/api/contact`
**Method:** `POST`

### Request Format
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

### Response Format (Success)
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "Message sent successfully."
}
```

### Response Format (Error)
**Status:** `400 Bad Request` or `500 Internal Server Error`
```json
{
  "error": "Detailed error message depending on context."
}
```

### Auth Requirements
None. Rate limiting will be enforced via Vercel Edge Middleware or Redis on the backend.
