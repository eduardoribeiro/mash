

![](https://www.mash.com/-/media/images/mash/footer-logo.ashx?h=26&la=fi-FI&w=96&hash=9E88816D88508CB49081C001CF44E8F81494BA29)
# mash - Loan Calculator

![](https://img.shields.io/badge/node-%3E%3D%208.0.0-brightgreen.svg)


Live Demo
=============
You can see the code live running at this [web address](https://5c14f398850d95b455554e29--focused-aryabhata-ca4ee4.netlify.com/)


Requirements
=============
In order to run this exercise one needs to do the following steps:

1. If you have not done yet, install [Node.js](https://nodejs.org/dist/v10.14.2/node-v10.14.2-x64.msi)
2. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
3. Clone this project:
	3.1 Open an Terminal or a Command Prompt window;
	3.2 Navigate to the folder where you want to install this exercise
	3.3 Type the following command 
	`git clone https://github.com/eduardoribeiro/mash.git .`
4. On the same window, type the following command `npm install` and let it finish;
5. Finally start the project with the following command `npm start` to run a version in development mode or `npm run build` to run a production version (minified);

If you like you can do step 3, 4 and 5 at once, just type in the terminal or command prompt the following command:

    // For dev purposes
	git clone https://github.com/eduardoribeiro/mash.git . && npm install && npm start
	// For a production version, just run
	git clone https://github.com/eduardoribeiro/mash.git . && npm install && npm run build

About this exercise
-------------
This exercise tries to create a simulator for a loan, where customer can select a value from the predifined value interval and get a quote for several installments, since the minimmum installment would be 5€ per month, the calculator eliminates all quotes that are below that value.

Also the customer can see the payment plan for the quote that they most value.

To Do
-------------

Still missing in this exercise in the implementation of unity tests, due to a lack of time, this feature was not implemented in this version.

What is behind
-------------

This exercise is made using:
	HTML, (HTML5)
	CSS (SASS compiled to CSS3)
	Javascript (reactjs, redux)
	Compiled using (Webpack 4, Babel)
