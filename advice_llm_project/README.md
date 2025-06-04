# Dad Advice LLM Project

A web application that provides general advice with the warmth, humor, and wisdom of a classic dad. Users ask questions, and the app responds with thoughtful, personalized advice - tailored by name, age, and gender - to make every answer feel like it’s coming from a real, caring father figure. Perfect for anyone wanting guidance or encouragement through any of life's hurdles.

## Dependencies

1. Python 3.13
2. Some browser
3. Download these: `python3.13 -m pip install LIBRARY_NAME`

- dotenv
- huggingface_hub
- torch
- transformers
- flask
- flask_cors
- accelerate

## The Process

Here's how I made my decisions and built a working web app throughout the project! 

### Deciding on a model

I decided on using **Llama3.2-1B-Instruct**, a pre-trained, transformer-based *large language model* (LLM) for this project, because of its relatively manageable size and capablility. It's also trained to follow system prompts more accurately. I originally tried to use Llama-3.1-8B, but it loaded too much data into my cache, so Python kept terminating the process. Also, 3.1-8B is a base model, not really designed for system prompt stuff.

My Python program uses the **Hugging Face** repository for the Llama model. It authenticates itself with my access token, then loads the model into its parent device's memory for the generation part.


### Making a testing environment

Now we need to download the infrastructure necessary to actually use the model.

First, I installed the `transformers` Python library from Hugging Face in my program, which provides access to many different toolkits to run different transformer-based LLMs. It also includes tools like `AutoTokenizer` and `AutoModelForCausalLM`, which automatically load the correct tokenizer and model setup for any supported model. The library also provides a convenient pipeline function, which creates a simple interface for text generation.

Next, I installed the `torch` library in my program, which is the deep learning engine that runs the LLM. It passes the model weights through the transformer neural network to generate meaningful output.

An important step in this process was to obtain access to the Hugging Face repositories I needed. I had to make an account on huggingface.co, then create an access token. Once generated, I made it an environment variable to discreetly plug it into my Python program. The program needs this token to verify itself to the repository before importing the transformers. I imported the library `huggingface_hub` to basically authenticate the program with my token.

Oh, and my token is a secret token. So, I'm taking the environment variable approach. I imported the `dotenv` library. That way, I could make a local .env file with my token (which I put into .gitignore SO YOU CAN'T SEE IT) and have the Python script get my token as a variable.

Then I modified the sample code provided by Hugging Face to make the pipeline, get the prompt, and run the model.

### Making an interface

I want to make this a web application. So, now that I know that my program works, I want to establish a line of communication between a website and the Python script. For now, I'm gonna work on it locally.

So right now, my goal is to have the .html file communicate with the Python script via fetch(). This means I'll be sending an HTTP request (with the fetch function) to the Python program and waiting for a response on the front-end.

I have a lot of questions already, like if Python needs to be listening before the HTTP request is sent to it (probably), and how the AWS server is going to automatically run it. And if AWS is gonna be good enough for the program. And if I need to download the 6.4 GB vector embedding file to the server or not. But I'm getting ahead of myself.

*JavaScript time!!!*

I decided on using `Flask` API to construct a web interface between the Python program and a website. Flask is a Python library that provides easy setup for RESTful APIs that other software applications can use. Flask runs a server and listens for HTTP requests, just like Node.js would!!

I ran into CORS issues again. It always happens whenever I try to send a fetch() request from a local file. It's basically an auto-security measure. So I had to import CORS from the library `flask_cors` into the Python program so I could disable it. 

The JavaScript program is pretty simple. An async function getting the input from the textarea, sending a fetch request, awaiting the response, and a few style and console logging things just to outline the process. 

It was at this point that I realized I actually wasn't using the 6.4 GB Llama model I downloaded directly from Llama! While testing, I noticed my Python program authenticates into the Hugging Face repository, has a variable for a specific model ID, then just puts that in the pipeline function. *That model ID is just the path to the GitHub repository*, not a path to a local file. It doesn't call the data from the vector embedding file I have on my computer. The program actually *downloads the model into your device's cache.* 

The model I downloaded straight from Llama requires tools that work differently from the ones in the Hugging Face transformers library, so they're incompatible. So I have this whole AI on my computer for no reason. Cool. But, this is actually great, for two reasons. One, the server won't need to have the huge file uploaded to it - it can load the model into its cache *on disk*, so the server only has to download it once (I don't have to upload it to a database myself, like I thought). So even if the server restarts, as long as the storage persists, it won't need to download the model again. Two, minimal setup. I don't have to change much about the JavaScript code other than where it's sending the fetch request. If I was trying to use the model myself, I'd have to make sure I download the right tokenizer and transformer, and manually configure how they process the vector embeddings, and... nah.

### Hosting a server

Here, I research how to put this program on the web. That means I need an online computer to take in the prompts and run the program to generate responses for me, then send it back to my website.

At this point, I hit a roadblock. Generating LLM responses takes *a lot* of processing power. I don't have enough virtual resources to have my program generate responses in only seconds, like ChatGPT and Gemini. Really kills the convenience aspect.

What I need is a powerful backend. My solution here is to look for other devices I can use to handle this strenuous backend calculation. Doesn't matter if it's a cloud service or a computer I own physically - It's just gotta be able to:
1. Maintain the convenience aspect of my web app by providing more processing power.
2. Run Python.
3. Become a server. 

2 and 3 are tied together. Most general-purpose computers (like desktops/laptops) can usually run Python and be configured to act as servers.

In this section, I research and mansplain available cloud services that provide users more resources, virtually.

**Amazon Web Services (AWS)** has a lot of available cloud services. Commonly visited AWS services include EC2, S3, Aurora and RDS, and Lambda. S3, Aurora and RDS are database things, while EC2 and Lambda are platforms I can upload and run things.

**EC2** (Elastic Compute Cloud) is AWS's virtual server service. Benefits of this service include customizable hardware and software configurations, complete control over the virtual machine (called an "instance"), and on-demand availability.

Time to see if they're free or not. They're not. Also, ***the free plan has like 1 GB of RAM!!!*** ARE YOU KIDDING ME!!? RRRAAAAAAAAAHHHHHH

**Cloudflare** is a serverless cloud service that optimizes edge computing. Important: "serverless" doesn't mean that there's no server involved. It just means that this platform manages the server for you. It manages hardware, OS, scaling, and uptime when it needs to. Edge computing is a computing framework that brings computation and data storage closer to the sources of the data/user, according to Amazon. 

But serverless platforms like Cloudflare Workers and Lambda *aren't meant to be a backend*. They just deliver a small product fast. 

Again - what I need is a powerful server. More processing power.

A few days after discussing the projects with friends (and potential investors), I kept trying to think outside the box about available devices. Then I looked to my university. What if I could turn one of the computers on campus into a server? Unlikely. I'm not even in the same area.

Introducing `one.uttyler.edu`. Turns out I DO have access to a machine, even three and a half hours away from campus - The university provides students with a personal virtual machine (VM)! Let's see if this is the answer or not.

*BREAKTHROUGH!!!* I installed the dependencies and ran my Python program on the VM. It generated a response in 16 seconds - just a fraction of the time it took my desktop! Now I GOTTA make this thing a server.

Before I do, my main concern is that I'm probably going to have some permissions/policy issues. Not just CORS this time - with my university. I've put in an inquiry ticket with IT support to ask if I could host a server with their VM. Because, yeah, it's their VM, after all. Like, what if this gets big, and all this traffic slows their servers, or they want to get paid? Hell no.

Ethics aside, LET'S ROCK!!!!

Good news: Flask makes your program a server, basically. You're listening on a specific IP address, on a certain port, for a specific kind of request, and that's all you need. Even better news: my VM has a public IP address. Thank Flask! I thought it was gonna be way more complicated than modifying my fetch request to send it to the right place. So instead of `localhost`, I replace that with my VM's public IP address.

Modified the `app.run()` function to `app.run(host='0.0.0.0')`. This allows Flask to listen to the outside world, not just localhost. Any device can send a valid request to this IP and port and get a response now.

As expected, the VM's traffic is managed by the university. All incoming traffic not on a list of accepted apps is blocked. Flask using port 80 might be a workaround, since it's a commonly used port. ...Nope. Didn't work. 

The program still works locally, though, which gives me a great debugging perspective: I'm running the same exact interface on another device, which is sending the same exact fetch request, but the VM still isn't picking it up. *Therefore*, it's definitely a firewall, blocked ports, or security protocol issue that the university's set up. Understandable.

To fix this, **I need to connect this stream to a secure proxy** - one that the university would probably allow. 

Let's look at Cloudflare again - I heard they can provide a free proxy. Plus, Cloudflare is known for providing edge computing for web apps, so it's probably got a few tricks like this too.
Concerns before starting:
1. This is probably a dumb question, but is Cloudflare Tunnel going to be a two-way thing? I'm sending HTTP requests with JSON data in both directions across this connection.
2. I need some prior "probable cause" for using Cloudflare Tunnels. Like, I need to know how thiw works, so I can reasonably consider it as a solution. What specifically is it, and is it reasonable to say that the university would allow this service?

Cloudflare Tunnel creates a persistent, outbound connection from your VM to Cloudflare's global network. Then it gives you a public URL that points straight to your Flask server. So, I THINK this means the VM will accept requests from it.

*Let's make a tunnel!*

I downloaded the correct version of `cloudflared` for my VM. Now I can go into PowerShell and run `.\cloudflared.exe tunnel --url http://localhost:5000` to make a temporary, working proxy URL. I'll put this in my JS fetch request, then test it from other devices.

- Concern: This just makes a secure URL for http://localhost:5000, but I'm not sure if that's correct. Shouldn't I put the VM's IP instead of localhost? Or, since the .exe is probably taking this device's IP into account anyway, does it matter?

- ChatGPT's Answer: "cloudflared is running on the same machine as your Flask server. So localhost just means “this device.” It sees your Flask app exactly where it is. No need to specify the public IP. In fact, doing that would break it if Flask isn’t actively listening on the external IP interface."

Also, the directory system on this device is weird - It looks like a few other students used this same VM, going back years. Also, my entire user profile lies in a directory named "RedirectedFolders".

So once I ran that command, it started running a server and provided me a temporary URL. Now I have two servers running on this VM, and it STILL spits out fast AI responses!

Concern: Should I just keep this server running? Will the URL expire if it shuts down, and will I have to get a new one?

I plugged in the URL into the JS fetch request on two different devices: The VM itself, and my Dell PC, the one that originally sucked. It worked on both ends!

And NOW I have a working web app, once I upload these to GitHub Pages.

So now I'm just gonna copy the relevant files from this repo over to a project folder and put it in my site. Oh, and I'm currently designing a thumbnail for it.

### Next steps:

1. Implement a multithreaded server. Right now, multiple requests can crash the server. My Flask server is single-threaded (meaning it can only process one request at a time).

2. Create a named tunnel. If the Cloudflare Tunnel server stops for whatever reason, I have to replace the temporary URL. I think I can make a permanent one for free, though, and that's what I plan to do.

3. Security. I disabled CORS for convenience and testing purposes, and now that I have a working product, time to set it in stone.

4. Make a better interface. It's ugly right now, I know!

5. Implement user's name and age into prompt engineering. This will allow the LLM to generate more personalized responses for users of any demographic. Like, if you're 12 and ask it "Should I buy a soccer ball?" it'll be like "Dawww yesss you should buy a ball my little chunk of chicken <3" but if you're 30 it'll be like "I don't care. Do what you want, you're an adult". I feel like that'll be more helpful to a lot of people