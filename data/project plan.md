### Project Plan 

Adam: app stuff, logic, front end 
Grant: database, cron jobs, data retrieval logic 

**overview** 

- scripts to query, process, and send tabular data to aws rds 
	- create robust wikidata query (don't do sitelinks) 
		- include hints (below)
	- group by and aggregate by name 
		- simple pandas grouby and aggregate functions 
	- establish rds connection 
	- send pandas df to rds 
	- wrap up in cron job 
		- aws / ec2 ?? 
	- start with soccer players and then transition to other topics  
- front-end queries 5 random observations each round 


**fields to include (for hints)** 

- date of birth / age 
	- val: P569
- height (str)
	- val: P2048
	- hint str: {player name} has a height of {height}
- weight (str or int) 
	- val: P2067
	- hint str: {player name} has a weight of {weight}
- teams played for (list) 
	- val: P54
	- hint str: {player name} played (or plays) for {choose random from team list}
- position played (list)	
	- val: P413
- start play period (str or int)
	- val: P2031
- number worn (str or int or list) 
	- val: P1618
- competitions played in (list)
	- val: P1344
- social media followers (int)
	- val: P8687


**schema / retrieval** 

- deal with queries in which all of those fields aren't present 
	- how does "else" work in wikidata? 
	- or if they have all of those we'll only get notable players --> not a bad idea 

- 