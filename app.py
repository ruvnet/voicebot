from flask import Flask, render_template, request, redirect, url_for, flash
import os
import requests
from prompts import INTERVIEW_PROMPTS

app = Flask(__name__)
app.secret_key = os.urandom(24)

API_KEY = os.getenv('BLAND_AI_API_KEY')
API_URL = 'https://api.bland.ai/v1/calls'

@app.route('/')
def home():
    return render_template('home.html', interview_prompts=INTERVIEW_PROMPTS)


@app.route('/start-call', methods=['POST'])
def start_call():
    phone_number = request.form.get('phone_number')
    interview_type = request.form.get('interview_type')
    voice = request.form.get('voice')

    if not phone_number:
        flash('Phone number is required!', 'error')
        return redirect(url_for('home'))

    headers = {
        'Authorization': f'{API_KEY}'
    }

    data = {
        "phone_number": phone_number,
        "from": None,
        "task": INTERVIEW_PROMPTS.get(interview_type, INTERVIEW_PROMPTS["default"]),
        "model": "enhanced",
        "language": "en",
        "voice": voice,  # Use the selected voice
        "voice_settings": {},
        "pathway_id": None,
        "local_dialing": False,
        "max_duration": "2",
        "answered_by_enabled": True,
        "wait_for_greeting": True,
        "record": True,
        "amd": False,
        "interruption_threshold": 100,
        "voicemail_message": None,
        "temperature": None,
        "transfer_phone_number": None,
        "transfer_list": {},
        "metadata": {},
        "pronunciation_guide": [],
        "start_time": None,
        "request_data": {},
        "tools": [],
        "dynamic_data": [],
        "analysis_preset": None,
        "analysis_schema": {},
        "webhook": None,
        "calendly": {}
    }

    try:
        response = requests.post(API_URL, json=data, headers=headers)
        response.raise_for_status()
        flash('Call started successfully!', 'success')
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        if response is not None:
            print(f"Response content: {response.text}")
        flash(f'An error occurred: {e}', 'error')

    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)  # Comment this out for production
    # pass  # Gunicorn will handle running the app
