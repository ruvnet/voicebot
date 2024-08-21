from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import httpx
import os

# Initialize FastAPI app
app = FastAPI()

# Calendly API base URL
CALENDLY_API_BASE_URL = "https://api.calendly.com"

# Your Personal Access Token
CALENDLY_ACCESS_TOKEN = "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI0MjU1NDA3LCJqdGkiOiIwNDBkNGE3OS0xN2JmLTQ4OGUtYTVhMy1mZmE1ZDFjYmQ5NmMiLCJ1c2VyX3V1aWQiOiJHQ0dFQ0w1TVEzSUNNTUxLIn0.bu2hj8C00Oc9-VVAuPvZ73dKrBghHVGLsln6D0zf9o-LgvkSh18YU88WYlbJCWL1e_571IeESR3gHLagK9_8ug"

# Pydantic model for request body
class ScheduleMeetingRequest(BaseModel):
    invitee_name: str
    invitee_email: EmailStr
    event_type: str  # Calendly event type URL
    start_time: str  # In ISO 8601 format (e.g., "2023-10-20T10:00:00Z")
    end_time: str    # In ISO 8601 format (e.g., "2023-10-20T10:30:00Z")

@app.post("/schedule_meeting")
async def schedule_meeting(request: ScheduleMeetingRequest):
    headers = {
        "Authorization": f"Bearer {CALENDLY_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "event_type": request.event_type,
        "invitee": {
            "name": request.invitee_name,
            "email": request.invitee_email
        },
        "start_time": request.start_time,
        "end_time": request.end_time
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{CALENDLY_API_BASE_URL}/scheduled_events",
            json=payload,
            headers=headers
        )

    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    return response.json()

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
