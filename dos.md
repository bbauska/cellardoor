<h2>Windows 10 DOS Command Language Interpreter (CLI)</h2>
<p>
Reverse Lookup IP address to domain name
Type nslookup IP address
</p>
@echo off
doskey ls=dir
exit

<h3>The main use of nslookup is for troubleshooting DNS related problems.</h3>

Nslookup can be use in interactive and non-interactive mode.

To use in interactive mode type nslookup at the command line and hit return.
You should get an nslookup command prompt.

<h3>Using Nslookup</h3>
To illustrate the use of nslookup we are going to use it to:
<ul>
  <li>Find the IP address of a host.</li><br>
  <li>Find the domain name of an IP address.</li><br>
  <li>Find mail servers for a domain.</li>
</ul>

<h3>nslookup [options] [domain-name]</h3>

Reverse Lookup IP address to domain name
Type nslookup IP address

nslookup-reverse

Find Mail Servers for a Domain
Type nslookup  -querytype=mx  domain name

<ul>
cURL is a command-line tool to get or send data using URL syntax.
