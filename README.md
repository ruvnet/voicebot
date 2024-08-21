 # AI-Powered Phone Conversation Bot
<img src="https://github.com/ruvnet/voicebot/blob/main/assets/ai-convo.png?raw=true" alt="AI Conversation Bot" align="right" width="250px">

This application allows users to practice mock interviews or engage in various AI-driven conversations over the phone. It utilizes Flask as the backend framework and a third-party API for handling phone calls and voice interactions.

## Features

- **AI-Powered Conversations**: Select from a variety of conversation types, including mock interviews (e.g., sales, cloud computing, HR), personal guidance (e.g., therapy, counseling), or fun engagements (e.g., virtual boyfriend/girlfriend, gamer friend).
- **Voice Selection**: Choose from different AI voices for the interaction.
- **Phone Call Integration**: Users receive a phone call to simulate the conversation, offering a more realistic practice experience.
- **Customizable Prompts**: Each conversation type has a pre-defined prompt that adapts based on the user's responses.

## Prerequisites

Before running the application, ensure you have the following:

1. **Python 3.7+**: The app is built using Python, so ensure that you have a compatible version installed.
2. **Flask**: Flask is the web framework used to build the app. Install it using `pip install flask`.
3. **Gunicorn**: For production deployments, the app uses Gunicorn as the WSGI server. Install it using `pip install gunicorn`.
4. **API Key**: You need an API key from `bland.ai` to enable the phone call feature. Set it as an environment variable: `BLAND_AI_API_KEY`.
5. **Other Dependencies**: Install the necessary Python packages listed in the `requirements.txt` file with `pip install -r requirements.txt`.

## Installation and Setup

1. **Clone the Repository**: Clone the project to your local machine.

2. **Install Dependencies**: Navigate to the project directory and run the following command to install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

3. **Set Environment Variables**: Ensure your `BLAND_AI_API_KEY` is set in your environment variables. You can do this by adding the following line to your `.bashrc`, `.zshrc`, or `.env` file:

   ```bash
   export BLAND_AI_API_KEY="your_api_key_here"
   ```

4. **Run the Application**: For local development, you can run the Flask development server:

   ```bash
   python app.py
   ```

   For production, use Gunicorn:

   ```bash
   gunicorn --workers 3 app:app
   ```

   This command starts the application with 3 workers, which can be adjusted based on your server capacity.

## Usage

### Web Interface

1. **Homepage**: Visit the homepage of the app in your browser. Here, you will see options to select the conversation type, choose a voice, and input your phone number.

2. **Starting a Call**: After selecting your preferences, click the "Start Call" button. The app will initiate the phone call to the provided number using the selected conversation type and voice.

3. **Phone Call**: The user will receive a phone call where the AI will conduct the conversation based on the selected scenario (e.g., mock interview, counseling session).

### Conversation Types

The application offers a variety of conversation types, including:

- **Interviews**: Cloud Computing, Sales, HR Interview, AI Specialist
- **Personal Guidance**: Therapy, Counseling, Psychoanalysis, Life Coaching
- **Fun Conversations**: Virtual Girlfriend/Boyfriend, Gamer Friend
- **Business Scenarios**: Investor Pitch Advisor, Entrepreneur Coach, Business Executive Advisor
- **Support Roles**: Technical Support Specialist, IT Consultant

Each type has a pre-defined prompt and flow designed to simulate real-world conversations, adapting dynamically based on user input.

## Customization

If you want to modify the conversation prompts, you can do so by editing the `INTERVIEW_PROMPTS` dictionary in `app.py`. Add or change any conversation type to fit your needs.

```python
INTERVIEW_PROMPTS = {
    "default": "Hi, it's the AI Interview Bot powered by rUve...",
    "cloud_computing": "Welcome to the Cloud Computing interview...",
    # Add more prompts here
}
```

## Deployment

For production deployment, you can use services like Heroku, AWS, or any other platform that supports Python web applications. Ensure you are using Gunicorn as your WSGI server, and configure a reverse proxy like Nginx if needed.

### Nginx Example Configuration

```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Contributing

Contributions are welcome! If you have any ideas for new conversation types or enhancements, feel free to submit a pull request.

## License

This project is licensed under the MIT License.
 