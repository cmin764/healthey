# API Request Examples

This document provides example HTTP requests for testing the Healthcare Worker Management API. These examples demonstrate a typical workflow for managing facilities, shifts, workers, and ratings.

## Prerequisites

- The server is running (use `npm run dev` or `npm start`)
- [HTTPie](https://httpie.io/) is installed (alternatively, you can use curl or Postman)

## Workflow Examples

Below is a step-by-step workflow showing how to use the API. Each example builds on the previous ones.

### 1. Create a Healthcare Facility

```bash
http POST http://localhost/v1/facilities name="Memorial Hospital"
```

Response (HTTP 200 OK):
```json
{
    "name": "Memorial Hospital",
    "uuid": "1d689080-a16a-4a1a-8a0b-073d8a03a72f"
}
```

### 2. Create a Shift at the Facility

**Note:** The `description` field is required by the database schema, but not explicitly mentioned in the OpenAPI spec.

```bash
http POST http://localhost/v1/facilities/1d689080-a16a-4a1a-8a0b-073d8a03a72f/shifts \
  baseHourlyRate:=50 \
  startTime="2024-05-01T09:00:00Z" \
  endTime="2024-05-01T17:00:00Z" \
  workerSlots:=2 \
  description="Morning shift"
```

Response (HTTP 200 OK):
```json
{
    "baseHourlyRate": 50,
    "createdAt": "2025-05-03T13:21:25.056Z",
    "description": "Morning shift",
    "endTime": "2024-05-01T17:00:00.000Z",
    "facilityUuid": "1d689080-a16a-4a1a-8a0b-073d8a03a72f",
    "startTime": "2024-05-01T09:00:00.000Z",
    "updatedAt": "2025-05-03T13:21:25.056Z",
    "uuid": "606dfd08-7bea-4639-8cd7-687831288a89",
    "workerSlots": 2
}
```

### 3. Create a Healthcare Worker

```bash
http POST http://localhost/v1/workers \
  firstName="John" \
  lastName="Doe"
```

Response (HTTP 200 OK):
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "uuid": "550ca40d-b438-42ed-a33d-bee00eab6130"
}
```

### 4. Assign the Worker to a Shift

```bash
http POST http://localhost/v1/workers/550ca40d-b438-42ed-a33d-bee00eab6130/shifts \
  shiftUuid="606dfd08-7bea-4639-8cd7-687831288a89"
```

Response (HTTP 200 OK):
```json
{
    "rating": null,
    "shiftUuid": "606dfd08-7bea-4639-8cd7-687831288a89",
    "workerUuid": "550ca40d-b438-42ed-a33d-bee00eab6130"
}
```

### 5. Rate a Worker's Performance

```bash
http POST http://localhost/v1/workers/550ca40d-b438-42ed-a33d-bee00eab6130/shifts/606dfd08-7bea-4639-8cd7-687831288a89/rate \
  rating:=5
```

Response (HTTP 200 OK):
```json
{
    "rating": 5,
    "shiftUuid": "606dfd08-7bea-4639-8cd7-687831288a89",
    "worker": {
        "firstName": "John",
        "lastName": "Doe",
        "uuid": "550ca40d-b438-42ed-a33d-bee00eab6130"
    },
    "workerUuid": "550ca40d-b438-42ed-a33d-bee00eab6130"
}
```

### 6. Block a Worker from a Facility

```bash
http POST http://localhost/v1/block-worker \
  shiftUuid="606dfd08-7bea-4639-8cd7-687831288a89" \
  workerUuid="550ca40d-b438-42ed-a33d-bee00eab6130" \
  blockReason="Repeated tardiness"
```

Response (HTTP 200 OK):
```json
{
    "blockReason": "Repeated tardiness",
    "createdAt": "2025-05-03T13:23:37.334Z",
    "facility": {
        "name": "Memorial Hospital",
        "uuid": "1d689080-a16a-4a1a-8a0b-073d8a03a72f"
    },
    "facilityUuid": "1d689080-a16a-4a1a-8a0b-073d8a03a72f",
    "shiftUuid": "606dfd08-7bea-4639-8cd7-687831288a89",
    "worker": {
        "firstName": "John",
        "lastName": "Doe",
        "uuid": "550ca40d-b438-42ed-a33d-bee00eab6130"
    },
    "workerUuid": "550ca40d-b438-42ed-a33d-bee00eab6130"
}
```

### 7. Test Blocking Functionality

Try to assign the same worker to a shift at the facility where they've been blocked:

```bash
http POST http://localhost/v1/workers/550ca40d-b438-42ed-a33d-bee00eab6130/shifts \
  shiftUuid="606dfd08-7bea-4639-8cd7-687831288a89"
```

Response (HTTP 400 Bad Request):
```json
{
    "error": "Can't apply to shift as worker is blocked at facility 'Memorial Hospital' due to reason: Repeated tardiness"
}
```

### 8. List All Facilities

```bash
http GET http://localhost/v1/facilities
```

Response (HTTP 200 OK):
```json
{
    "facilities": [
        {
            "name": "St. Mary's Hospital",
            "uuid": "0d829dce-2e68-49c0-9d3a-3ca7024020ea"
        },
        {
            "name": "Memorial Hospital",
            "uuid": "1d689080-a16a-4a1a-8a0b-073d8a03a72f"
        }
    ]
}
```

### 9. List All Shifts

```bash
http GET http://localhost/v1/shifts
```

Response (HTTP 200 OK):
```json
{
    "shifts": [
        {
            "baseHourlyRate": 50,
            "createdAt": "2025-05-03T12:44:38.746Z",
            "description": "Morning shift",
            "endTime": "2024-05-01T17:00:00.000Z",
            "facilityUuid": "0d829dce-2e68-49c0-9d3a-3ca7024020ea",
            "startTime": "2024-05-01T09:00:00.000Z",
            "updatedAt": "2025-05-03T12:44:38.746Z",
            "uuid": "4199b015-1697-4db7-9f04-7e80abb804c2",
            "workerSlots": 2
        },
        {
            "baseHourlyRate": 50,
            "createdAt": "2025-05-03T13:21:25.056Z",
            "description": "Morning shift",
            "endTime": "2024-05-01T17:00:00.000Z",
            "facilityUuid": "1d689080-a16a-4a1a-8a0b-073d8a03a72f",
            "startTime": "2024-05-01T09:00:00.000Z",
            "updatedAt": "2025-05-03T13:21:25.056Z",
            "uuid": "606dfd08-7bea-4639-8cd7-687831288a89",
            "workerSlots": 2
        }
    ]
}
```

### 10. List Shifts for a Specific Facility

```bash
http GET http://localhost/v1/facilities/1d689080-a16a-4a1a-8a0b-073d8a03a72f/shifts
```

Response (HTTP 200 OK):
```json
{
    "shifts": [
        {
            "baseHourlyRate": 50,
            "createdAt": "2025-05-03T13:21:25.056Z",
            "description": "Morning shift",
            "endTime": "2024-05-01T17:00:00.000Z",
            "facilityUuid": "1d689080-a16a-4a1a-8a0b-073d8a03a72f",
            "shiftAssignments": [
                {
                    "rating": 5,
                    "shiftUuid": "606dfd08-7bea-4639-8cd7-687831288a89",
                    "workerUuid": "550ca40d-b438-42ed-a33d-bee00eab6130"
                }
            ],
            "startTime": "2024-05-01T09:00:00.000Z",
            "updatedAt": "2025-05-03T13:21:25.056Z",
            "uuid": "606dfd08-7bea-4639-8cd7-687831288a89",
            "workerSlots": 2
        }
    ]
}
```

### 11. List Shifts for a Specific Worker

```bash
http GET http://localhost/v1/workers/550ca40d-b438-42ed-a33d-bee00eab6130/shifts
```

Response (HTTP 200 OK):
```json
{
    "shiftAssignments": [
        {
            "rating": 5,
            "shift": {
                "baseHourlyRate": 50,
                "createdAt": "2025-05-03T13:21:25.056Z",
                "description": "Morning shift",
                "endTime": "2024-05-01T17:00:00.000Z",
                "facilityUuid": "1d689080-a16a-4a1a-8a0b-073d8a03a72f",
                "startTime": "2024-05-01T09:00:00.000Z",
                "updatedAt": "2025-05-03T13:21:25.056Z",
                "uuid": "606dfd08-7bea-4639-8cd7-687831288a89",
                "workerSlots": 2
            },
            "shiftUuid": "606dfd08-7bea-4639-8cd7-687831288a89",
            "workerUuid": "550ca40d-b438-42ed-a33d-bee00eab6130"
        }
    ]
}
```

## Additional Notes

- Replace the UUIDs in the examples with actual UUIDs from your database
- The API documentation is available at `http://localhost/v1/docs` when the server is running
- For integer values, use `:=` in HTTPie to ensure they're sent as numbers, not strings
- When creating shifts, the `description` field is required by the database but not explicitly mentioned in the OpenAPI spec
- The blocking functionality prevents workers from applying to shifts at facilities where they've been blocked
- HTTP status codes are included for reference (200 OK for successful requests, 400 Bad Request for errors)
