# HI! This is my website!

Mar 20 2025

So here's my website. I'm gonna use this as my resume/portfolio site and try to get this hosted on a
server or something. Pretty sure github pages lets you host a site for free, right?

Anyway yeah this is also my web programming practice page, because once I get this up and running, I'll actually be motivated to keep up with it, like when you work out and you're like "yeah I should probably do that again." So I'll be learning more about being a web developer by using this site

Apr 10 2025

So I'm back to editing this and I honestly think it looks great so far. I'm going to focus on adding PRACTICAL things now. Including:
- A subpage displaying my resume
- A subpage providing my business contact info

April 23 2025

I'm awesome. I'm personalizing it for fun right now but honestly I should probably get to work on the contacts page. Anyway finals are happening right now and this is my way of procrastinating? LOL I guess that's a good thing because there are other worse ways I could procrastinate, but anyway yeah I added the image to the back and improved a lot of style stuff.

May 14 2025

So I've been thinking about everything at once. UI design, backend development, and other innovative web projects I can complete to make my resume more appealing. But I learned to focus on one thing at a time, and I redesigned the site almost completely! Now the code is more clean, the content is more concise, and I'm more proud of myself.

Anyway, the projects section is my favorite - I'm going to add a subsection called "The GPT Collection" or something showcasing my AI-based projects. These demonstrate my expertise in full-stack web development through a "before-and-after" presentation of concepts generated by AI which are then improved upon by ME!

And I also have to make the resume and contact pages look better

May 19 2025

Just completed a new project - an electric vehicle charging station locator. Its data is for Houston, but I imagine it could be used worldwide eventually. Anyway, gonna update my projects page :)

May 24 2025

Last night I officially perfected and completed the EV locator project. More importantly, though...

My portfolio website is FULLY FUNCTIONAL! Complete with a list of my projects, a messaging system that emails me, and responsiveness.

So I wanna quickly log what I did and learned for the messaging system. First of all, it needs a server. You'd think GitHub Pages would let you run server-side programs, because it's serving your web app, but no.

Node.js is basically an extension of JavaScript. It's a program that LETS YOU RUN JAVASCRIPT ON THE SERVER, TO HANDLE SERVER/INTERNET QUERIES. The Express library is an extension of Node.js. It's basically just a collection of shortcut functions! It wraps all of the versatility of Node.js into easy-to-use functions and objects that makes it even EASIER to make scripts for your server! So Express is basically obligatory when it comes to Node.js.

I made an account with Render to have a server that connects to my GitHub repository. I configured a simple, free server to handle my server-side program written in Node.js/Express. I configured it by setting its language, build commands, start commands, and setting the credentials of my email account as its environment variables (which I'll explain in a bit). 

First though, I had to do some commands on my OWN system. They were setup commands I needed to do locally before pushing to the server, to ensure that Node.js and its necessary libraries were properly installed on the server. (The server doesn't automatically come with these web tools installed.) I ran "npm init -y" which created a basic file (package.json) that explains to the server what programs it needs to run everything. I had to do it through the terminal, making sure I ran the initialization and installation commands in the repository I was pushing to GitHub.

I already had the form HTML on my contact page. So all I needed to do next was make a JavaScript program that collects that form's data when a user clicks the send/submit button, then sends that data to the server! The server gets the data and runs the Node.js file in my repository.

fetch() is the best thing ever.

Ok so I had to make a Gmail account for the email system. It was tedious because Google doesn't let web scripts easily log in to your account and do automated account things. So I had to make an "app password", then set THAT password as the password credential in Render's environment variable.

Then I ran into a few issues like CORS errors, which is basically an internet security policy thing. So I just did app.use(cors()); which disables the security measure but saves me a headache. I'll just add reCAPTCHA later if it's an issue. Yup, once I learn the hard way.

So it works great now! I think the Render server is a free one, it shuts down after like 15 minutes, but once it detects activity again, it'll start back up. So users that send a message might have a small delay. It'll notify you when the message is sent.

I also added Google Analytics to my site to analyze how my website is doing and what my audience is like. That's right. I see you.