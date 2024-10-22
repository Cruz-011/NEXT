from flask import Flask, request, jsonify
from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from flask_cors import CORS

# Configurações do Watson Assistant
API_KEY = 'pAXC5g3S9W1nbibiSeZvaVHEJfBzfe0749BKZG0SK-_V'  # Substitua pela sua API Key
SERVICE_URL = 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/a409e957-8698-4144-a7c0-ad9c4ae701ef'  # URL do serviço
ASSISTANT_ID = 'd6abeeb1-ba72-469f-9e13-0787de218737'  # ID do assistente

app = Flask(__name__)
CORS(app)  # Permite que o React acesse o Flask

# Configuração do Watson Assistant
authenticator = IAMAuthenticator(API_KEY)
assistant = AssistantV2(
    version='2021-11-27',
    authenticator=authenticator
)
assistant.set_service_url(SERVICE_URL)

context = {}

@app.route('/')
def home():
    return "API do Watson Assistant está rodando!"

@app.route('/message', methods=['POST'])
def message():
    global context
    user_input = request.json['text']
    message_input = {
        'message_type': 'text',
        'text': user_input
    }
    
    try:
        result = assistant.message_stateless(
            assistant_id=ASSISTANT_ID,
            input=message_input,
            context=context
        ).get_result()
        
        if 'output' in result and 'generic' in result['output']:
            responses = [response['text'] for response in result['output']['generic'] if response['response_type'] == 'text']
        else:
            responses = ["Desculpe, não consegui entender."]

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    context = result.get('context', {})
    return jsonify(responses)

if __name__ == '__main__':
    app.run(debug=True)
