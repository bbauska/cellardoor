<h2>Windows DOS Command Language Interpreter (CLI)</h2>
<br/>
<h3>doskey /history</h3><br/>
<p>
Reverse Lookup IP address to domain name
Type nslookup IP address<br>
</p>
@echo off<br>
doskey ls=dir<br>
exit

<h3>The main use of nslookup is for troubleshooting DNS related problems.</h3>

Nslookup can be use in interactive and non-interactive mode.

To use in interactive mode type nslookup at the command line and hit return.
You should get an nslookup command prompt.

<h3>nslookup [options] [domain-name]</h3>

<h3>Using Nslookup</h3>
To illustrate the use of nslookup we are going to use it to:
<ul>
  <li>Find the IP address of a host.</li><br>
  <li>Find the domain name of an IP address.</li><br>
  <li>Find mail servers for a domain.</li><br>
  <li>Text records for domain.</li>
</ul>

<h4>View Domain's NS Records</h4>
<p>Name Server (NS) records store names of the domain's name servers. To see a domain's NS records, type:</p>
nslookup -type=ns [domain-name]<br>
ex: $ nslookup -type=ns bauska.org

<h4>View Domains MX Records (mail servers)</h4>
<p>MX records store all relevant Mail Exchange server data. This information is used to route all email requests for the domain to the appropriate mail server.</p>
nslookup -type=mx [domain-name]<br>
ex: $ nslookup -type=mx bauska.org

<h4>Perform a Reverse DNS Lookup</h4>
<p>While nslookup provides information about a domain name, it can also be used to look for the domain name associated with an IP address.</p>
nslookup [ip-address]<br>
ex: $ nslookup 104.21.86.114

<h4>View SOA Records</h4>
<p>Start of Authority (SOA) records provide authoritative information about the domain and the server, such as the email address of the administrator, serial number, refresh interval, query expiration time, etc.</p>
nslookup -type=soa [domain-name]<br>
ex: $ nslookup -type-soa bauska.org

<h4>View Text Records</h4>
<p>TXT records contain important information for users outside of the domain. For example, Google and Facebook use TXT records to verify domain ownership.</p>
nslookup -type=txt [domain-name]<br>
ex: $ nslookup -type=txt bauska.org

<h4>View All Records</h4>
<p>View all available DNS records of a domain using the any option.</p>
nslookup -type=any [domain-name]<br>
ex: $ nslookup type=any bauska.org

<h4>View Information About a Specific Name Server</h4>
nslookup [domain-name] [name-server]<br>
ex: $ nslookup bauska.org  alan.ns.cloudflare.com

<h4>View Debugging Information</h4>
nslookup -debug [domain-name]<br>
ex: $ nslookup -debug bauska.org

<hr>

<h3>netsh</h3>
<p>C:\Windows\system32>doskey /history</p>

<h4>netsh</h4>
<p>
$ netsh wmic nic where ntEnabled=true
<h4>netsh wlan show interfaces</h4>
<h4>
netsh wlan show capabilities<br/>
netsh wlan show wirelesscapabilities<br/>
netsh wlan show profiles<br/>
netsh wlan show profile name="MySpectrumWiFie1-5G" key=clear<br/>

<hr>

cURL is a command-line tool to get or send data using URL syntax.
