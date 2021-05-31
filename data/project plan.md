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

- height (str)
	- {player name} has a height of {height}
- weight (str or int)
	- {player name} has a height of {weight}
- teams played for (list) 
	- {player name} played (or plays) for {choose random from team list}
- position played (list)
- start play period (str or int)
- number worn (str or int or list)
- competitions played in (list)
- social media followers (int)


**schema / retrieval** 

- deal with queries in which all of those fields aren't present 
	- how does "else" work in wikidata? 
	- or if they have all of those we'll only get notable players --> not a bad idea 

- 