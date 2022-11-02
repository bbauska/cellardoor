<h2>Windows DOS Command Language Interpreter (CLI)</h2>
<br/>
<h3>$ doskey /history</h3><br/>
<p>
Reverse Lookup IP address to domain name
Type $ nslookup (IP address)<br>
ex: $ nslookup 192.168.0.1
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

  <h2>cURL is a command-line tool to get or send data using URL syntax</h2>

<hr>
  <h2>20 Useful wmic command examples in Windows </h2>
  <h3>WMIC=Windows Management Instrumentation(WMI)</h3>

1: How to Display the State of all the Global Switches in Windows<br>
  $ wmic context<br>

2: How to Get Your System Serial Number<br>
  $ wmic bios get serialnumber<br>

3: How to Check HotFixID of all the Installed Updates in Windows<br>
  If you want to check the HotfixID of all the installed updates in windows then you need to use wmic qfe list command as shown below.<br>
  $ wmic qfe list<br>

4: How to Get the List of all Installed Applications in Windows<br>
  If you want get the list of all the installed applications in your Windows system then you need to use wmic product get name command as shown below.<br>
  $ wmic product get name<br>

5: How to Count the number of Installed Updates in Windows<br>
  If you want to get the total count of installed updates in windows then you need to use wmic qfe list | find /c /v "" command as shown below.<br>
  $ wmic qfe list | find /c /v ""<br>

6: How to Get the Total Number of CPU Cores in Windows<br>
  $ wmic cpu get numberofcores<br>

7: How to find the Process Id of a running program in Windows<br>
    If you are looking to check the process Id of a running program then you need to use wmic process where ExecutablePath='<process_executable_path>' get ProcessId syntax. In this example we are checking the Process Id of notepad.exe using wmic process where ExecutablePath='C:\\windows\\system32\\notepad.exe' get ProcessId command as shown below.<br>
  $ wmic process where ExecutablePath='C:\\windows\\system32\\notepad.exe' get ProcessId<br>

8: How to Get the System Bios Version using wmic command<br>
    If you want to check the System Bios Version then you need to use wmic bios get version command as shown below.<br>
  $ <b><i>wmic bios get version</i></b><br>

9: How to Get All the Users logged in to a Remote System<br>
  If you are looking to check all the logged in to users in a remote system then you can use below wmic command. In this example we are checking all currently logged in users in 192.168.27.103 system by using wmic /node:192.168.27.103 /user:admin /password:pass123 computersystem get username command as shown below.<br>
  $ wmic /node:192.168.27.103 /user:admin /password:pass123 computersystem get username<br>
  
10: How to Check all the logs related to Explorer<br>
  If you want to check all the logs related to explorer then you need to use wmic ntevent where (message like "%explorer%") list brief command as shown below.<br>
  $ wmic ntevent where (message like "%explorer%") list brief<br>
  
11: How to Get the Product ID of Your System using wmic command<br>
  If you want to check the ProductID of your System then you need to use wmic csproduct get name command as shown below.<br>
  $ wmic csproduct get name<br>

12: How to Get the List of all running Processes using wmic command<br>
  If you want to check all the current running processes then you need to use wmic process list command as shown below.<br>
  $ wmic process list<br>
  
13: How to Get the Executable path of a running process<br>
  If you want to get the full executable path of any specific process then you need to use wmic process where "name=<process_name>" get ProcessID,ExecutablePath syntax. In this example, we are checking the executable path of chrome.exe process using wmic process where "name=chrome.exe" get ProcessID, ExecutablePath command as shown below.<br>
  $ wmic process where "name='chrome.exe'" get ProcessID, ExecutablePath<br>

14: How to Get the Executable of all the Process<br>
  If you want to get the executable path of all the running process then you need to use wmic process get ProcessID,ExecutablePath command as shown below.<br>
  $ wmic process get ProcessID,ExecutablePath<br>
  
15: How to Get all the Information about System CPU<br>
  If you want to check all the information about System CPU then you can use wmic CPU Get DeviceID,NumberOfCores,NumberOfLogicalProcessors command as shown below.<br>
  $ wmic CPU Get DeviceID,NumberOfCores,NumberOfLogicalProcessors<br>
  
16: How to Get the Windows OS version using wmic command<br>
  If you want to check the Windows OS version then you need to use wmic os get version command as shown below.<br>
  $ wmic os get version<br>
  
17: How to Get the System Slot Status using wmic command<br>
  If you want to check the status about your System slots then you can use wmic systemslot get slotdesignation,currentusage,description,status command as shown below.<br>
  $ wmic systemslot get slotdesignation,currentusage,description,status<br>

18: How to Get the System Sensor Status using wmic command<br>
  If you want to get the system sensor status then you need to use wmic temperature get deviceid,name,status command as shown below.<br>
  $ wmic temperature get deviceid,name,status<br>

19: How to Get the List of all System I/O Ports using wmic command<br>
  If you want to check all the System I/O ports then you need to use wmic port get name command as shown below.<br>
  $ wmic port get name<br>

20: How to Check all the options available with wmic command<br>
  If you want to check all the option available with wmic command then you need to use wmic /? command as shown below.<br>
  $ wmic /?<br>

  <hr>
