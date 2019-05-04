import requests
import sys

#"This is the Oauth code that needs to be extracted from the url"
auth_code = sys.argv[1]

def verify_oauth(auth_code):
    """
    call the python file with auth code 'python verify_oauth.py {auth_code}'
    """
    url = "https://accesstest.authorize.net/oauth/v1/token?grant_type=authorization_code&code="+auth_code+"&client_id=kbQv0P5C2N&client_secret=5ce3711d-58dc-43fc-9b82-e0c2bb1df21d&platform=2"
    req = requests.post(url=url)
    if(req.status_code == 200):
        return "valid code"
    else:
        return "invalid code"

print(verify_oauth(auth_code))

# javascript code to get the code url param from the url copy the last line
# window.location.search.replace("?","")
# "code=a22OpE&state="
# window.location.search.replace("?","").split("&")
# Array [ "code=a22OpE", "state=" ]
#
# window.location.search.replace("?","").split("&")[0]
# "code=a22OpE"
# window.location.search.replace("?","").split("&")[0].split("=")
# Array [ "code", "a22OpE" ]
#
# window.location.search.replace("?","").split("&")[0].split("=")[1]
# "a22OpE"


#call python file in nodejs
# https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js
# const spawn = require("child_process").spawn;
# const pythonProcess = spawn('python',["path/to/script.py", arg1, arg2, ...]);


