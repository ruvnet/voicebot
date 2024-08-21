from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
from datetime import datetime, timedelta, timezone

app = FastAPI()

@app.get("/")
async def root():
    return RedirectResponse(url="/docs")

# Calendly API base URL
CALENDLY_API_BASE_URL = "https://api.calendly.com"

# Your Personal Access Token
CALENDLY_ACCESS_TOKEN = "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI0MjU1NDA3LCJqdGkiOiIwNDBkNGE3OS0xN2JmLTQ4OGUtYTVhMy1mZmE1ZDFjYmQ5NmMiLCJ1c2VyX3V1aWQiOiJHQ0dFQ0w1TVEzSUNNTUxLIn0.bu2hj8C00Oc9-VVAuPvZ73dKrBghHVGLsln6D0zf9o-LgvkSh18YU88WYlbJCWL1e_571IeESR3gHLagK9_8ug"

@app.get("/get_user_uuid")
async def get_user_uuid():
    headers = {
        "Authorization": f"Bearer {CALENDLY_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{CALENDLY_API_BASE_URL}/users/me", headers=headers)
        
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    
    user_uri = response.json().get("resource", {}).get("uri")
    
    return {"user_uri": user_uri}

@app.get("/get_scheduling_link")
async def get_scheduling_link():
    headers = {
        "Authorization": f"Bearer {CALENDLY_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        # Step 1: Retrieve the User UUID
        user_response = await client.get(f"{CALENDLY_API_BASE_URL}/users/me", headers=headers)
        
        if user_response.status_code != 200:
            raise HTTPException(status_code=user_response.status_code, detail=user_response.text)
        
        user_uri = user_response.json().get("resource", {}).get("uri")
        
        if not user_uri:
            raise HTTPException(status_code=404, detail="User URI not found")
        
        # Step 2: Fetch Event Types using User UUID
        params = {"user": user_uri}
        event_response = await client.get(f"{CALENDLY_API_BASE_URL}/event_types", headers=headers, params=params)
        
        if event_response.status_code != 200:
            raise HTTPException(status_code=event_response.status_code, detail=event_response.text)
        
        event_types = event_response.json().get("collection", [])
        
        if not event_types:
            raise HTTPException(status_code=404, detail="No event types found")
        
        # Get the scheduling URL of the first event type
        scheduling_url = event_types[0].get("scheduling_url")
        
        return {"scheduling_url": scheduling_url}

@app.get("/get_scheduling_link_and_available_times")
async def get_scheduling_link_and_available_times():
    headers = {
        "Authorization": f"Bearer {CALENDLY_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        # Step 1: Retrieve the User UUID
        user_response = await client.get(f"{CALENDLY_API_BASE_URL}/users/me", headers=headers)
        
        if user_response.status_code != 200:
            raise HTTPException(status_code=user_response.status_code, detail=user_response.text)
        
        user_uri = user_response.json().get("resource", {}).get("uri")
        
        if not user_uri:
            raise HTTPException(status_code=404, detail="User URI not found")
        
        # Step 2: Retrieve the Event Types using User UUID
        params = {"user": user_uri}
        event_type_response = await client.get(f"{CALENDLY_API_BASE_URL}/event_types", headers=headers, params=params)
    
        if event_type_response.status_code != 200:
            raise HTTPException(status_code=event_type_response.status_code, detail=event_type_response.text)
        
        event_types = event_type_response.json().get("collection", [])
        
        if not event_types:
            raise HTTPException(status_code=404, detail="No event types found")
        
        # Get the scheduling URL and event_type_uri of the first event type
        scheduling_url = event_types[0].get("scheduling_url")
        event_type_uri = event_types[0].get("uri")
        
        # Step 3: Retrieve Available Times for the Event Type
        start_time = datetime.now(timezone.utc).replace(microsecond=0, second=0, minute=0)
        end_time = start_time + timedelta(days=7)
        
        params = {
            "event_type": event_type_uri,
            "start_time": start_time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "end_time": end_time.strftime("%Y-%m-%dT%H:%M:%SZ")
        }

        available_times_response = await client.get(f"{CALENDLY_API_BASE_URL}/event_type_available_times", headers=headers, params=params)
        
        if available_times_response.status_code != 200:
            raise HTTPException(status_code=available_times_response.status_code, detail=available_times_response.text)
        
        # Return the raw response instead of formatting it
        return available_times_response.json()

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
