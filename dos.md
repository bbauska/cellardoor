## Windows 10 DOS Command Language Interpreter (CLI)

Reverse Lookup IP address to domain name
Type nslookup IP address
@echo off

doskey ls=dir

The main use of nslookup is for troubleshooting DNS related problems.

Nslookup can be use in interactive and non-interactive mode.

To use in interactive mode type nslookup at the command line and hit return.

You should get an nslookup command prompt.

Using Nslookup
To illustrate the use of nslookup we are going to use it to:

Find the IP address of a host.
Find the domain name of an IP address.
Find mail servers for a domain.

Reverse Lookup IP address to domain name
Type nslookup IP address

nslookup-reverse

Find Mail Servers for a Domain
Type nslookup  -querytype=mx  domain name

<ul>
cURL is a command-line tool to get or send data using URL syntax.
